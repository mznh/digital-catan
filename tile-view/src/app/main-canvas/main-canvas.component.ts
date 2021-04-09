import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ViewCommandService } from '../service/view-command-service/view-command.service'
import { BaseObject, TestUnitObject } from '../model/drawable-object' 
import * as p5 from 'p5';

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.css']
})

export class MainCanvasComponent implements OnInit {
  public sketch :p5;
  private commandStream:WebSocket|null = null;

  //TODO 
  //描画順序なども考慮できるように、なんらかのサービスに切り離す
  //一旦の抽象化
  //commandStreamServiceにまとめるのもあり
  public drawableObjectList: BaseObject[] = [];

  private p5f = (p:p5) =>{
    p.setup = () =>{
      // 画面全体に表示する場合
      //p.createCanvas(p.windowWidth, p.windowHeight);
      p.createCanvas(900,700);
    }
    //ここはマジでデカくしたくない
    p.draw = () => {
      //描画対象のリストをなめてdrawを呼び出すだけ
      //背景
      p.background(0);
      // drawableObject
      this.drawableObjectList.forEach((elm,idx) =>{
        elm.draw()
      });
    }
  }

  constructor( private viewCommandService: ViewCommandService) {
    //p5canvasを取得
    const canvasElm = document.getElementById('mainCanvas') || undefined;
    //p5jsインスタンスを作成,実態と要素を紐付け
    this.sketch = new p5(this.p5f,canvasElm) ;
    //subscribe
    this.subscribeCommandStream();
    
  }

  ngOnInit(): void {
  }


  private subscribeCommandStream(){
    this.viewCommandService.getCommandStream().subscribe(
      //command 
      (command:any) =>{
        console.log(command);
        this.drawableObjectList.push(new TestUnitObject(this.sketch, 500*Math.random(), 500*Math.random() ));
      }
    );
  }

  //for stream test
  public drawCircle(){
    this.viewCommandService.getCommandStream().next("test send msg");
  }
}
