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
  public NUMBER_PLATE: Map<number, Graphic|undefined>;

  public TEST_TREASURE: Graphic;
  public TEST_BACKGROUND: Graphic;
};

// 画像のロード元
// アニメーションの小回り情報もここ
// GraphicBookと一対一対応
export const GRAPHIC_DATA ={
  ROAD_KOMA: new Graphic("assets/pic/effect_road_red.png", new AnimationInfo(10,10,10,1,480,240)),
  SETTLEMENT_KOMA: new Graphic("assets/pic/effect_koma_blue.png", new AnimationInfo(10,10,10,1,480,480)),
  CITY_KOMA: new Graphic("assets/pic/test_road.png"),
  THIEF_KOMA: new Graphic("assets/pic/test_road.png"),
  NUMBER_PLATE: new Map<number, Graphic>([
    [ 2,new Graphic("assets/pic/number/2.png", new AnimationInfo(1,10,1,1,150,150))],
    [ 3,new Graphic("assets/pic/number/3.png", new AnimationInfo(1,10,1,1,150,150))],
    [ 4,new Graphic("assets/pic/number/4.png", new AnimationInfo(1,10,1,1,150,150))],
    [ 5,new Graphic("assets/pic/number/5.png", new AnimationInfo(1,10,1,1,150,150))],
    [ 6,new Graphic("assets/pic/number/6.png", new AnimationInfo(1,10,1,1,150,150))],
    [ 7,new Graphic("assets/pic/number/7.png", new AnimationInfo(1,10,1,1,150,150))],
    [ 8,new Graphic("assets/pic/number/8.png", new AnimationInfo(1,10,1,1,150,150))],
    [ 9,new Graphic("assets/pic/number/9.png", new AnimationInfo(1,10,1,1,150,150))],
    [10,new Graphic("assets/pic/number/10.png", new AnimationInfo(1,10,1,1,150,150))],
    [11,new Graphic("assets/pic/number/11.png", new AnimationInfo(1,10,1,1,150,150))],
    [12,new Graphic("assets/pic/number/12.png", new AnimationInfo(1,10,1,1,150,150))],
  ]),
  TEST_TREASURE: new Graphic("assets/pic/test_treasure.png", new AnimationInfo(10,10,5,2,192,192)),
  TEST_BACKGROUND: new Graphic("assets/pic/background_pasture.png", new AnimationInfo(1,100,1,1,480,480)),
};

/// 以下細々した定数
//ここの数値は完全に仮ぎめ
//後々必ず精査すること
export const GRAPHIC_POSITION = {
  ROAD_KOMA: [
    new Point(480, 200, 3.0 * M_PI / 3.0),
    new Point(395, 428, 4.0 * M_PI / 3.0),
    new Point(155, 468, 5.0 * M_PI / 3.0),
    new Point(0, 280, 0.0 * M_PI / 3.0),
    new Point(85, 52, 1.0 * M_PI / 3.0),
    new Point(325, 12, 2.0 * M_PI / 3.0),
  ],
  SETTLEMENT_KOMA: [
    new Point(52, 85, 5.0 * M_PI / 3.0),
    new Point(280, 0, 0.0 * M_PI / 3.0),
    new Point(468, 154, 1.0 * M_PI / 3.0),
    new Point(428, 395, 2.0 * M_PI / 3.0),
    new Point(200, 480, 3.0 * M_PI / 3.0),
    new Point(12, 325, 4.0 * M_PI / 3.0),
  ],
  CITY_KOMA: [
    new Point(200, 45, 5.0 * M_PI / 3.0),
    new Point(390, 110, 0.0 * M_PI / 3.0),
    new Point(420, 320, 1.0 * M_PI / 3.0),
    new Point(280, 440, 2.0 * M_PI / 3.0),
    new Point(90, 370, 3.0 * M_PI / 3.0),
    new Point(55, 170, 4.0 * M_PI / 3.0),
  ],
  THIEF_KOMA: new Point(200,  45, 5.0*M_PI/3.0),
  NUMBER_PLATE: new Map([
    [ 2,new Point(50, 100, 0)],
    [ 3,new Point(50, 100, 0)],
    [ 4,new Point(50, 100, 0)],
    [ 5,new Point(50, 100, 0)],
    [ 6,new Point(50, 100, 0)],
    [ 8,new Point(50, 100, 0)],
    [ 9,new Point(50, 100, 0)],
    [10,new Point(50, 100, 0)],
    [11,new Point(50, 100, 0)],
    [12,new Point(50, 100, 0)],
  ]),
}
