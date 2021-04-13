import { BaseObject } from './drawable-object'



//ハードウェア側の観測するべき状態と一対一対応
//ゲームルールとしてリーガル/イリーガルかとは別
export const COMMAND_TYPE = {
  PUT_ROAD: 'put road koma',
  REMOVE_ROAD: 'remove road koma',

} as const;
type COMMAND_TYPE = typeof COMMAND_TYPE[keyof typeof COMMAND_TYPE];



//コマンドから実態を抜いたもの
//stream からながれてくる
export interface CommandData {
  type: COMMAND_TYPE;
  target: string;
  value: number;
  message: string;
}

//command typeと対応する関数実態のペア
export class CommandInfo{
  public type: COMMAND_TYPE;
  public func: (cmd:CommandData)=> void;
  constructor(commandType: COMMAND_TYPE, f: (cmd:CommandData)=> void){
    this.type = commandType;
    this.func = f;
  }
  
}
