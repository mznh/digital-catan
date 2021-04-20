

require 'singleton'

#TODO 外部のyamlとかを読み込むようにする
class Environments
  attr_accessor :ws_url,:ws_port
  include Singleton
  def initialize()
    p "this is singleton"
    @ws_url = "ws://localhost:8888"
    @ws_port = 8888
  end
end
