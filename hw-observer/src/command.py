#!./bin/python3
# coding: utf-8

import json

## command type
class COMMAND_TYPE:
    ROAD_KOMA = "put road koma"


class CommandData:
    def __init__(self, type, target, value, message):
        self.type    = type
        self.target  = target
        self.value   = value
        self.message = message
    def to_json(self):
        base_dict = {
           'type': self.type,
           'target': self.target,
           'value': self.value,
           "message": self.message
        }
        return json.dumps(base_dict)
    def to_dict(self):
        return {
           'type': self.type,
           'target': self.target,
           'value': self.value,
           'message': self.message
        }

    

    ##TODO
    # type が COMMAND_TYPEのクラス変数と一致するかどうかぐらいは判定したい
    def is_sanity(self):
        None



