#!./bin/python3
# coding: utf-8

from command import *
from hw_observer import *


## setting
ws_url = "ws://localhost:8888"


hw_observer = HardwareObserver(ws_url)
#hw_observer.run()


## テストメッセージを送信
## 3番目に道コマを置く
test_command_data = CommandData( COMMAND_TYPE.ROAD_KOMA, 'test target', 3, "test message from python code")

hw_observer.send_command(test_command_data)
