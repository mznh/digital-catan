# HardwareObserver

init

```
$ sudo apt -y install python3-pip
$ sudo pip3 install virtualenv
$ virtualenv .
$ . bin/activate
$ pip3 install -r requirements.txt
```

update requirements.txt

```
$ . bin/activate
$ pip3 install hoge
$ pip3 list
$ pip3 freeze > requirements.txt
$ deactivate
```
run 

```
$ ./exec
```


引数に test をつけることでデータを送信せずに出力するモードになります。

```
$ ./exec test
```


### 参考にしたサイト
https://qiita.com/m-masaki72/items/7ba34e31d9f08662f1ee
