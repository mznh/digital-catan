import * as p5 from 'p5';
import { Point } from './point';
import { Graphic, GRAPHIC_POSITION } from './graphics';

export class DrawableObject {
  public p5ref:any
  //public isAnime:boolean;
  constructor(p:p5){
    this.p5ref = p;
    //this.isAnime = false;
  }
  public draw(){}
}

export class AnimationStatus{
  maxFrame:number;
  progress:number;
  constructor(maxFrame:number){
    this.maxFrame = maxFrame;
    this.progress = 0;
  }
  public isFinished(){
    //ここ = いらんかも
    return this.progress >= this.maxFrame;
  }
  public terminate(){
    this.maxFrame = 0;
  }
  public nextFrame(){
    this.progress += 1;
  }
}


export class DrawableAnimationObject extends DrawableObject {
  public animationStatus :AnimationStatus;
  public isAnime:boolean;
  constructor(p:p5,graphic:Graphic){
    super(p);
    this.isAnime = true;
    this.animationStatus = new AnimationStatus(graphic.animationInfo.numOfFrames*graphic.animationInfo.framePerImage);
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
  public graphic:Graphic;
  constructor(p:p5, pos:number, graphic:Graphic){
    super(p);
    this.position = pos;
    this.graphic = graphic;
  }
  public draw(){
    const centerX = GRAPHIC_POSITION.ROAD_KOMA[this.position].x; 
    const centerY = GRAPHIC_POSITION.ROAD_KOMA[this.position].y;
    const rotate  = GRAPHIC_POSITION.ROAD_KOMA[this.position].r;
    const point = new Point(centerX, centerY, rotate);
    //const point = new Point(centerX,centerY,rotate);

    this.p5ref.circle(centerX,centerY,10);
    drawRotateImage(this.p5ref,this.graphic.image,point);
  }
};

export class TestTreasure extends DrawableAnimationObject {
  public position:number
  public graphic:Graphic;
  constructor(p:p5, pos:number, graphic:Graphic){
    super(p,graphic);
    this.position = pos;
    this.graphic = graphic;

  }
  public draw(){
    const centerX = 300-90; 
    const centerY = 300-90;
    const rotate  = 0;
    
    //仮実装
    //あとで切り出す

    // アニメーションの何コマ目か
    const frameCount = Math.floor(
      this.animationStatus.progress/this.graphic.animationInfo.framePerImage)%this.graphic.animationInfo.numOfFrames;
    // 切り出したときの場所はどこか
    const indexWidth = frameCount%this.graphic.animationInfo.numOfWidth;
    const indexHeight = Math.floor(frameCount/this.graphic.animationInfo.numOfWidth); 
    //console.log(frameCount,indexWidth,indexHeight)
    
    // 必要な画像を取ってくる処理
    this.p5ref.image(
      this.graphic.image,centerX,centerY,
      this.graphic.animationInfo.sizeOfWidth, this.graphic.animationInfo.sizeOfHeight,
      indexWidth * this.graphic.animationInfo.sizeOfWidth,
      indexHeight * this.graphic.animationInfo.sizeOfHeight,
      this.graphic.animationInfo.sizeOfWidth, this.graphic.animationInfo.sizeOfHeight,

    );
    
    //最後にかならず呼び出す
    this.animationStatus.nextFrame();
  }
};


//(x,y) に r だけ回転させて画像を描画
//TODO 回転軸が人間にやさしくないのを修正したい
function drawRotateImage(p:p5, img:p5.Image, point:Point){
  p.translate(point.x,point.y);
  p.rotate(point.r);
  p.image(img,0,0);
  p.rotate(-1*point.r);
  p.translate(-1*point.x,-1*point.y);
}
