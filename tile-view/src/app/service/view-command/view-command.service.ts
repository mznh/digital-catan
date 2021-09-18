import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { mergeMap, map, catchError } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as p5 from 'p5';

import { GraphicService } from '../graphic/graphic.service';
import { CommandData, CommandInfo, COMMAND_TYPE} from '../../model/command';
import { TileStatus, initTileStatus } from '../../model/status' ;
import { DrawableObject, DrawableAnimationObject } from '../../model/drawable-object';
import {
  RoadKoma,
  SettlementKoma,
  TestTreasure,
  TestBackground,
} from '../../model/koma';
import { PLAYER_COLOR, RESOURCE_TYPE } from '../../model/game';

// for test
import { ANIMATION_TYPE, isAnimationType } from '../../model/base-graphics'; 


@Injectable({
  providedIn: 'root'
})
export class ViewCommandService {
  private viewCommandStreamUrl = environment.wsUrl;
  //TODO anyなくす
  private viewCommandStream :any;
  private p5ref:p5;
  private commandMatchList:CommandInfo[];
  private drawableObjectList: DrawableObject[] = [];
  //プリロード
  private backgroundList: DrawableObject[] =[];
  //タイルの状態
  public tileStatus: TileStatus;

  public setP5Instance(p:p5){
    this.p5ref = p;
  }


  constructor( private graphicService: GraphicService) {
		console.log("wake up");
    //要エラー処理
    this.viewCommandStream = webSocket(this.viewCommandStreamUrl);
    this.tileStatus = initTileStatus();


    // コマンドと実態のペア
    this.commandMatchList = [
      new CommandInfo( COMMAND_TYPE.PUT_ROAD, this.execPutRoad ),
      new CommandInfo( COMMAND_TYPE.REMOVE_ROAD, this.execRemoveRoad ), 
      new CommandInfo( COMMAND_TYPE.PUT_SETTLEMENT, this.execPutSettlement ),
      new CommandInfo( COMMAND_TYPE.SET_RESOURCE_TYPE, this.execSetResourceType ),
      new CommandInfo( COMMAND_TYPE.TEST_TREASURE, this.execGenerateTreasure ) 
    ];
  }  
  //draw canvas
  public draw(){
    this.p5ref.background(0);

    
    //背景を描画
    this.drawBackground();
    //各種オブジェクトの描画
    this.drawableObjectList.forEach((elm,idx) =>{
      elm.draw()
    });

    // delete finished animation 
    this.drawableObjectList = this.drawableObjectList.filter((elm) =>{
      // アニメーションオブジェクトかつアニメーションが終わったものを除外
      return !( elm instanceof DrawableAnimationObject && elm.animationStatus.isFinished())
    })

    //開発用に枠を上から描画
    this.drawScreenEdge();

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
  public startExecute(){
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


  private drawScreenEdge() {
    this.p5ref.noFill();
    this.p5ref.stroke(255, 0, 0);
    this.p5ref.circle(240, 240, 480);
  }

  private drawBackground(){
    if( this.backgroundList[0] != null){
       this.backgroundList[0].draw();
    }
  }

  private drawNumber(){
  }



  // function for command 
  // 各コマンドに対する実装
  // TODO 別ファイルに切り離す
  private execPutRoad(cmd:CommandData){
    this.drawableObjectList.push(
      new RoadKoma(this.p5ref, cmd.value, this.graphicService.ROAD_KOMA, ANIMATION_TYPE.ONCE)
    );
  }
  private execRemoveRoad(cmd:CommandData){
    this.drawableObjectList = [];
  }

  private execPutSettlement(cmd:CommandData){
    this.drawableObjectList.push(
      new SettlementKoma(this.p5ref, cmd.value, this.graphicService.SETTLEMENT_KOMA,ANIMATION_TYPE.ONCE)
    );
  }

  private execSetResourceType(cmd:CommandData){
    this.backgroundList = [
      new TestBackground(this.p5ref,this.graphicService.TEST_BACKGROUND,ANIMATION_TYPE.LOOP)
    ];
  }

  private execGenerateTreasure(cmd:CommandData){
    if(isAnimationType(cmd.target)){
      this.drawableObjectList.push(
        new TestTreasure(this.p5ref, cmd.target, this.graphicService.TEST_TREASURE)
      );
    }
  }
}
