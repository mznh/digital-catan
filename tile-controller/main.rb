#!/usr/bin/env ruby

require "bundler/setup"
Bundler.require
require 'json'
require 'pp'
require 'thread'

#class TileController < Sinatra::Base
#  configure :production, :development do
#  end
#
#	get '/' do
#    return { :x => 7, :y => 5}.to_json
#	end
#end


connnections = []

EM::WebSocket.start({:host => "0.0.0.0", :port => 8888}) do |ws_conn|
  ws_conn.onopen do
    connnections << ws_conn
    p "get connection"
  end

  ws_conn.onmessage do |message|
    pp JSON.parse(message)

    connnections.each{
      |conn| conn.send(message)
    }
  end
end

loop do
  connnections.each{|conn| conn.send("test") }
  sleep(2)
  p "send msg"
end

# for development
#TileController.run! :host => 'localhost'

