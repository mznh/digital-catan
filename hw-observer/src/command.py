#!./bin/python3
# coding: utf-8

import json

class CommandData:
    type = ""
    target = ""
    value = 0
    message = ""
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

