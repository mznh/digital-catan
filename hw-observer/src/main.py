#!./bin/python3
# coding: utf-8

from websocket import create_connection
import json

print("this is temporary code")

ws = create_connection("ws://localhost:8888")
print("Sending 'Hello, World'...")

## テストメッセージ
## 3番目に道コマを置く
tmp_data = {
   'type': 'put road koma',
   'target': 'test target',
   'value': 3,
   "message": "test message from python code"
}

ws.send(json.dumps(tmp_data))
print("Sent")
print("Receiving...")
result =  ws.recv()
print("Received '%s'" % result)

ws.close()
