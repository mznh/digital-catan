import { Injectable } from '@angular/core';
import * as p5 from 'p5';

import { Graphic } from '../../model/base-graphics'
import { GraphicBook, GRAPHIC_DATA } from '../../model/graphics'

//ロードした画像そのものを管理/提供するサービス
@Injectable({
  providedIn: 'root'
})
export class GraphicService extends GraphicBook{
  private p5ref:any;

  constructor() {
    super();
    //this.graphics = new Graphics();
  }

  public setP5Instance(p:p5){
    this.p5ref = p;
  }

  //TODO ここもうちょいいい感じにできんか
  public loadGraphics(){
    console.log("graphc load ")
    this.ROAD_KOMA = this.loadGraphic( GRAPHIC_DATA.ROAD_KOMA );
    this.SETTLEMENT_KOMA = this.loadGraphic( GRAPHIC_DATA.SETTLEMENT_KOMA);

    //数字達 
    //Map使ってるのでundefined回避
    //TODO エラー画像作りたい
    this.NUMBER_PLATE = new Map();
    [2,3,4,5,6,7,8,9,10,11,12].map((tileNum:number)=>{
      const gData = GRAPHIC_DATA.NUMBER_PLATE.get(tileNum);
      if(gData !== undefined){
        this.NUMBER_PLATE.set(tileNum, this.loadGraphic(gData));
      }
    });

    this.TEST_TREASURE = this.loadGraphic( GRAPHIC_DATA.TEST_TREASURE );
    this.TEST_BACKGROUND = this.loadGraphic( GRAPHIC_DATA.TEST_BACKGROUND );
  }
  // 各graphicに画像を読み込ませる
  public loadGraphic(graphic:Graphic){
    graphic.image = this.p5ref.loadImage( graphic.filePath );

    return graphic;
  }
}
