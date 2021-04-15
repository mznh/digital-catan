#!/usr/bin/env ruby

require "bundler/setup"
Bundler.require
require 'json'
require 'pp'
require 'thread'




class TileController < Sinatra::Base
  configure :production, :development do
  end

  helpers do
    def send_ws_server(hash_data) 
      #TODO 
      # issue 9
      # sleepした後にcloseしないとデータを送信せずに閉じてしまう
      # データ送信官僚 -> close処理 を sleepを使わずに実現したい
      Thread.new do
        p "send start"
        client = Faye::WebSocket::Client.new('ws://localhost:8888')
        client.send(hash_data.to_json)
        p "send end"
        ## 暫く待つ
        sleep(0.5)
        client.close()
      end
    end
  end

	get '/' do
    p "get request"
    tmp_data = {'type'=>"test type","target"=>'hoge'}
    send_ws_server(tmp_data)
    return { :x => 7, :y => 5}.to_json
	end
	get '/put/road/:positon' do
    p "get request"
    tmp_data = {
      'type'=>"put road koma",
      "target"=>'test target',
      "value" => params['positon'],
      'message' => "put koma from api"
    }
    if (0..5).include? params['positon'].to_i then
      send_ws_server(tmp_data)
    end

    return { :x => 7, :y => 5}.to_json
	end
end


# start echo back websocket server
websocket_server_thread = Thread.new do
  connnections = []
  p "start websocket server"
  ## ここも Faye に合わせるかも
  EM::WebSocket.start({:host => "0.0.0.0", :port => 8888}) do |ws_conn|
    ws_conn.onopen do
      connnections << ws_conn
      p "get connection"
    end

    ws_conn.onmessage do |message|
      pp JSON.parse(message)
      p connnections.length

      connnections.each{
        |conn| conn.send(message)
      }
    end

    ws_conn.onclose do
      connnections.delete(ws_conn)
      p "connnections close"
    end
  end
end

# start webAPI
web_api_thread = Thread.new do
  # websocket側起動を少し待つ
  sleep(3)
  p "start webAPI server"
  TileController.run!
end

## wait end thread
web_api_thread.join


 

