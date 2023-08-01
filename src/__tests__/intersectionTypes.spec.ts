import {
  generateIntersectionTypeGuard,
  generateTypeGuards,
} from "../generator";
import {
  factory,
  Identifier,
  SyntaxKind,
  TypeAliasDeclaration,
} from "typescript";
import { removeWhitespace } from "../utils";
import { setupVariables } from "./helpers";

describe("generateIntersectionTypeGuard", () => {
  const { person, address, point, point2, point3 } = setupVariables();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should contain name property in person", function () {
    expect(person.name.getText()).toEqual("Person");
  });
});
