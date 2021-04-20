import * as p5 from 'p5';
import { Point } from './point';
import { Graphic, GRAPHIC_POSITION, toRadian } from './graphics';

export class DrawableObject {
  public p5ref:any
  constructor(p:p5){
    this.p5ref = p;
  }
  public draw(){}
}

export class AnimationStatus{
  maxFrame:number;
  progress:number;
  constructor(g:Graphic){
    this.maxFrame = g.animationInfo.numOfFrames * g.animationInfo.framePerImage;
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
  public graphic:Graphic
  constructor(p:p5,graphic:Graphic){
    super(p);
    this.graphic = graphic;
    this.animationStatus = new AnimationStatus(graphic);
  }
  public draw(){}

  // animationStatus に合わせて画像描画
  //TODO 変数名がガチャガチャしてるのを直したい
  public drawAnimation(point:Point){
    const animeInfo = this.graphic.animationInfo;

    // アニメーションの何コマ目か
    const frameCount = Math.floor(this.animationStatus.progress/animeInfo.framePerImage)%animeInfo.numOfFrames;
    // 切り出したときの場所はどこか
    const indexWidth = frameCount%animeInfo.numOfWidth;
    const indexHeight = Math.floor(frameCount/animeInfo.numOfWidth); 
    
    // 必要な部分を画像から切り抜き
    const cutImage = this.graphic.image.get(
      indexWidth * animeInfo.sizeOfWidth, indexHeight * animeInfo.sizeOfHeight,
      animeInfo.sizeOfWidth, animeInfo.sizeOfHeight
    );
    drawRotateImage(this.p5ref, cutImage, point);
  }
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
  public graphic:Graphic;
  public position:number
  constructor(p:p5, pos:number, graphic:Graphic){
    super(p);
    this.graphic = graphic;
    this.position = pos;
  }
  public draw(){
    const centerX = GRAPHIC_POSITION.ROAD_KOMA[this.position].x; 
    const centerY = GRAPHIC_POSITION.ROAD_KOMA[this.position].y;
    const rotate  = GRAPHIC_POSITION.ROAD_KOMA[this.position].r;
    const point = new Point(centerX, centerY, rotate);

    this.p5ref.circle(centerX,centerY,10);
    drawRotateImage(this.p5ref,this.graphic.image,point);
  }
};

export class TestTreasure extends DrawableAnimationObject {
  public graphic:Graphic;
  public position:number
  constructor(p:p5, pos:number, graphic:Graphic){
    super(p,graphic);
    this.graphic = graphic;
    this.position = pos;
  }
  public draw(){
    const centerX = 300-90; 
    const centerY = 300-90;
    const rotate  = toRadian(0);
    
    this.drawAnimation(new Point(centerX, centerY, rotate));
    
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
