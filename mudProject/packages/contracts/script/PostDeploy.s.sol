// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
 
import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { EncounterTrigger, MapConfig, Obstruction, Position } from "../src/codegen/Tables.sol";
import { TerrainType } from "../src/codegen/Types.sol";
import { positionToEntityKey } from "../src/positionToEntityKey.sol";
 
contract PostDeploy is Script {
  function run(address worldAddress) external {
    console.log("Deployed world: ", worldAddress);
    IWorld world = IWorld(worldAddress);
 
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);
 
    TerrainType N = TerrainType.None;
    TerrainType Q = TerrainType.Question;
    TerrainType T = TerrainType.Tree;
    TerrainType X = TerrainType.Trigger;
    TerrainType Z = TerrainType.Bomb;
 
    TerrainType[20][20] memory map = [
      [N, N, N, N, N, N, Q, N, N, N, N, N, N, N, N, N, N, N, N, N],
      [N, N, N, N, N, N, N, N, Q, N, N, N, N, T, N, N, N, N, N, N],
      [N, T, T, T, T, T, T, N, N, N, N, N, N, N, N, Q, Q, N, N, N],
      [N, T, Q, Q, Q, Q, T, N, N, N, T, N, N, N, N, N, Q, N, N, N],
      [N, N, Q, Q, Q, Q, T, N, Z, N, N, N, N, Z, N, N, N, Q, N, N],
      [N, N, N, T, T, T, T, N, Z, N, Z, N, N, N, N, N, N, N, N, N],
      [N, Q, N, N, N, T, T, N, N, N, N, Q, N, N, Z, N, N, T, N, N],
      [N, N, Q, Q, Z, N, N, N, T, T, T, T, N, N, Q, N, T, N, N, N],
      [N, N, Q, N, N, N, N, T, Q, Q, T, T, T, N, Z, N, N, N, N, N],
      [N, N, N, N, Z, N, N, T, Q, Q, T, T, Q, N, Q, Q, N, N, N, N],
      [N, T, N, N, N, T, N, N, Q, Q, T, T, N, N, Q, Q, N, N, N, N],
      [N, N, T, N, N, N, Q, T, Q, Q, T, N, T, Q, Q, Q, N, N, N, N],
      [N, N, T, T, N, N, N, T, Q, N, T, N, T, N, Q, N, Z, N, Z, N],
      [N, N, N, T, T, N, N, N, N, N, N, N, N, T, N, Q, N, N, N, N],
      [N, N, Z, N, T, N, N, T, T, T, N, Z, N, N, N, N, N, N, N, N],
      [N, N, N, T, T, T, T, T, N, N, T, T, N, N, Q, N, N, N, N, N],
      [N, N, T, T, Q, N, N, N, Q, T, N, N, Z, Q, Q, Z, T, N, N, N],
      [N, Z, T, Q, N, X, Q, Q, T, N, N, N, N, Q, N, N, N, N, N, N],
      [N, N, N, Q, Q, Q, Q, N, T, N, N, Q, N, N, N, Q, N, N, N, N],
      [N, N, N, T, N, Q, N, N, T, Z, N, N, Z, N, N, N, N, N, N, N]
    ];
 
    uint32 height = uint32(map.length);
    uint32 width = uint32(map[0].length);
    bytes memory terrain = new bytes(width * height);
 
    for (uint32 y = 0; y < height; y++) {
      for (uint32 x = 0; x < width; x++) {
        TerrainType terrainType = map[y][x];
        if (terrainType == TerrainType.None) continue;
 
        terrain[(y * width) + x] = bytes1(uint8(terrainType));
 
        bytes32 entity = positionToEntityKey(x, y);
        if (terrainType == TerrainType.Tree) {
          Position.set(world, entity, x, y);
          Obstruction.set(world, entity, true);
        } else if (terrainType == TerrainType.Trigger) {
          Position.set(world, entity, x, y);
          EncounterTrigger.set(world, entity, true);
        }
      }
    }
 
    MapConfig.set(world, width, height, terrain);
 
    vm.stopBroadcast();
  }
}