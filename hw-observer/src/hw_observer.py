#!./bin/python3
# coding: utf-8

from websocket import create_connection
from command import *

class HardwareObserver:
    def __init__(self,websocket_url, offline_mode = False):
        self.ws_url = websocket_url
        self.offline_mode = offline_mode
    ## CommandDataのインスタンスを受け取って送信
    def send_command(self, command_data):
        ## その都度 websocket をつなげて送信
        print("Command data sending..")
        if self.offline_mode:
            print(command_data.to_json())
        else:
            self.ws = create_connection(self.ws_url)
            self.ws.send((command_data.to_json()))
            self.ws.close()
        print("Done")

## ここ以下を実装してください
    def run(self):
        # できればイベント駆動する設計にしてください
        None
