// Generated using ts-gen-typeguards
import {
  CarEnum,
  VehicleEnum,
  Container,
  PropertyContainer,
  ShapeGeneric,
  AddressInterface,
  PersonInterface,
  EmployeeInterface,
  CircleInterface,
  SquareInterface,
  TriangleInterface,
  CarInterface,
  ElectricCarInterface,
  SportsCarInterface,
  AnimalInterface,
  DogInterface,
  CatInterface,
  CalculatorInterface,
  DictionaryInterface,
  PersonWithOptionalAddressInterface,
  ImageInterface,
  VideoInterface,
  AddressOptional,
  ContactOptional,
  LogLevelUnionEnum,
  ContainerOfString,
  ContainerOfNumber,
  ColorContainer,
  RedContainer,
  GreenContainer,
  BlueContainer,
  OptionalContainerOfString,
  OptionalContainerOfNumber,
  DirectionGeneric,
  DirectionContainer,
  UpDirectionContainer,
  DownDirectionContainer,
  ColoredCircle,
  ColoredSquare,
  VehicleWithType,
  CarWithInfo,
  BikeWithInfo,
  OptionalUser,
  CustomShapeInterface,
  MediaInterface,
  DirectionType,
  EvenNumbersType,
  BooleanStatesType,
  StatusCodeType,
  StatusType,
  GreetingType,
  NumberStringComboType,
  GreetingFlagType,
  LiteralOrUnionType,
  AnyType,
  UnknownType,
  AnyUnknownUnionType,
  AnyUnknownUnionWithOthersType,
  PersonOptional,
  ProjectOptional,
  CompanyOptional,
  AddressType,
  PersonType,
  NumberOrStringType,
  ResultType,
  PaymentMethodType,
  CarType,
  PaymentType,
  TransactionStatus,
  ProductType,
  DataType,
  VehicleType,
  ActionType,
  TargetType,
  ShapeType,
  CustomShapeType,
  LogLevelIntersectionEnum,
  ExtendedDirectionEnum,
  ShapeWithProperty,
  AnyUnknownIntersectionType,
  AnyUnknownIntersectionWithOthersType,
  IntersectionTest,
  EmployeeOptional,
  EmployeeType,
  ElectricCarType,
  SportsCar,
  CarDetailsType,
  AddAction,
  RemoveAction,
  CircleType,
  SquareType,
  TriangleType,
  DirectionEnum,
  ColorEnum,
  MixedValuesEnum,
  ComputedValuesEnum,
  StatusEnum,
  TrafficLightEnum,
  LogLevelEnum,
  ColorEnumGeneric,
  VehicleTypeGeneric,
  MediaTypeInterface,
  ColorTypeAliasType,
  MediaTypeType,
  ImageTypeType,
  VideoType,
} from '../input/combinedTypeGuards';
export function isCarEnum(value: any): value is CarEnum {
  return (
    typeof value === 'object' &&
    value !== null &&
    'make' in value &&
    typeof value.make === 'string' &&
    'model' in value &&
    typeof value.model === 'string' &&
    'color' in value &&
    isColorEnum(value.color)
  );
}
export function isVehicleEnum(value: any): value is VehicleEnum {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value.type === 'CAR' || value.type === 'BIKE') &&
    'direction' in value &&
    isDirectionEnum(value.direction)
  );
}
export function isContainer<T>(
  value: any,
  isT: (val: any) => val is T,
): value is Container<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'value' in value &&
    isT(value.value)
  );
}
export function isPropertyContainer<T>(
  value: any,
  isT: (val: any) => val is T,
): value is PropertyContainer<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'value' in value &&
    isT(value.value) &&
    (typeof value.additionalValue === 'undefined' ||
      ('additionalValue' in value && isT(value.additionalValue)))
  );
}
export function isShapeGeneric(value: any): value is ShapeGeneric {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value.type === 'circle' ||
      value.type === 'square' ||
      value.type === 'triangle')
  );
}
export function isAddressInterface(value: any): value is AddressInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'street' in value &&
    typeof value.street === 'string' &&
    'city' in value &&
    typeof value.city === 'string'
  );
}
export function isPersonInterface(value: any): value is PersonInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'age' in value &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      ('address' in value && isAddressInterface(value.address)))
  );
}
export function isEmployeeInterface(value: any): value is EmployeeInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'jobTitle' in value &&
    typeof value.jobTitle === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'age' in value &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      ('address' in value && isAddressInterface(value.address)))
  );
}
export function isCircleInterface(value: any): value is CircleInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === 'circle' &&
    'radius' in value &&
    typeof value.radius === 'number'
  );
}
export function isSquareInterface(value: any): value is SquareInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === 'square' &&
    'sideLength' in value &&
    typeof value.sideLength === 'number'
  );
}
export function isTriangleInterface(value: any): value is TriangleInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === 'triangle' &&
    'base' in value &&
    typeof value.base === 'number' &&
    'height' in value &&
    typeof value.height === 'number'
  );
}
export function isCarInterface(value: any): value is CarInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'brand' in value &&
    typeof value.brand === 'string' &&
    'model' in value &&
    typeof value.model === 'string'
  );
}
export function isElectricCarInterface(
  value: any,
): value is ElectricCarInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'batteryCapacity' in value &&
    typeof value.batteryCapacity === 'number' &&
    'brand' in value &&
    typeof value.brand === 'string' &&
    'model' in value &&
    typeof value.model === 'string'
  );
}
export function isSportsCarInterface(value: any): value is SportsCarInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'topSpeed' in value &&
    typeof value.topSpeed === 'number' &&
    'brand' in value &&
    typeof value.brand === 'string' &&
    'model' in value &&
    typeof value.model === 'string'
  );
}
export function isAnimalInterface(value: any): value is AnimalInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string'
  );
}
export function isDogInterface(value: any): value is DogInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'breed' in value &&
    typeof value.breed === 'string' &&
    'name' in value &&
    typeof value.name === 'string'
  );
}
export function isCatInterface(value: any): value is CatInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'color' in value &&
    typeof value.color === 'string' &&
    'name' in value &&
    typeof value.name === 'string'
  );
}
export function isCalculatorInterface(
  value: any,
): value is CalculatorInterface {
  return typeof value === 'object' && value !== null;
}
export function isDictionaryInterface(
  value: any,
): value is DictionaryInterface {
  return typeof value === 'object' && value !== null;
}
export function isPersonWithOptionalAddressInterface(
  value: any,
): value is PersonWithOptionalAddressInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'age' in value &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      ('address' in value && typeof value.address === 'string'))
  );
}
export function isImageInterface(value: any): value is ImageInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === MediaTypeInterface.Image &&
    'url' in value &&
    typeof value.url === 'string'
  );
}
export function isVideoInterface(value: any): value is VideoInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === MediaTypeInterface.Video &&
    'source' in value &&
    typeof value.source === 'string'
  );
}
export function isAddressOptional(value: any): value is AddressOptional {
  return (
    typeof value === 'object' &&
    value !== null &&
    'street' in value &&
    'city' in value &&
    typeof value.city === 'string' &&
    (typeof value.postalCodeOptional === 'undefined' ||
      ('postalCodeOptional' in value &&
        typeof value.postalCodeOptional === 'string'))
  );
}
export function isContactOptional(value: any): value is ContactOptional {
  return (
    typeof value === 'object' &&
    value !== null &&
    'email' in value &&
    typeof value.email === 'string' &&
    'phone' in value &&
    typeof value.phone === 'string' &&
    (typeof value.faxOptional === 'undefined' ||
      ('faxOptional' in value && typeof value.faxOptional === 'string'))
  );
}
export function isLogLevelUnionEnum(value: any): value is LogLevelUnionEnum {
  return (
    value !== null &&
    (value === LogLevelEnum.Debug ||
      value === LogLevelEnum.Info ||
      value === LogLevelEnum.Error)
  );
}
export function isContainerOfString(
  value: any,
  isString: (v: any) => v is string,
): value is ContainerOfString {
  return value !== null && isContainer<string>(value, isString);
}
export function isContainerOfNumber(
  value: any,
  isNumber: (v: any) => v is number,
): value is ContainerOfNumber {
  return value !== null && isContainer<number>(value, isNumber);
}
export function isColorContainer<T extends ColorEnumGeneric>(
  value: any,
  isT: (val: any) => val is T,
): value is ColorContainer<T> {
  return (
    typeof value === 'object' && value !== null && isContainer<T>(value, isT)
  );
}
export function isRedContainer(
  value: any,
  isColorEnumGeneric: (v: any) => v is ColorEnumGeneric.Red,
): value is RedContainer {
  return (
    value !== null &&
    isColorContainer<ColorEnumGeneric.Red>(value, isColorEnumGeneric)
  );
}
export function isGreenContainer(
  value: any,
  isColorEnumGeneric: (v: any) => v is ColorEnumGeneric.Green,
): value is GreenContainer {
  return (
    value !== null &&
    isColorContainer<ColorEnumGeneric.Green>(value, isColorEnumGeneric)
  );
}
export function isBlueContainer(
  value: any,
  isColorEnumGeneric: (v: any) => v is ColorEnumGeneric.Blue,
): value is BlueContainer {
  return (
    value !== null &&
    isColorContainer<ColorEnumGeneric.Blue>(value, isColorEnumGeneric)
  );
}
export function isOptionalContainerOfString(
  value: any,
  isString: (v: any) => v is string,
): value is OptionalContainerOfString {
  return value !== null && isPropertyContainer<string>(value, isString);
}
export function isOptionalContainerOfNumber(
  value: any,
  isNumber: (v: any) => v is number,
): value is OptionalContainerOfNumber {
  return value !== null && isPropertyContainer<number>(value, isNumber);
}
export function isDirectionGeneric(value: any): value is DirectionGeneric {
  return (
    value !== null &&
    (value === 'up' ||
      value === 'down' ||
      value === 'left' ||
      value === 'right')
  );
}
export function isDirectionContainer<T extends DirectionGeneric>(
  value: any,
  isT: (val: any) => val is T,
): value is DirectionContainer<T> {
  return (
    typeof value === 'object' && value !== null && isContainer<T>(value, isT)
  );
}
export function isUpDirectionContainer(
  value: any,
  isUp: (v: any) => v is 'up',
): value is UpDirectionContainer {
  return value !== null && isDirectionContainer<'up'>(value, isUp);
}
export function isDownDirectionContainer(
  value: any,
  isDown: (v: any) => v is 'down',
): value is DownDirectionContainer {
  return value !== null && isDirectionContainer<'down'>(value, isDown);
}
export function isColoredCircle(
  value: any,
  isCustomType: (val: any) => val is { type: 'circle'; radius: number },
): value is ColoredCircle {
  return (
    value !== null &&
    isShapeWithProperty<{ type: 'circle'; radius: number }>(value, isCustomType)
  );
}
export function isColoredSquare(
  value: any,
  isCustomType: (val: any) => val is { type: 'square'; sideLength: number },
): value is ColoredSquare {
  return (
    value !== null &&
    isShapeWithProperty<{ type: 'square'; sideLength: number }>(
      value,
      isCustomType,
    )
  );
}
export function isVehicleWithType<T extends VehicleTypeGeneric>(
  value: any,
  isT: (val: any) => val is T,
): value is VehicleWithType<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    isT(value.type) &&
    'brand' in value &&
    typeof value.brand === 'string' &&
    'model' in value &&
    typeof value.model === 'string'
  );
}
export function isCarWithInfo(
  value: any,
  isVehicleTypeGeneric: (v: any) => v is VehicleTypeGeneric.Car,
): value is CarWithInfo {
  return (
    value !== null &&
    isVehicleWithType<VehicleTypeGeneric.Car>(value, isVehicleTypeGeneric)
  );
}
export function isBikeWithInfo(
  value: any,
  isVehicleTypeGeneric: (v: any) => v is VehicleTypeGeneric.Bike,
): value is BikeWithInfo {
  return (
    value !== null &&
    isVehicleWithType<VehicleTypeGeneric.Bike>(value, isVehicleTypeGeneric)
  );
}
export function isOptionalUser<T>(
  value: any,
  isT: (val: any) => val is T,
): value is OptionalUser<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    (typeof value.k === 'undefined' ||
      ('k' in value && isShapeGeneric(value.k))) &&
    (typeof value.name === 'undefined' ||
      ('name' in value && typeof value.name === 'string')) &&
    (typeof value.nested === 'undefined' ||
      ('nested' in value &&
        'nestedName' in value.nested &&
        isContainer<T>(value.nested.nestedName, isT))) &&
    (typeof value.nestedArray === 'undefined' ||
      ('nestedArray' in value &&
        Array.isArray(value.nestedArray) &&
        value.nestedArray.every((item: any) => isShapeGeneric(item)))) &&
    (typeof value.nestedArrayKeyword === 'undefined' ||
      ('nestedArrayKeyword' in value &&
        Array.isArray(value.nestedArrayKeyword) &&
        value.nestedArrayKeyword.every(
          (item: any) => typeof item === 'string',
        )))
  );
}
export function isCustomShapeInterface(
  value: any,
): value is CustomShapeInterface {
  return (
    value !== null &&
    (isCircleInterface(value) ||
      isSquareInterface(value) ||
      isTriangleInterface(value))
  );
}
export function isMediaInterface(value: any): value is MediaInterface {
  return value !== null && (isImageInterface(value) || isVideoInterface(value));
}
export function isDirectionType(value: any): value is DirectionType {
  return (
    value !== null &&
    (value === 'up' ||
      value === 'down' ||
      value === 'left' ||
      value === 'right')
  );
}
export function isEvenNumbersType(value: any): value is EvenNumbersType {
  return (
    value !== null &&
    (value === 2 || value === 4 || value === 6 || value === 8 || value === 10)
  );
}
export function isBooleanStatesType(value: any): value is BooleanStatesType {
  return value !== null && (value === true || value === false);
}
export function isStatusCodeType(value: any): value is StatusCodeType {
  return (
    value !== null &&
    (value === 200 || value === 400 || value === 404 || value === 500)
  );
}
export function isStatusType(value: any): value is StatusType {
  return (
    value !== null &&
    (value === 'success' ||
      value === 'error' ||
      value === 404 ||
      value === 500 ||
      value === true)
  );
}
export function isGreetingType(value: any): value is GreetingType {
  return value !== null && (value === 'Hello, ' || value === 'Hi, ');
}
export function isNumberStringComboType(
  value: any,
): value is NumberStringComboType {
  return (
    value !== null &&
    (value === 'one' ||
      value === 2 ||
      value === 'three' ||
      value === 4 ||
      value === 'five')
  );
}
export function isGreetingFlagType(value: any): value is GreetingFlagType {
  return (
    value !== null &&
    (value === 'Hello' || value === 'Hi' || value === 'Hey' || value === false)
  );
}
export function isLiteralOrUnionType(value: any): value is LiteralOrUnionType {
  return (
    value !== null &&
    (value === 'option1' ||
      typeof value === 'number' ||
      typeof value === 'boolean')
  );
}
export function isAnyType(value: any): value is AnyType {
  return value !== null;
}
export function isUnknownType(value: any): value is UnknownType {
  return value !== null;
}
export function isAnyUnknownUnionType(
  value: any,
): value is AnyUnknownUnionType {
  return value !== null;
}
export function isAnyUnknownUnionWithOthersType(
  value: any,
): value is AnyUnknownUnionWithOthersType {
  return (
    value !== null &&
    (typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean')
  );
}
export function isPersonOptional(value: any): value is PersonOptional {
  return (
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'age' in value &&
    typeof value.age === 'number' &&
    'address' in value &&
    isAddressOptional(value.address) &&
    'contact' in value &&
    isContactOptional(value.contact)
  );
}
export function isProjectOptional(value: any): value is ProjectOptional {
  return (
    value !== null &&
    'projectTitle' in value &&
    typeof value.projectTitle === 'string' &&
    'startDate' in value &&
    typeof value.startDate === 'string' &&
    (typeof value.endDateOptional === 'undefined' ||
      ('endDateOptional' in value && typeof value.endDateOptional === 'string'))
  );
}
export function isCompanyOptional(value: any): value is CompanyOptional {
  return (
    value !== null &&
    'companyName' in value &&
    (typeof value.companyUnknown === 'undefined' ||
      'companyUnknown' in value) &&
    'address' in value &&
    isAddressOptional(value.address) &&
    'contact' in value &&
    isContactOptional(value.contact) &&
    (typeof value.employees === 'undefined' ||
      ('employees' in value &&
        Array.isArray(value.employees) &&
        value.employees.every((item: any) => isEmployeeOptional(item)))) &&
    'projects' in value &&
    Array.isArray(value.projects) &&
    value.projects.every((item: any) => isProjectOptional(item))
  );
}
export function isAddressType(value: any): value is AddressType {
  return (
    value !== null &&
    'street' in value &&
    typeof value.street === 'string' &&
    'city' in value &&
    typeof value.city === 'string'
  );
}
export function isPersonType(value: any): value is PersonType {
  return (
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'age' in value &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      ('address' in value && isAddressType(value.address)))
  );
}
export function isNumberOrStringType(value: any): value is NumberOrStringType {
  return (
    value !== null && (typeof value === 'number' || typeof value === 'string')
  );
}
export function isResultType(value: any): value is ResultType {
  return (
    value !== null &&
    (value === 'success' || value === 'error' || value === 'pending')
  );
}
export function isPaymentMethodType(value: any): value is PaymentMethodType {
  return (
    value !== null &&
    (value === 'creditCard' || value === 'paypal' || value === 'bitcoin')
  );
}
export function isCarType(value: any): value is CarType {
  return (
    value !== null &&
    'brand' in value &&
    typeof value.brand === 'string' &&
    'model' in value &&
    typeof value.model === 'string'
  );
}
export function isPaymentType(value: any): value is PaymentType {
  return (
    value !== null &&
    'method' in value &&
    isPaymentMethodType(value.method) &&
    'amount' in value &&
    typeof value.amount === 'number'
  );
}
export function isTransactionStatus(value: any): value is TransactionStatus {
  return value !== null && (isResultType(value) || value === 'canceled');
}
export function isProductType(value: any): value is ProductType {
  return (
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    'color' in value &&
    isColorTypeAliasType(value.color)
  );
}
export function isDataType(value: any): value is DataType {
  return (
    value !== null &&
    'kind' in value &&
    (value.kind === 'number' ||
      value.kind === 'string' ||
      value.kind === 'object') &&
    'value' in value &&
    (typeof value.value === 'number' ||
      typeof value.value === 'string' ||
      typeof value.value === 'object')
  );
}
export function isVehicleType(value: any): value is VehicleType {
  return (
    value !== null &&
    (isCarType(value) || isElectricCarType(value) || isSportsCar(value))
  );
}
export function isActionType(value: any): value is ActionType {
  return (
    value !== null &&
    'type' in value &&
    (value.type === 'add' || value.type === 'remove')
  );
}
export function isTargetType(value: any): value is TargetType {
  return (
    value !== null &&
    (value === 'user' || value === 'item' || value === 'group')
  );
}
export function isShapeType(value: any): value is ShapeType {
  return (
    value !== null &&
    'type' in value &&
    (value.type === 'circle' ||
      value.type === 'square' ||
      value.type === 'triangle')
  );
}
export function isCustomShapeType(value: any): value is CustomShapeType {
  return (
    value !== null &&
    (isCircleType(value) || isSquareType(value) || isTriangleType(value))
  );
}
export function isLogLevelIntersectionEnum(
  value: any,
): value is LogLevelIntersectionEnum {
  return value !== null;
}
export function isExtendedDirectionEnum(
  value: any,
): value is ExtendedDirectionEnum {
  return value !== null;
}
export function isShapeWithProperty<T extends ShapeGeneric>(
  value: any,
  isT: (val: any) => val is T,
): value is ShapeWithProperty<T> {
  return typeof value === 'object' && value !== null;
}
export function isAnyUnknownIntersectionType(
  value: any,
): value is AnyUnknownIntersectionType {
  return value !== null;
}
export function isAnyUnknownIntersectionWithOthersType(
  value: any,
): value is AnyUnknownIntersectionWithOthersType {
  return value !== null;
}
export function isIntersectionTest(value: any): value is IntersectionTest {
  return value !== null;
}
export function isEmployeeOptional(value: any): value is EmployeeOptional {
  return value !== null;
}
export function isEmployeeType(value: any): value is EmployeeType {
  return value !== null;
}
export function isElectricCarType(value: any): value is ElectricCarType {
  return value !== null;
}
export function isSportsCar(value: any): value is SportsCar {
  return value !== null;
}
export function isCarDetailsType(value: any): value is CarDetailsType {
  return value !== null;
}
export function isAddAction(value: any): value is AddAction {
  return value !== null;
}
export function isRemoveAction(value: any): value is RemoveAction {
  return value !== null;
}
export function isCircleType(value: any): value is CircleType {
  return value !== null;
}
export function isSquareType(value: any): value is SquareType {
  return value !== null;
}
export function isTriangleType(value: any): value is TriangleType {
  return value !== null;
}
export function isDirectionEnum(value: any): value is DirectionEnum {
  return Object.values(DirectionEnum).includes(value);
}
export function isColorEnum(value: any): value is ColorEnum {
  return Object.values(ColorEnum).includes(value);
}
export function isMixedValuesEnum(value: any): value is MixedValuesEnum {
  return Object.values(MixedValuesEnum).includes(value);
}
export function isComputedValuesEnum(value: any): value is ComputedValuesEnum {
  return Object.values(ComputedValuesEnum).includes(value);
}
export function isStatusEnum(value: any): value is StatusEnum {
  return Object.values(StatusEnum).includes(value);
}
export function isTrafficLightEnum(value: any): value is TrafficLightEnum {
  return Object.values(TrafficLightEnum).includes(value);
}
export function isLogLevelEnum(value: any): value is LogLevelEnum {
  return Object.values(LogLevelEnum).includes(value);
}
export function isColorEnumGeneric(value: any): value is ColorEnumGeneric {
  return Object.values(ColorEnumGeneric).includes(value);
}
export function isVehicleTypeGeneric(value: any): value is VehicleTypeGeneric {
  return Object.values(VehicleTypeGeneric).includes(value);
}
export function isMediaTypeInterface(value: any): value is MediaTypeInterface {
  return Object.values(MediaTypeInterface).includes(value);
}
export function isColorTypeAliasType(value: any): value is ColorTypeAliasType {
  return Object.values(ColorTypeAliasType).includes(value);
}
export function isMediaTypeType(value: any): value is MediaTypeType {
  return Object.values(MediaTypeType).includes(value);
}
export function isImageTypeType(value: any): value is ImageTypeType {
  return Object.values(ImageTypeType).includes(value);
}
export function isVideoType(value: any): value is VideoType {
  return Object.values(VideoType).includes(value);
}
