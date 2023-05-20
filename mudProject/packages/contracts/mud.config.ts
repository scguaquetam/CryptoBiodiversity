import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Damage: "uint32",
    Health: "uint32",
    Player: "bool",
    Position: {
      name: "Position",
      schema: {
        x: "int32",
        y: "int32",
      },
    },
  },
  modules: [
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Counter")],
    },
    // TODO: Add reverse lookup for Position
  ],
});
