import { PLAYER_COLOR, RESOURCE_TYPE} from './game';
  
//タイルの現在の状態
//エフェクトなどによらない恒常的ゲーム上の情報
//各種Commandによって変更される
export interface TileStatus {
  //roads: { 0: typeof PLAYER_COLOR; },
  resource: RESOURCE_TYPE,
  assignedNumber: number, //TODO 値域に限定したい
  roads: Map<number, PLAYER_COLOR>,
  settlement: Map<number, PLAYER_COLOR>,
  city: Map<number, PLAYER_COLOR>,
  thief: boolean,
}

export function initTileStatus():TileStatus{
  return {
    resource: RESOURCE_TYPE.NOTHING,
    assignedNumber: 6,
    roads: new Map<number, PLAYER_COLOR>(),
    settlement: new Map<number, PLAYER_COLOR>(),
    city: new Map<number, PLAYER_COLOR>(),
    thief: false,
  }

}

