import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { mergeMap, map, catchError } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import * as p5 from 'p5';

import { GraphicService } from '../graphic/graphic.service'
import { RoadKoma, BaseObject, TestUnitObject } from '../../model/drawable-object' 
import { CommandData, CommandInfo, COMMAND_TYPE} from '../../model/command' 

//import { ViewCommand } from '../../model/status'

@Injectable({
  providedIn: 'root'
})
export class ViewCommandService {
  private viewCommandStreamUrl = "ws://localhost:8888";
  //TODO anyなくす
  private viewCommandStream :any;
  private p5ref:p5;
  
  private commandMatchList:CommandInfo[];
  private drawableObjectList: BaseObject[] = [];

  constructor( private graphicService: GraphicService) {
		console.log("wake up");
    //要エラー処理
    this.viewCommandStream = webSocket(this.viewCommandStreamUrl);

    // コマンドと実態のペア
    this.commandMatchList = [
      new CommandInfo( COMMAND_TYPE.PUT_ROAD, this.execPutRoad),
      new CommandInfo( COMMAND_TYPE.REMOVE_ROAD, this.execRemoveRoad) 
    ];
  }  

  public setP5Instance(p:p5){
    this.p5ref = p;
  }
  
  //draw canvas
  public draw(){
    this.p5ref.background(0);
    this.drawableObjectList.forEach((elm,idx) =>{
      elm.draw()
    });
  }

  // command stream を返す
  public getCommandStream(){
    return this.viewCommandStream;
  }

  // send command data
  public sendCommandData(commandData:CommandData){
    return this.viewCommandStream.next(commandData);
  }



  //subscribeを開始
  public startCommandExecute(){
    this.getCommandStream().subscribe(
      //command execute 
      (command: CommandData) =>{
        console.log(command);
        this.commandMatchList.forEach(
          (cmdInfo,idx) => {
            if(command.type === cmdInfo.type){
              cmdInfo.func.call(this,command);
            }
          }
        );
      }
    );
  }


  // function for command 

  private execPutRoad(cmd:CommandData){
    console.log(cmd.type);
    this.drawableObjectList.push(
      new RoadKoma(this.p5ref, cmd.value, this.graphicService.ROAD_KOMA)
    );
  }
  private execRemoveRoad(cmd:CommandData){
    console.log(cmd.type);
    this.drawableObjectList = [];
  }
}
