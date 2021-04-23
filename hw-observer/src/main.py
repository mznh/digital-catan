#!./bin/python3
# coding: utf-8

from command import *
from hw_observer import *
import sys


## setting
ws_url = "ws://localhost:8888"


if len(sys.argv) == 2 and sys.argv[1] == "test":
    hw_observer = HardwareObserver(ws_url,True)
else:
    hw_observer = HardwareObserver(ws_url)
#hw_observer.run()


## テストメッセージを送信
## 3番目に道コマを置く
test_command_data = CommandData( COMMAND_TYPE.PUT_ROAD, 'test target', 3, "test message from python code")

hw_observer.send_command(test_command_data)
