export const PLAYER_COLOR = {
  RED : "RED",
  YELLOW : "YELLOW",
  BLUE : "BLUE", 
  WHITE : "WHITE",
  NONE : "NONE",
} as const;

export type PLAYER_COLOR = typeof PLAYER_COLOR[keyof typeof PLAYER_COLOR];
