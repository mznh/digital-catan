#!/usr/bin/env ruby


require_relative "./model/command"

class TileApi < Sinatra::Base
  configure :production, :development do
    set :ws_url, Environments.instance.ws_url
  end

  helpers do
    def send_ws_server(hash_data) 
      #TODO 
      # issue 9
      # sleepした後にcloseしないとデータを送信せずに閉じてしまう
      # データ送信官僚 -> close処理 を sleepを使わずに実現したい
      Thread.new do
        p "send to #{settings.ws_url}"
        client = Faye::WebSocket::Client.new(settings.ws_url)
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
      'type'=> CommandType::PUT_ROAD,
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


