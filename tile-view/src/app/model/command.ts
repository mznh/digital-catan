// TODO これは具体的な値のリストなので別に切り出したい
// 以下と一対一対応
// ハードウェア側の観測するべき状態
// 管制モジュールから通達される状態
// ゲームルールとしてリーガル/イリーガルかとは別
export const COMMAND_TYPE = {
	// プレイヤーの動作
  PUT_ROAD: 'PUT_ROAD',
  REMOVE_ROAD: 'REMOVE_ROAD',
	PUT_SETTLEMENT: 'PUT_SETTLEMENT',
	REMOVE_SETTLEMENT: 'REMOVE_SETTLEMENT',
	PUT_CITY :'PUT_CITY',
	REMOVE_CITY :'REMOVE_CITY',
	PUT_THIEF :'PUT_THIEF',
	REMOVE_THIEF :'REMOVE_THIEF',

	// ゲームシステムからの動作
	SET_NEIGHBORHOOD_TILE	:'SET_NEIGHBORHOOD_TILE',
	SET_TILE_NUMBER	:'SET_TILE_NUMBER',
	SET_PORT	:'SET_PORT',
	SET_RESOURCE_TYPE	:'SET_RESOURCE_TYPE',
	USE_PORT	:'USE_PORT',

	TELL_DISE_VALUE	:'TELL_DISE_VALUE',

	//戦略カード
	USE_KNIGHT_CARD	:'USE_KNIGHT_CARD',
	USE_PROGRESS_CARD	:'USE_PROGRESS_CARD',
	USE_VICTORY_POINT_CARD	:'USE_VICTORY_POINT_CARD',

	//ロンゲストロード
	CREATE_LONGEST_ROAD	:'CREATE_LONGEST_ROAD',
	UPDATE_LONGEST_ROAD	:'UPDATE_LONGEST_ROAD',
	TELL_PART_OF_LONGEST_ROAD	:'TELL_PART_OF_LONGEST_ROAD',

	TELL_GAME_START	:'TELL_GAME_START',
	TELL_GAME_WINNER	:'TELL_GAME_WINNER',
	TELL_GAME_END	:'TELL_GAME_END',

	// テストコマンド
  TEST_TREASURE: 'TEST_TREASURE',
	// 現状汎用的なエラー
  UNKNOWN_ERROR: 'UNKNOWN_ERROR' 
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
