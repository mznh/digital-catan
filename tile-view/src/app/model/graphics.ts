import * as p5 from 'p5';
import { Point } from './point'

//p5.PI はインスタンスに付随する定数っぽいので同じ値をここで定義
const M_PI = 3.14159265358979323846;

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
  constructor(numOfFrames:number,framePerImage:number,
    numOfWidth:number, numOfHeight:number, sizeOfWidth:number, sizeOfHeight:number){
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

// 画像のロード先
// GraphicService に継承される
export class GraphicBook{
  public ROAD_KOMA: Graphic;
  public TEST_TREASURE: Graphic;
};

// 画像のロード元
// GraphicBookと一対一対応
export const GRAPHIC_DATA ={
  ROAD_KOMA: new Graphic("assets/pic/test_road.png"),
  TEST_TREASURE: new Graphic("assets/pic/test_treasure.png", new AnimationInfo(10,10,5,2,192,192)),
};

/// 以下細々した定数
//TODO 別に移す
//ここの数値は完全に仮ぎめ
//後々必ず精査すること
export const GRAPHIC_POSITION ={
  ROAD_KOMA:[
    new Point(270,  45, 5.0*M_PI/3.0),
    new Point(493, 170, 0.0*M_PI/3.0),
    new Point(493, 420, 1.0*M_PI/3.0),
    new Point(270, 540, 2.0*M_PI/3.0),
    new Point( 55, 415, 3.0*M_PI/3.0),
    new Point( 55, 170, 4.0*M_PI/3.0),
  ]
}
