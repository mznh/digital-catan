import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { mergeMap, map, catchError } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import * as p5 from 'p5';

import { BaseObject, TestUnitObject } from '../../model/drawable-object' 

//import { ViewCommand } from '../../model/status'

@Injectable({
  providedIn: 'root'
})
export class ViewCommandService {
  private viewCommandStreamUrl = "ws://localhost:8888";
  //TODO anyなくす
  private viewCommandStream :any;
  private p5ref:any;
  public drawableObjectList: BaseObject[] = [];

  constructor() {
    //要エラー処理
    this.viewCommandStream = webSocket(this.viewCommandStreamUrl);
		console.log("wake up");
  }  

  public setP5instance(p:p5){
    this.p5ref = p;
  }
  
  // command stream を返す
  public getCommandStream(){
    return this.viewCommandStream;

  }
}
