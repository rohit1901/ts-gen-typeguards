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

// Types
export type Person = {
  name: string;
};

export type Address = {
  street: string;
} & Person;

export type Point = {
  x: number;
  y: number;
};

export type Point2 = {
  x: number;
  y: number;
  z?: Point;
} & Point;

export type Point3 = {
  z: number;
  m: Person & Address;
} & Point &
  Point2;
describe("generateIntersectionTypeGuard", () => {
  //TypeAliasDeclarations
  let person: TypeAliasDeclaration;
  let address: TypeAliasDeclaration;
  let point: TypeAliasDeclaration;
  let point2: TypeAliasDeclaration;
  let point3: TypeAliasDeclaration;
  //Identifiers
  let personIdentifier: Identifier;
  let nameIdentifier: Identifier;
  let addressIdentifier: Identifier;
  let streetIdentifier: Identifier;
  let pointIdentifier: Identifier;
  let xIdentifier: Identifier;
  let yIdentifier: Identifier;
  let point2Identifier: Identifier;
  let point3Identifier: Identifier;
  let zIdentifier: Identifier;
  let mIdentifier: Identifier;
  beforeEach(() => {
    personIdentifier = factory.createIdentifier("Person");
    personIdentifier = {
      ...personIdentifier,
      getText: jest.fn().mockReturnValue("Person"),
    };
    nameIdentifier = factory.createIdentifier("Person");
    nameIdentifier = {
      ...nameIdentifier,
      getText: jest.fn().mockReturnValue("name"),
    };
    addressIdentifier = factory.createIdentifier("Address");
    addressIdentifier = {
      ...addressIdentifier,
      getText: jest.fn().mockReturnValue("Address"),
    };
    streetIdentifier = factory.createIdentifier("street");
    streetIdentifier = {
      ...streetIdentifier,
      getText: jest.fn().mockReturnValue("street"),
    };
    pointIdentifier = factory.createIdentifier("Point");
    pointIdentifier = {
      ...pointIdentifier,
      getText: jest.fn().mockReturnValue("Point"),
    };
    xIdentifier = factory.createIdentifier("x");
    xIdentifier = {
      ...xIdentifier,
      getText: jest.fn().mockReturnValue("x"),
    };
    yIdentifier = factory.createIdentifier("y");
    yIdentifier = {
      ...yIdentifier,
      getText: jest.fn().mockReturnValue("y"),
    };
    point2Identifier = factory.createIdentifier("Point2");
    point2Identifier = {
      ...point2Identifier,
      getText: jest.fn().mockReturnValue("Point2"),
    };
    point3Identifier = factory.createIdentifier("Point3");
    point3Identifier = {
      ...point3Identifier,
      getText: jest.fn().mockReturnValue("Point3"),
    };
    zIdentifier = factory.createIdentifier("z");
    zIdentifier = {
      ...zIdentifier,
      getText: jest.fn().mockReturnValue("z"),
    };
    mIdentifier = factory.createIdentifier("m");
    mIdentifier = {
      ...mIdentifier,
      getText: jest.fn().mockReturnValue("m"),
    };
    person = factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      personIdentifier,
      undefined,
      factory.createTypeLiteralNode([
        factory.createPropertySignature(
          undefined,
          nameIdentifier,
          undefined,
          factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
        ),
      ]),
    );
    address = factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      addressIdentifier,
      undefined,
      factory.createIntersectionTypeNode([
        factory.createTypeLiteralNode([
          factory.createPropertySignature(
            undefined,
            streetIdentifier,
            undefined,
            factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
          ),
        ]),
        { ...person.type },
      ]),
    );
    point = factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      pointIdentifier,
      undefined,
      factory.createTypeLiteralNode([
        factory.createPropertySignature(
          undefined,
          xIdentifier,
          undefined,
          factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
        ),
        factory.createPropertySignature(
          undefined,
          yIdentifier,
          undefined,
          factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
        ),
      ]),
    );
    point2 = factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      point2Identifier,
      undefined,
      factory.createIntersectionTypeNode([
        factory.createTypeLiteralNode([
          factory.createPropertySignature(
            undefined,
            xIdentifier,
            undefined,
            factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
          ),
          factory.createPropertySignature(
            undefined,
            yIdentifier,
            undefined,
            factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
          ),
          factory.createPropertySignature(
            undefined,
            zIdentifier,
            factory.createToken(SyntaxKind.QuestionToken),
            factory.createTypeReferenceNode(pointIdentifier, undefined),
          ),
        ]),
        factory.createTypeReferenceNode(pointIdentifier, undefined),
      ]),
    );
    point3 = factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      point3Identifier,
      undefined,
      factory.createIntersectionTypeNode([
        factory.createTypeLiteralNode([
          factory.createPropertySignature(
            undefined,
            zIdentifier,
            undefined,
            factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
          ),
          factory.createPropertySignature(
            undefined,
            mIdentifier,
            undefined,
            factory.createIntersectionTypeNode([
              { ...person.type },
              { ...address.type },
            ]),
          ),
        ]),
        { ...point.type },
        { ...point2.type },
      ]),
    );
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
