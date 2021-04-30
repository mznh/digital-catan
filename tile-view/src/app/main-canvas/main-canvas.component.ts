import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import * as p5 from 'p5';

import { ViewCommandService } from '../service/view-command/view-command.service'
import { GraphicService } from '../service/graphic/graphic.service'

// for test
import { CommandData, COMMAND_TYPE} from '../model/command' 

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.css']
})

export class MainCanvasComponent implements OnInit {
  public sketch :p5;
  private commandStream:WebSocket|null = null;

  private p5f = (p:p5) =>{
    p.preload = ()=>{
      // load picture
      this.graphicService.loadGraphics();
    }
    p.setup = () =>{
      // 画面全体に表示する場合
      //p.createCanvas(p.windowWidth, p.windowHeight);
      p.createCanvas(480,480);
    }
    p.draw = () => {
      this.viewCommandService.draw()
    }
  }

  constructor( 
    private viewCommandService: ViewCommandService,
    private graphicService: GraphicService
  ) {
    //p5canvasを取得
    const canvasElm = document.getElementById('mainCanvas') || undefined;
    //p5jsインスタンスを作成,実態と要素を紐付け
    this.sketch = new p5(this.p5f,canvasElm) ;

    // Serviceにp5インスタンスを紐付け
    this.viewCommandService.setP5Instance(this.sketch);
    this.graphicService.setP5Instance(this.sketch);

    //subscribe
    this.viewCommandService.startExecute();
  }

  ngOnInit(): void {
  }

  //for stream test

  public putTreasure(animationType:string){
    const tmpCommandData ={
      type: COMMAND_TYPE.TEST_TREASURE,
      target: animationType,
      value: 0,
      message: "this is test message"
    };
    this.viewCommandService.sendCommandData(tmpCommandData);
  }

  public putRoadKoma(position:number){
    const tmpCommandData ={
      type: COMMAND_TYPE.PUT_ROAD,
      target: "test",
      value: position,
      message: "this is test message"
    };
    this.viewCommandService.sendCommandData(tmpCommandData);
  }

  public flashCanvas(){
    const tmpCommandData ={
      type: COMMAND_TYPE.REMOVE_ROAD,
      target: "remove",
      value: 100,
      message: "this is remove test message"
    };
    this.viewCommandService.sendCommandData(tmpCommandData);
  }
}
