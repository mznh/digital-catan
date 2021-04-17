#!/usr/bin/env ruby

require "bundler/setup"
Bundler.require
require 'json'
require 'pp'
require 'thread'

require_relative "./env"
require_relative "./api_server"
require_relative "./websocket"


# start webAPI
web_api_thread = Thread.new do
  # websocket側起動を少し待つ
  sleep(3)
  p "start webAPI server"
  TileApi.run!
end

# start websocket
web_socket_thread = TileWebsocket.new().run()

# alive server 
web_api_thread.join

