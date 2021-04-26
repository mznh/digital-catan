// 以下と一対一対応
// ハードウェア側の観測するべき状態
// 管制モジュールから通達される状態
// ゲームルールとしてリーガル/イリーガルかとは別
export const COMMAND_TYPE = {
  PUT_ROAD: 'PUT_ROAD',
  REMOVE_ROAD: 'REMOVE_ROAD',
  TEST_TREASURE: 'TEST_TREASURE',
} as const;
type COMMAND_TYPE = typeof COMMAND_TYPE[keyof typeof COMMAND_TYPE];

// stream からながれてくる
//コマンドから実態を抜いたもの
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
