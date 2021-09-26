#!./bin/python3
# coding: utf-8

from websocket import create_connection
from command import *
import serial
import subprocess
import time 
import re

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
        self.init_table()
        self.init_tile()
        self.gen_tileID()
        self.init_serial()
        self.set_tileID()
        while True:
            self.get_data(self.ser)

    def init_tile(self):
        self.tile_param = [ # タイル状態保存用変数　
                {"city":["NONE","NONE"],"road":"NONE","tile":0}       #cityは[0]にplyercolor
                ,{"city":["NONE","NONE"],"road":"NONE","tile":0}      #[1]にcity_typeを格納
                ,{"city":["NONE","NONE"],"road":"NONE","tile":0}      #roadはplayercolor
                ,{"city":["NONE","NONE"],"road":"NONE","tile":0}      #
                ,{"city":["NONE","NONE"],"road":"NONE","tile":0}      #tileは隣接タイルの
                ,{"city":["NONE","NONE"],"road":"NONE","tile":0}      #タイルIDを格納
                ,"NONE"                                                 #盗賊コマの有無。ある時は"ON"
        ]

#        self.threshold = [  10.55417066,21.35288726,33.39130435,46.16393443,63.51879699,81.85034014,103.6190476,
#                            121.9685864,144.6956522,170.6666667,192,207.6981132,220.4444444,232.7272727,243.8095238
#                         ]
        self.city_threshold = [64,128,172]
        self.road_threshold = [64,128,172]

    def gen_tileID(self):
        ip = subprocess.check_output(['ip','-f','inet', '-o','addr', 'show','wlan0']).split(' ')
        buf = [int(i) for i in re.split('\/|\.',ip[ip.index('inet')+1])[2:4]]
        self.tileID = '{:02X}{:02X}'.format(buf[0],buf[1]) #IPアドレス下位2byteをタイルIDに設定

    def init_serial(self):
        port = "/dev/serial0"
        self.ser = serial.Serial(port)
        self.ser.baudrate  = 4800
        self.ser.parity    = serial.PARITY_NONE
        self.ser.bytesize  = serial.EIGHTBITS
        self.ser.timeout   = 5

    def set_tileID(self):
        ser = self.ser
        tile_id = self.tileID
        while 1:
            rx = ser.readline()
            if("SYN" in rx):
                break
        time.sleep(0.01)
        ser.write("ACK\r\n")
        ser.flush()
        time.sleep(1)
        for send_byte in tile_id:
            ser.write(send_byte)
        ser.write("\r\n")
        while True:
            rx = ser.readline()
            if "OK" in rx:
                break

    def get_data(self,ser):
        rx = ser.readline()
        m = int(rx[1])
        if(rx[0] =='T'):
            if self.tile_param[m]["tile"] != rx[3:-1]:  #隣接タイル情報に変更があるか
                self.tile_param[m]["tile"] = rx[3:-1] #隣接タイル無しの時 tile_id = FFFF
                
                print("type:"+"SET_NEIGHBIRHOOD_TILE")
                print("target:"+self.tile_param[m]["tile"])
                print("value",m)
                #cmd = CommandData(type="SET_NEIGHBIRHOOD_TILE",targer = self.tile_param[m]["tile"],value=m)
                #self.send_command(cmd)

        elif(rx[0] =='C'):                              #都市判定　簡易実装のため家のみ、町は考慮しない
            self.detect_city = self.detect_whose_city(int(rx[3:-1],16))     #ADC値から色と形を判定
            if self.tile_param[m]["city"] != self.detect_city:              #前状態と一致しているか
                if self.detect_city[1] == "settlement":       #コマが置かれた場合
                    print("type:"+"PUT_"+self.detect_city[1])
                    print("target:"+self.detect_city[0])
                    print("value",m)

                    #cmd = CommandData(type="PUT_"+self.tile_param[m]["city"][1],target=self.tile_param[m]["city"][0],value=m)
                else:                                                   #置かれたコマが「無し」の場合（コマが除去された場合）
                    print("type:"+"REMOVE_"+self.tile_param[m]["city"][1])
                    print("target:"+self.tile_param[m]["city"][0])
                    print("value",m)

                    #cmd = CommandData(type="REMOVE_"+self.tile_param[m]["city"][1],target=self.tile_param[m]["city"][0],value=m)
                #self.send_command(cmd)
                self.tile_param[m]["city"] = self.detect_city               #状態更新

        elif(rx[0] =='R'):
            self.detect_road = self.detect_whose_road(int(rx[3:-1],16))     #ADC値から色を判定
            if self.tile_param[m]["road"] != self.detect_road:              #前状態と一致しているか
                if self.detect_road != "NONE":                #コマが置かれた場合  
                    print("type:"+"PUT_ROAD")
                    print("target:"+self.detect_road)
                    print("value",m)

                    #cmd = CommandData(type="PUT_ROAD",target=self.tile_param[m]["road"],value = m)                       
                else:                                           
                    print("type:"+"REMOVE_ROAD")
                    print("target:"+self.tile_param[m]["road"])
                    print("value",m)

                    #cmd = CommandData(type="REMOVE_ROAD",target=self.tile_param[m]["road"],value = m)
                #self.send_command(cmd)
                self.tile_param[m]["road"] = self.detect_road               #状態更新  

        elif(rx[0] =='K'):
            if(int(rx[3:-1],16) <128):                                   #盗賊コマの有無を判定
                if self.tile_param[6] == "NONE":                    
                    self.tile_param[6] = "ON"
                    #cmd = CommandData(type="PUT_THIEF")
                    print("type:"+"PUT_THIEF")

                else: 
                    pass                     
            else:
                if self.tile_param[6] == "ON":
                    self.tile_param[6] = "NONE"
                    #cmd = CommandData(type="REMOVE_THIEF")
                    print("type:"+"REMOVE_THIEF")

            #self.send_command(cmd)

    def detect_whose_city(self, city_ad):       #マイコンから受け取ったAD値から誰の都市/開拓地を判定
        i = 0
        for threshold in self.city_threshold:        #AD値を閾値で判別
            if city_ad < threshold: 
                break
            else:
                i = i+1
        return self.city_table[i]                    #判別した値から都市テーブルを参照

    def detect_whose_road(self,road_ad):
        i = 0
        for threshold in self.road_threshold:        #AD値を閾値で判別
            if road_ad < threshold: 
                break
            else:
                i=i+1
        return self.road_table[i]                    #判別した値から道テーブルを参照
    

    def init_table(self):                       #都市テーブルと道テーブルを生成
        self.city_table = [                     #簡易版都市テーブル及び道テーブル
            ["RED","SETTLEMENT"]
            ,["WHITE","SETTLEMENT"]
            ,["YELLOW","SETTLEMENT"]
            ,["NONE","NONE"]
        ]
        self.road_table=["RED", "WHITE","YELLOW","NONE"]
        """
        self.plyer_colors   = ["RED","YELLOW","BLUE","WHITE"]
        self.city_types     = ["SETTLEMENT", "CITY"] 
        self.city_table = list()
        for color in self.player_colors:        
            for city in self.city_types:
                self.city_table.append([color,city])
        self.city_table.append(["NONE","NONE"])

        self.road_table = list()
        for color in self.player_colors:        
            self.road_table.append(color)
        self.road_table.append("NONE")
        """

