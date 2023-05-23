export enum TerrainType {
  Question = 1,
  Tree,
  Trigger,
  Bomb,
}

type TerrainConfig = {
  emoji: string;
};

export const terrainTypes: Record<TerrainType, TerrainConfig> = {
  [TerrainType.Question]: {
    emoji: "🤔",
  },
  [TerrainType.Tree]: {
    emoji: "🌳",
  },
  [TerrainType.Trigger]: {
    emoji: "🤔",
  },
  [TerrainType.Bomb]: {
    emoji: "💣",
  },
};
