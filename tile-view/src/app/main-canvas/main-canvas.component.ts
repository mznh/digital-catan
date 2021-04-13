import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ViewCommandService } from '../service/view-command-service/view-command.service'
import { BaseObject, TestUnitObject } from '../model/drawable-object' 
import { CommandData, COMMAND_TYPE} from '../model/command' 
import * as p5 from 'p5';

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.css']
})

export class MainCanvasComponent implements OnInit {
  public sketch :p5;
  private commandStream:WebSocket|null = null;

  private p5f = (p:p5) =>{
    p.setup = () =>{
      // 画面全体に表示する場合
      //p.createCanvas(p.windowWidth, p.windowHeight);
      p.createCanvas(900,700);
    }
    p.draw = () => {
      p.background(0);
      this.viewCommandService.draw()
    }
  }

  constructor( private viewCommandService: ViewCommandService) {
    //p5canvasを取得
    const canvasElm = document.getElementById('mainCanvas') || undefined;
    //p5jsインスタンスを作成,実態と要素を紐付け
    this.sketch = new p5(this.p5f,canvasElm) ;
    // viewCommandServiceにp5インスタンスを紐付け
    this.viewCommandService.setP5Instance(this.sketch);

    //subscribe
    this.viewCommandService.startCommandExecute();
  }

  ngOnInit(): void {
  }

  //for stream test
  public drawCircle(){
    const tmpCommandData ={
      type: COMMAND_TYPE.PUT_ROAD,
      target: "test",
      value: 100,
      message: "this is test message"
    };
    this.viewCommandService.getCommandStream().next(tmpCommandData);
  }
  public flashCircle(){
    const tmpCommandData ={
      type: COMMAND_TYPE.REMOVE_ROAD,
      target: "remove",
      value: 100,
      message: "this is remove test message"
    };
    this.viewCommandService.getCommandStream().next(tmpCommandData);
  }
}
