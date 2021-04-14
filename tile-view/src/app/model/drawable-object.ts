import * as p5 from 'p5';
import { Point } from './point';
import { GRAPHIC_POSITION } from './graphics';

export class DrawableObject {
  public p5ref:any
  constructor(p:p5){
    this.p5ref = p;
  }
  public draw(){}

}

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


export class RoadKoma extends DrawableObject {
  public position:number
  public img:p5.Image;
  constructor(p:p5, pos:number, img:p5.Image){
    super(p);
    this.position = pos;
    this.img = img;
  }
  public draw(){
    const centerX = GRAPHIC_POSITION.ROAD_KOMA[this.position].x; 
    const centerY = GRAPHIC_POSITION.ROAD_KOMA[this.position].y;
    const rotate  = GRAPHIC_POSITION.ROAD_KOMA[this.position].r;
    const point = new Point(centerX,centerY,rotate);

    this.p5ref.circle(centerX,centerY,10);
    drawRotateImage(this.p5ref,this.img,point);
  }
};



//(x,y) に r だけ回転させて画像を描画
//TODO 回転軸が人間にやさしくないのを修正
function drawRotateImage(p:p5, img:p5.Image, point:Point){
  p.translate(point.x,point.y);
  p.rotate(point.r);
  p.image(img,0,0);
  p.rotate(-1*point.r);
  p.translate(-1*point.x,-1*point.y);
}
