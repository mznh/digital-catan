export PLAYER_COLOR = {
  RED = "RED",
  YELLOW = "YELLOW",
  BLUE = "BLUE", 
  WHITE "WHITE",
} as const

type PLAYER_COLOR = typeof PLAYER_COLOR[keyof typeof PLAYER_COLOR];
