// Usage example:
import {generateTypeGuards} from "./generator";

const typesInput = `{
  "Person": {
    "kind": "interface",
    "properties": {
      "name": "string",
      "age": "number"
    }
  },
  "Shape": {
    "kind": "type",
    "properties": {
      "type": "'circle' | 'square'",
      "radius": "number",
      "sideLength": "number"
    }
  },
  "Color": {
    "kind": "enum",
    "values": ["Red", "Green", "Blue"]
  },
  "UnionType": {
    "kind": "union",
    "types": ["Person", "Shape"]
  }
}`;

const typeGuardsOutput = generateTypeGuards(typesInput);
console.log(typeGuardsOutput);
