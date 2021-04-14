import { Injectable } from '@angular/core';
import * as p5 from 'p5';

import { GraphicBook, GRAPHIC_PATH } from '../../model/graphics'

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

  public loadGraphic(){
    console.log("graphc load ")
    this.ROAD_KOMA = this.p5ref.loadImage( GRAPHIC_PATH.ROAD_KOMA );
  }
}
