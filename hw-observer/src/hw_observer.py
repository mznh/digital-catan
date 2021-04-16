#!./bin/python3
# coding: utf-8

from websocket import create_connection
from command import *

class HardwareObserver:
    ws = None
    ws_url = ""
    def __init__(self,websocket_url):
        self.ws_url = websocket_url
        None
    def send_command(self, command_data):
        ## その都度 websocket をつなげて送信
        print("Command data sending..")
        self.ws = create_connection(self.ws_url)
        self.ws.send(json.dumps(command_data.to_json))
        self.ws.close()
        print("Done")

## ここ以下を実装してください
    def run(self):
        # できればイベント駆動する設計にしてください
        None
