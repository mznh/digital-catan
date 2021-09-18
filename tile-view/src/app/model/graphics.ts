import * as p5 from 'p5';
import { Point } from './point'
import { M_PI, toRadian, AnimationInfo, ANIMATION_TYPE ,isAnimationType, AnimationStatus, Graphic } from './base-graphics'

// 画像のロード先
// GraphicService に継承される
export class GraphicBook{
  public ROAD_KOMA: Graphic;
  public SETTLEMENT_KOMA: Graphic;
  public CITY_KOMA: Graphic;
  public THIEF_KOMA:  Graphic;

  public TEST_TREASURE: Graphic;
  public TEST_BACKGROUND: Graphic;
};

// 画像のロード元
// アニメーションの小回り情報もここ
// GraphicBookと一対一対応
export const GRAPHIC_DATA ={
  ROAD_KOMA: new Graphic("assets/pic/test_road.png", new AnimationInfo(10,10,5,2,192,192)),
  SETTLEMENT_KOMA: new Graphic("assets/pic/test_settlement.png", new AnimationInfo(10,10,5,2,192,192)),
  CITY_KOMA: new Graphic("assets/pic/test_road.png"),
  THIEF_KOMA: new Graphic("assets/pic/test_road.png"),
  TEST_TREASURE: new Graphic("assets/pic/test_treasure.png", new AnimationInfo(10,10,5,2,192,192)),
  TEST_BACKGROUND: new Graphic("assets/pic/test_back.png", new AnimationInfo(4,10,4,1,480,480)),
};

/// 以下細々した定数
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
  ],
  SETTLEMENT_KOMA:[
    new Point(200,  45, 5.0*M_PI/3.0),
    new Point(390, 110, 0.0*M_PI/3.0),
    new Point(420, 320, 1.0*M_PI/3.0),
    new Point(280, 440, 2.0*M_PI/3.0),
    new Point(90, 370, 3.0*M_PI/3.0),
    new Point(55, 170, 4.0 * M_PI / 3.0),
  ],
  CITY_KOMA:[
    new Point(200,  45, 5.0*M_PI/3.0),
    new Point(390, 110, 0.0*M_PI/3.0),
    new Point(420, 320, 1.0*M_PI/3.0),
    new Point(280, 440, 2.0*M_PI/3.0),
    new Point(90, 370, 3.0*M_PI/3.0),
    new Point(55, 170, 4.0 * M_PI / 3.0),
  ],
  THIEF_KOMA: new Point(200,  45, 5.0*M_PI/3.0),

}
