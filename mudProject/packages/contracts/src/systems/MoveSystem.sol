// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System } from "@latticexyz/world/src/System.sol";
import { IStore } from "@latticexyz/store/src/IStore.sol";
import {Position, PositionTableId, Player, Health, Damage} from "../codegen/Tables.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";
import {getKeysWithValue} from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

contract MoveSystem is System {
	function move(int32 x, int32 y) public {
    bytes32 player = addressToEntityKey(address(_msgSender()));
    // check if there is a player at the position
    bytes32[] memory atPosition = getKeysWithValue(PositionTableId, Position.encode(x, y));
    require(atPosition.length == 0, "position occupied");

    Position.set(player, x, y);
  }
  function spawn(int32 x, int32 y) public {
    bytes32 player = addressToEntityKey(address(_msgSender()));
    require(!Player.get(player), "already spawned");
    Player.set(player, true);
    Position.set(player, x, y);
    Health.set(player, 100);
    Damage.set(player, 10);
  }
}