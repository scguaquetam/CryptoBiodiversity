import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { GameMap } from "./GameMap";
import { useMUD } from "./MUDContext";
import { useKeyboardMovement } from "./useKeyboardMovement";
import { hexToArray } from "@latticexyz/utils";
import { TerrainType, terrainTypes } from "./terrainTypes";
import { EncounterScreen } from "./EncounterScreen";
import { Entity, Has, getComponentValueStrict } from "@latticexyz/recs";
import { MonsterType, monsterTypes } from "./monsterTypes";
import { QuestionType, questionTypes } from "./questionTypes";
export const GameBoard = () => {
  useKeyboardMovement();
 
  const {
    components: { Encounter, MapConfig, Monster, Player, Position, Question },
    network: { playerEntity, singletonEntity },
    systemCalls: { spawn },
  } = useMUD();
 
  const canSpawn = useComponentValue(Player, playerEntity)?.value !== true;
 
  const players = useEntityQuery([Has(Player), Has(Position)]).map((entity) => {
    const position = getComponentValueStrict(Position, entity);
    return {
      entity,
      x: position.x,
      y: position.y,
      emoji: entity === playerEntity ? "🐻" : "🥸",
    };
  });
 
  const mapConfig = useComponentValue(MapConfig, singletonEntity);
  if (mapConfig == null) {
    throw new Error("map config not set or not ready, only use this hook after loading state === LIVE");
  }
 
  const { width, height, terrain: terrainData } = mapConfig;
  const terrain = Array.from(hexToArray(terrainData)).map((value, index) => {
    const { emoji } = value in TerrainType ? terrainTypes[value as TerrainType] : { emoji: "" };
    return {
      x: index % width,
      y: Math.floor(index / width),
      emoji,
    };
  });
 
  const encounter = useComponentValue(Encounter, playerEntity);
  const monsterType = useComponentValue(Monster, encounter ? (encounter.monster as Entity) : undefined)?.value;
  const monster = monsterType != null && monsterType in MonsterType ? monsterTypes[monsterType as MonsterType] : null;

  const questionType = useComponentValue(Question, encounter ? (encounter.question as Entity) : undefined)?.value;
  const question = questionType != null && questionType in QuestionType ? questionTypes[questionType as QuestionType] : null;

  return (
      <GameMap
        width={width}
        height={height}
        terrain={terrain}
        onTileClick={canSpawn ? spawn : undefined}
        players={players}
        encounter={
          encounter ? (
            <EncounterScreen 
              monsterName={monster?.name ?? "MissingNo"} 
              monsterEmoji={monster?.emoji ?? "💱"} 
              questionBody={question?.body ?? "Missing"}  
              opt1={question?.opt1 ?? "Missing"}  
              opt2={question?.opt2 ?? "Missing"}  
              opt3={question?.opt3 ?? "Missing"}
              correct={question?.correct ?? -1}
            />
          ) : undefined
        }
      />
  );
};