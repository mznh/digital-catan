import * as p5 from 'p5';
import { Point } from './point';
import { Graphic, AnimationStatus, ANIMATION_TYPE, toRadian } from './base-graphics';
import { GRAPHIC_POSITION } from './graphics';
import {DrawableObject, DrawableAnimationObject, drawRotateImage } from './drawable-object';


export class RoadKoma extends DrawableObject {
  public graphic:Graphic;
  public position:number
  //コンストラクタは変えない
  constructor(p:p5, pos:number, graphic:Graphic){
    super(p);
    this.graphic = graphic;
    this.position = pos;
  }

  //描画処理
  public draw(){
    // 描画位置指定
    const centerX = GRAPHIC_POSITION.ROAD_KOMA[this.position].x; 
    const centerY = GRAPHIC_POSITION.ROAD_KOMA[this.position].y;
    const rotate  = GRAPHIC_POSITION.ROAD_KOMA[this.position].r;
    const point = new Point(centerX, centerY, rotate);

    // 描画位置確認用
    // 適宜消してください
    this.p5ref.circle(centerX,centerY,10);

    //画像描画
    drawRotateImage(this.p5ref,this.graphic.image,point);
  }
};


export class SettlementKoma extends DrawableAnimationObject {
  public graphic:Graphic;
  public position:number
  //コンストラクタは変えない
  constructor(p:p5, animationType:any, graphic:Graphic){
    super(p,graphic,animationType);
    this.graphic = graphic;
    this.position = 0;
  }
  public draw(){
    const centerX = GRAPHIC_POSITION.ROAD_KOMA[this.position].x; 
    const centerY = GRAPHIC_POSITION.ROAD_KOMA[this.position].y;
    const rotate  = GRAPHIC_POSITION.ROAD_KOMA[this.position].r;
    const point = new Point(centerX, centerY, rotate);

    this.p5ref.circle(centerX,centerY,10);
    // アニメーションの場合はこれを呼び出す
    this.drawAnimation(new Point(centerX, centerY, rotate));

    //アニメーションならば最後にかならず呼び出す
    this.animationStatus.nextFrame();
  }
};




////FOR TEST OBJECT 
export class TestUnitObject extends DrawableObject {
  public pos:Point;
  constructor(p:p5, point:Point ){
    super(p);
    this.pos = point;
  }
  public draw(){
    this.p5ref.circle(this.pos.x,this.pos.y,40);
  }
};

//アニメーションの雛形
export class TestTreasure extends DrawableAnimationObject {
  public graphic:Graphic;
  public position:number
  //コンストラクタは変えない
  constructor(p:p5, animationType:any, graphic:Graphic){
    super(p,graphic,animationType);
    this.graphic = graphic;
    this.position = 0;
  }
  //描画処理
  public draw(){
    // 描画位置指定
    const centerX = 240-90; 
    const centerY = 240-90;
    const rotate  = toRadian(0);
    
    this.drawAnimation(new Point(centerX, centerY, rotate));
    
    //最後にかならず呼び出す
    this.animationStatus.nextFrame();
  }
};

