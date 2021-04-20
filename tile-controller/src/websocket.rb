#!/usr/bin/env ruby

require "bundler/setup"
Bundler.require
require 'json'
require 'pp'
require 'thread'

require_relative "./env"
require_relative "./api_server"




class TileWebsocket
  def initialize
  end


  def run
    # start echo back websocket server
    return Thread.new do
      port = Environments.instance.ws_port
      connnections = []
      p "start websocket server"
      ## ここも Faye に合わせるかも
      EM::WebSocket.start({:host => "0.0.0.0", :port => port}) do |ws_conn|
        ws_conn.onopen do
          connnections << ws_conn
          p "get connection"
        end

      ## 現状はエコーバックするだけ
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
  end
end

