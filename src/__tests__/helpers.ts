//TypeAliasDeclarations
import {
  EnumDeclaration,
  factory,
  Identifier,
  InterfaceDeclaration,
  IntersectionTypeNode,
  LiteralType,
  LiteralTypeNode,
  NumericLiteral,
  StringLiteral,
  SyntaxKind,
  TypeAliasDeclaration,
  TypeLiteralNode,
} from 'typescript';

/**
 * Setup variables for testing
 */
export const setupVariables = () => {
  /*const personIdentifier: Identifier = {
    ...factory.createIdentifier('Person'),
    getText: jest.fn().mockReturnValue('Person'),
  };
  const nameIdentifier: Identifier = {
    ...factory.createIdentifier('Person'),
    getText: jest.fn().mockReturnValue('name'),
  };
  const aLiteralType: LiteralTypeNode = factory.createLiteralTypeNode({
    ...factory.createStringLiteral('a'),
    getText: jest.fn().mockReturnValue('a'),
  });
  const addressIdentifier: Identifier = {
    ...factory.createIdentifier('Address'),
    getText: jest.fn().mockReturnValue('Address'),
  };
  const streetIdentifier: Identifier = {
    ...factory.createIdentifier('street'),
    getText: jest.fn().mockReturnValue('street'),
  };
  const pointIdentifier: Identifier = {
    ...factory.createIdentifier('Point'),
    getText: jest.fn().mockReturnValue('Point'),
  };
  const xIdentifier: Identifier = {
    ...factory.createIdentifier('x'),
    getText: jest.fn().mockReturnValue('x'),
  };
  const yIdentifier: Identifier = {
    ...factory.createIdentifier('y'),
    getText: jest.fn().mockReturnValue('y'),
  };
  const point2Identifier: Identifier = {
    ...factory.createIdentifier('Point2'),
    getText: jest.fn().mockReturnValue('Point2'),
  };
  const point3Identifier: Identifier = {
    ...factory.createIdentifier('Point3'),
    getText: jest.fn().mockReturnValue('Point3'),
  };
  const someTypeIdentifier: Identifier = {
    ...factory.createIdentifier('someType'),
    getText: jest.fn().mockReturnValue('someType'),
  };
  const zIdentifier: Identifier = {
    ...factory.createIdentifier('z'),
    getText: jest.fn().mockReturnValue('z'),
  };
  const mIdentifier: Identifier = {
    ...factory.createIdentifier('m'),
    getText: jest.fn().mockReturnValue('m'),
  };
  const person = factory.createTypeAliasDeclaration(
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
  const address = factory.createTypeAliasDeclaration(
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
  const point = factory.createTypeAliasDeclaration(
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
  const point2 = factory.createTypeAliasDeclaration(
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
  const point3: TypeAliasDeclaration = factory.createTypeAliasDeclaration(
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
  const someType = factory.createTypeAliasDeclaration(
    [factory.createToken(SyntaxKind.ExportKeyword)],
    someTypeIdentifier,
    undefined,
    factory.createUnionTypeNode([
      aLiteralType,
      factory.createLiteralTypeNode({
        ...factory.createNull(),
        getText: jest.fn().mockReturnValue(null),
      }),
      factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
      point.type,
      factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword),
      factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
      factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
      address.type,
      point2.type,
      point3.type,
      person.type,
    ]),
  );
  return {
    personIdentifier,
    nameIdentifier,
    addressIdentifier,
    streetIdentifier,
    pointIdentifier,
    xIdentifier,
    yIdentifier,
    point2Identifier,
    point3Identifier,
    zIdentifier,
    mIdentifier,
    person,
    address,
    point,
    point2,
    point3,
    someType,
  };*/
  const getNumericLiteralMock = (value: number): NumericLiteral => ({
    ...factory.createNumericLiteral(value),
    getText: jest.fn().mockReturnValue(value.toString()),
  });
  const getStringLiteralMock = (value: string): StringLiteral => ({
    ...factory.createStringLiteral(value),
    getText: jest.fn().mockReturnValue(value),
  });
  // Mock for EvenNumbers type (2 & 4 & 6 & 8)
  const evenNumbersMock: IntersectionTypeNode =
    factory.createIntersectionTypeNode([
      factory.createLiteralTypeNode(getNumericLiteralMock(2)),
      factory.createLiteralTypeNode(getNumericLiteralMock(4)),
      factory.createLiteralTypeNode(getNumericLiteralMock(6)),
      factory.createLiteralTypeNode(getNumericLiteralMock(8)),
    ]);

  // Mock for EvenNumberStrings type ("2" & "4" & "6" & "8")
  const evenNumberStringsMock: IntersectionTypeNode =
    factory.createIntersectionTypeNode([
      factory.createLiteralTypeNode(getStringLiteralMock('2')),
      factory.createLiteralTypeNode(getStringLiteralMock('4')),
      factory.createLiteralTypeNode(getStringLiteralMock('6')),
      factory.createLiteralTypeNode(getStringLiteralMock('8')),
    ]);

  // Mock for EvenNumberStringsCombi type ("2" & 4 & "6" & 8)
  const evenNumberStringsCombiMock: IntersectionTypeNode =
    factory.createIntersectionTypeNode([
      factory.createLiteralTypeNode(getStringLiteralMock('2')),
      factory.createLiteralTypeNode(getNumericLiteralMock(4)),
      factory.createLiteralTypeNode(getStringLiteralMock('6')),
      factory.createLiteralTypeNode(getNumericLiteralMock(8)),
    ]);
  const evenNumbersTypeAlias: TypeAliasDeclaration =
    factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      {
        ...factory.createIdentifier('EvenNumbers'),
        getText: jest.fn().mockReturnValue('EvenNumbers'),
      },
      undefined,
      evenNumbersMock,
    );
  const evenNumberStringsTypeAlias: TypeAliasDeclaration =
    factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      {
        ...factory.createIdentifier('EvenNumberStrings'),
        getText: jest.fn().mockReturnValue('EvenNumberStrings'),
      },
      undefined,
      evenNumberStringsMock,
    );
  const evenNumberStringsCombiTypeAlias: TypeAliasDeclaration =
    factory.createTypeAliasDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      {
        ...factory.createIdentifier('EvenNumberStringsCombi'),
        getText: jest.fn().mockReturnValue('EvenNumberStringsCombi'),
      },
      undefined,
      evenNumberStringsCombiMock,
    );
  const colorEnum: EnumDeclaration = factory.createEnumDeclaration(
    [factory.createToken(SyntaxKind.ExportKeyword)],
    {
      ...factory.createIdentifier('Color'),
      getText: jest.fn().mockReturnValue('Color'),
    },
    [
      factory.createEnumMember('Red'),
      factory.createEnumMember('Green'),
      factory.createEnumMember('Blue'),
    ],
  );
  const cityInterface: InterfaceDeclaration =
    factory.createInterfaceDeclaration(
      [factory.createToken(SyntaxKind.ExportKeyword)],
      {
        ...factory.createIdentifier('City'),
        getText: jest.fn().mockReturnValue('City'),
      },
      undefined,
      undefined,
      [
        factory.createPropertySignature(
          undefined,
          {
            ...factory.createIdentifier('name'),
            getText: jest.fn().mockReturnValue('name'),
          },
          undefined,
          factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
        ),
        factory.createPropertySignature(
          undefined,
          {
            ...factory.createIdentifier('population'),
            getText: jest.fn().mockReturnValue('population'),
          },
          undefined,
          factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
        ),
      ],
    );
  return {
    evenNumbersTypeAlias,
    evenNumberStringsTypeAlias,
    evenNumberStringsCombiTypeAlias,
    colorEnum,
    cityInterface,
  };
};
