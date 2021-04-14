//drawable object で使用する定数をまとめたもの
import * as p5 from 'p5';
import { Point } from './point'

//p5.PI はインスタンスに付随する定数っぽいので同じ値をここで定義
const M_PI = 3.14159265358979323846;


// 画像のロード先
// GraphicService に継承される
export class GraphicBook{
  public ROAD_KOMA: p5.Image;
};

// 画像のロード元
// GraphicBookと一対一対応
export const GRAPHIC_PATH ={
  ROAD_KOMA: "assets/pic/test_road.png"
};

//TODO
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
