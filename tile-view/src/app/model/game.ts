export const PLAYER_COLOR = {
  RED : "RED",
  YELLOW : "YELLOW",
  BLUE : "BLUE", 
  WHITE : "WHITE",
  NONE : "NONE",
} as const;

export type PLAYER_COLOR = typeof PLAYER_COLOR[keyof typeof PLAYER_COLOR];

export const RESOURCE_TYPE = {
  BRICK : "BRICK",     // 土
  LUMBER : "LUMBER",   // 木
  ORE : "ORE",         // 鉄
  GRAIN : "GRAIN",     // 麦
  WOOL : "WOOL",       // 羊
  NOTHING : "NOTHING", // 荒
} as const;

export type RESOURCE_TYPE = typeof RESOURCE_TYPE[keyof typeof RESOURCE_TYPE];
