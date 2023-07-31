import { generateIntersectionTypeGuard, generateTypeGuards } from "@generator";
import {
  factory,
  Identifier,
  SyntaxKind,
  TypeAliasDeclaration,
} from "typescript";
import { removeWhitespace } from "@utils";
import { setupVariables } from "./helpers";

describe("generateIntersectionTypeGuard", () => {
  const { person, address, point, point2, point3 } = setupVariables();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should contain name property in person", function () {
    expect(person.name.getText()).toEqual("Person");
  });
  it("should generate typeguard for person", function () {
    const expectedResult =
      removeWhitespace(`export function isPerson(value: any): value is Person {
          if (typeof value !== 'object' || value === null) {
            return false;
          }
        
          if (!value.hasOwnProperty('name') || typeof value.name !== 'string') {
            return false;
          }
        
          return true;
        }`);
    const typeGuards = generateTypeGuards([person]);
    expect(removeWhitespace(typeGuards)).toEqual(expectedResult);
  });
  //create test for address
  it("should generate typeguard for address", function () {
    const expectedResult =
      removeWhitespace(`export function isAddress(value: any): value is Address {
            if (typeof value !== 'object' || value === null) {
                return false;
            }
            if (!value.hasOwnProperty('street') || typeof value.street !== 'string') {
                return false;
            }
            if (!value.hasOwnProperty('name') || typeof value.name !== 'string') {
                return false;
            }
            return true;
        }`);
    const typeGuards = generateTypeGuards([address]);
    expect(removeWhitespace(typeGuards)).toEqual(expectedResult);
  });
  //create test for point
  it("should generate typeguard for point", function () {
    const expectedResult =
      removeWhitespace(`export function isPoint(value: any): value is Point {
            if (typeof value !== 'object' || value === null) {
                return false;
            }
            if (!value.hasOwnProperty('x') || typeof value.x !== 'number') {
                return false;
            }
            if (!value.hasOwnProperty('y') || typeof value.y !== 'number') {
                return false;
            }
            return true;
        }`);
    const typeGuards = generateTypeGuards([point]);
    expect(removeWhitespace(typeGuards)).toEqual(expectedResult);
  });
  //create test for point2
  it("should generate typeguard for point2", function () {
    const expectedResult =
      removeWhitespace(`export function isPoint2(value: any): value is Point2 {
            if (typeof value !== 'object' || value === null) {
                return false;
            }
            if (!value.hasOwnProperty('x') || typeof value.x !== 'number') {
                return false;
            }
            if (!value.hasOwnProperty('y') || typeof value.y !== 'number') {
                return false;
            }
            if (value.hasOwnProperty('z') && !isPoint(value.z)) {
                return false;
            }
            return true;
        }`);
    const typeGuards = generateTypeGuards([point2]);
    expect(removeWhitespace(typeGuards)).toEqual(expectedResult);
  });
  //create test for point3
  it("should generate typeguard for point3", function () {
    const expectedResult =
      removeWhitespace(`export function isPoint3(value: any): value is Point3 {
          if (typeof value !== 'object' || value === null) {
            return false;
          }
        
          if (!value.hasOwnProperty('z') || typeof value.z !== 'number') {
            return false;
          }
          if (!value.hasOwnProperty('name') || typeof value.name !== 'string') {
            return false;
          }
          if (!value.hasOwnProperty('x') || typeof value.x !== 'number') {
            return false;
          }
          if (!value.hasOwnProperty('y') || typeof value.y !== 'number') {
            return false;
          }
        
          return true;
        }`);
    const typeGuards = generateTypeGuards([point3]);
    expect(removeWhitespace(typeGuards)).toEqual(expectedResult);
  });
});
