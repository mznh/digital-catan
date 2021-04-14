#!/usr/bin/env ruby

require "bundler/setup"
Bundler.require
require 'json'
require 'pp'
require 'thread'

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

  ws_conn.onclose do
    p "connnections close"
  end
end

