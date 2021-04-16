#!./bin/python3
# coding: utf-8

from command import *
from hw_observer import *


## setting
ws_url = "ws://localhost:8888"


hw_observer = HardwareObserver(ws_url)
hw_observer.run()

## テストメッセージ
## 3番目に道コマを置く
tmp_data = {
   'type': 'put road koma',
   'target': 'test target',
   'value': 3,
   "message": "test message from python code"
}


hw_observer.send_command(tmp_data)
