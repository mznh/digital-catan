import * as p5 from 'p5';
import { Point } from './point'

//ロードされた画像そのものを取り扱うための各種クラスや関数

//p5.PI はインスタンスに付随する定数っぽいので同じ値をここで定義
export const M_PI = 3.14159265358979323846;

export function toRadian(degree:number){
  return degree/180*M_PI;
}

//TODO 変数名ごちゃっとしすぎか?
// アニメーションのコマ割りデータ
// AnimationInfo(numOfFrames, framePerImage, numOfWidth, numOfHeight, sizeOfWidth, sizeOfHeight)
// AnimationInfo(5, 10, 4, 2, 100,100)
// [0, 1, 2, 3]
// [4, /, /, /]
// 10 drawごとに1コマ進む
export class AnimationInfo{
  public numOfFrames:number; 
  public numOfWidth:number; 
  public numOfHeight:number;
  public sizeOfWidth:number;
  public sizeOfHeight:number;
  public framePerImage:number;
  constructor(
      numOfFrames:number, framePerImage:number,
      numOfWidth:number, numOfHeight:number,
      sizeOfWidth:number, sizeOfHeight:number){
    this.numOfFrames = numOfFrames; 
    this.framePerImage = framePerImage;
    this.numOfWidth = numOfWidth; 
    this.numOfHeight = numOfHeight;
    this.sizeOfWidth = sizeOfWidth;
    this.sizeOfHeight = sizeOfHeight;
  }
}

// アニメーションのパターン
export const ANIMATION_TYPE = {
  ONCE: 'ONCE',
  STOP: 'STOP',
  LOOP: 'LOOP',
} as const;
export type ANIMATION_TYPE = typeof ANIMATION_TYPE[keyof typeof ANIMATION_TYPE];
export function isAnimationType(str:string){
  return str == ANIMATION_TYPE.ONCE || 
         str == ANIMATION_TYPE.STOP || 
         str == ANIMATION_TYPE.LOOP  
}

export class AnimationStatus{
  maxFrame:number;
  progress:number;
  type: ANIMATION_TYPE;
  constructor(g:Graphic,type:ANIMATION_TYPE = ANIMATION_TYPE.ONCE){
    // 0 オリジンなので1引く
    this.maxFrame = g.animationInfo.numOfFrames * g.animationInfo.framePerImage-1;
    this.progress = 0;
    this.type = type;
  }

  public isFinished(){
    if(this.type === ANIMATION_TYPE.LOOP){
      return false;
    }if(this.type === ANIMATION_TYPE.STOP){
      return false;
    }else{
      return this.progress >= this.maxFrame;
    }
  }
  public terminate(){
    // LOOP しないように設定
    this.type = ANIMATION_TYPE.ONCE;
    this.maxFrame = 0;
  }
  public nextFrame(){
    //1ループ終わった かつ ループする設定ならば
    if(this.progress >= this.maxFrame && this.type === ANIMATION_TYPE.LOOP){
      //最初に戻す
      this.progress = 0;
    //1ループ終わった かつ ループする設定ならば
    }else if(this.progress >= this.maxFrame && this.type === ANIMATION_TYPE.STOP){
      // progress を進めない
      this.progress += 0;
    }else{
      // それ以外は progress を進める
      this.progress += 1;
    }
  }
}


// 画像素材一つの情報
// アニメーション素材はそれで一つと考える
//TODO isAnimeいらなさそう
export class Graphic{
  public filePath:string;
  public image:p5.Image;
  public isAnime: boolean;
  public animationInfo: AnimationInfo;

  constructor(filePath:string, animationInfo?:AnimationInfo){
    this.filePath = filePath;
    if(animationInfo){
      this.isAnime = true;
      this.animationInfo = animationInfo;
    }else{
      this.isAnime = false;
    }
  }
}

