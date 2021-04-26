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
    new Point(200,  45, 5.0*M_PI/3.0),
    new Point(390, 110, 0.0*M_PI/3.0),
    new Point(420, 320, 1.0*M_PI/3.0),
    new Point(280, 440, 2.0*M_PI/3.0),
    new Point(90, 370, 3.0*M_PI/3.0),
    new Point(55, 170, 4.0 * M_PI / 3.0),
  ]
}
