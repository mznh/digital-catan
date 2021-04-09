import * as p5 from 'p5';


export class BaseObject {
  public p5ref:any
  constructor(p:p5){
    this.p5ref = p;
  }
  public draw(){}

}

export class TestUnitObject extends BaseObject {
  public x:number;
  public y:number;
  constructor(p:p5, x:number, y:number ){
    super(p);
    this.x = x;
    this.y = y;
  }
  public draw(){
    this.p5ref.circle(this.x,this.y,40);
  }
};
