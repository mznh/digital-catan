import * as p5 from 'p5';
import { Point } from './point';
import { Graphic, AnimationStatus, ANIMATION_TYPE, toRadian } from './base-graphics';
import { GRAPHIC_POSITION } from './graphics';

export class DrawableObject {
  public p5ref:any
  constructor(p:p5){
    this.p5ref = p;
  }
  public draw(){}
}

export class DrawableAnimationObject extends DrawableObject {
  public animationStatus :AnimationStatus;
  public graphic:Graphic
  constructor(
      p:p5,graphic:Graphic,
      animationType:ANIMATION_TYPE = ANIMATION_TYPE.ONCE){
    super(p);
    this.graphic = graphic;
    this.animationStatus = new AnimationStatus(graphic,animationType);
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


//(x,y) に r だけ回転させて画像を描画
//TODO 回転軸が人間にやさしくないのを修正したい
export function drawRotateImage(p:p5, img:p5.Image, point:Point){
  p.translate(point.x,point.y);
  p.rotate(point.r);
  p.image(img,0,0);
  p.rotate(-1*point.r);
  p.translate(-1*point.x,-1*point.y);
}

