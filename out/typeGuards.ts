// Generated using ts-gen-typeguards
 // @ts-nocheck
import {
  CarEnum,
  VehicleEnum,
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
  LogLevelIntersectionEnum,
  ExtendedDirectionEnum,
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
  AnyUnknownIntersectionType,
  AnyUnknownUnionWithOthersType,
  AnyUnknownIntersectionWithOthersType,
  PersonOptional,
  EmployeeOptional,
  ProjectOptional,
  CompanyOptional,
  AddressType,
  PersonType,
  EmployeeType,
  NumberOrStringType,
  ResultType,
  PaymentMethodType,
  CarType,
  ElectricCarType,
  SportsCar,
  PaymentType,
  TransactionStatus,
  ProductType,
  CarDetailsType,
  DataType,
  VehicleType,
  ActionType,
  TargetType,
  AddAction,
  RemoveAction,
  ShapeType,
  CircleType,
  SquareType,
  TriangleType,
  CustomShapeType,
  DirectionEnum,
  ColorEnum,
  MixedValuesEnum,
  ComputedValuesEnum,
  StatusEnum,
  TrafficLightEnum,
  LogLevelEnum,
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
    value.hasOwnProperty('make') &&
    typeof value.make === 'string' &&
    value.hasOwnProperty('model') &&
    typeof value.model === 'string' &&
    value.hasOwnProperty('color') &&
    isColorEnum(value.color)
  );
}
export function isVehicleEnum(value: any): value is VehicleEnum {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('type') &&
    (value.type === 'CAR' || value.type === 'BIKE') &&
    value.hasOwnProperty('direction') &&
    isDirectionEnum(value.direction)
  );
}
export function isAddressInterface(value: any): value is AddressInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('street') &&
    typeof value.street === 'string' &&
    value.hasOwnProperty('city') &&
    typeof value.city === 'string'
  );
}
export function isPersonInterface(value: any): value is PersonInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('name') &&
    typeof value.name === 'string' &&
    value.hasOwnProperty('age') &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      value.hasOwnProperty('address') ||
      isAddressInterface(value.address))
  );
}
export function isEmployeeInterface(value: any): value is EmployeeInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('jobTitle') &&
    typeof value.jobTitle === 'string' &&
    value.hasOwnProperty('name') &&
    typeof value.name === 'string' &&
    value.hasOwnProperty('age') &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      value.hasOwnProperty('address') ||
      isAddressInterface(value.address))
  );
}
export function isCircleInterface(value: any): value is CircleInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('type') &&
    value.type === 'circle' &&
    value.hasOwnProperty('radius') &&
    typeof value.radius === 'number'
  );
}
export function isSquareInterface(value: any): value is SquareInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('type') &&
    value.type === 'square' &&
    value.hasOwnProperty('sideLength') &&
    typeof value.sideLength === 'number'
  );
}
export function isTriangleInterface(value: any): value is TriangleInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('type') &&
    value.type === 'triangle' &&
    value.hasOwnProperty('base') &&
    typeof value.base === 'number' &&
    value.hasOwnProperty('height') &&
    typeof value.height === 'number'
  );
}
export function isCarInterface(value: any): value is CarInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('brand') &&
    typeof value.brand === 'string' &&
    value.hasOwnProperty('model') &&
    typeof value.model === 'string'
  );
}
export function isElectricCarInterface(
  value: any,
): value is ElectricCarInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('batteryCapacity') &&
    typeof value.batteryCapacity === 'number' &&
    value.hasOwnProperty('brand') &&
    typeof value.brand === 'string' &&
    value.hasOwnProperty('model') &&
    typeof value.model === 'string'
  );
}
export function isSportsCarInterface(value: any): value is SportsCarInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('topSpeed') &&
    typeof value.topSpeed === 'number' &&
    value.hasOwnProperty('brand') &&
    typeof value.brand === 'string' &&
    value.hasOwnProperty('model') &&
    typeof value.model === 'string'
  );
}
export function isAnimalInterface(value: any): value is AnimalInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('name') &&
    typeof value.name === 'string'
  );
}
export function isDogInterface(value: any): value is DogInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('breed') &&
    typeof value.breed === 'string' &&
    value.hasOwnProperty('name') &&
    typeof value.name === 'string'
  );
}
export function isCatInterface(value: any): value is CatInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('color') &&
    typeof value.color === 'string' &&
    value.hasOwnProperty('name') &&
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
    value.hasOwnProperty('name') &&
    typeof value.name === 'string' &&
    value.hasOwnProperty('age') &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      value.hasOwnProperty('address') ||
      typeof value.address === 'string')
  );
}
export function isImageInterface(value: any): value is ImageInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('type') &&
    value.type === MediaTypeInterface.Image &&
    value.hasOwnProperty('url') &&
    typeof value.url === 'string'
  );
}
export function isVideoInterface(value: any): value is VideoInterface {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('type') &&
    value.type === MediaTypeInterface.Video &&
    value.hasOwnProperty('source') &&
    typeof value.source === 'string'
  );
}
export function isAddressOptional(value: any): value is AddressOptional {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('street') &&
    value.hasOwnProperty('city') &&
    typeof value.city === 'string' &&
    (typeof value.postalCodeOptional === 'undefined' ||
      value.hasOwnProperty('postalCodeOptional') ||
      typeof value.postalCodeOptional === 'string')
  );
}
export function isContactOptional(value: any): value is ContactOptional {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('email') &&
    typeof value.email === 'string' &&
    value.hasOwnProperty('phone') &&
    typeof value.phone === 'string' &&
    (typeof value.faxOptional === 'undefined' ||
      value.hasOwnProperty('faxOptional') ||
      typeof value.faxOptional === 'string')
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
export function isLogLevelIntersectionEnum(
  value: any,
): value is LogLevelIntersectionEnum {
  return (
    value !== null &&
    isLogLevelEnum(value) &&
    value.hasOwnProperty('Warning') &&
    value.Warning === 3 &&
    isLogLevelEnum(value)
  );
}
export function isExtendedDirectionEnum(
  value: any,
): value is ExtendedDirectionEnum {
  return (
    value !== null &&
    isDirectionEnum(value) &&
    value === 'FORWARD' &&
    value === 'BACKWARD' &&
    isDirectionEnum(value)
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
export function isAnyUnknownIntersectionType(
  value: any,
): value is AnyUnknownIntersectionType {
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
export function isAnyUnknownIntersectionWithOthersType(
  value: any,
): value is AnyUnknownIntersectionWithOthersType {
  return (
    value !== null &&
    typeof value === 'string' &&
    typeof value === 'number' &&
    typeof value === 'boolean'
  );
}
export function isPersonOptional(value: any): value is PersonOptional {
  return (
    value !== null &&
    value.hasOwnProperty('name') &&
    typeof value.name === 'string' &&
    value.hasOwnProperty('age') &&
    typeof value.age === 'number' &&
    value.hasOwnProperty('address') &&
    isAddressOptional(value.address) &&
    value.hasOwnProperty('contact') &&
    isContactOptional(value.contact)
  );
}
export function isEmployeeOptional(value: any): value is EmployeeOptional {
  return (
    value !== null &&
    value.hasOwnProperty('jobTitle') &&
    typeof value.jobTitle === 'string' &&
    value.hasOwnProperty('department') &&
    typeof value.department === 'string' &&
    (typeof value.supervisorOptional === 'undefined' ||
      value.hasOwnProperty('supervisorOptional') ||
      isEmployeeOptional(value.supervisorOptional)) &&
    isPersonOptional(value)
  );
}
export function isProjectOptional(value: any): value is ProjectOptional {
  return (
    value !== null &&
    value.hasOwnProperty('projectTitle') &&
    typeof value.projectTitle === 'string' &&
    value.hasOwnProperty('startDate') &&
    typeof value.startDate === 'string' &&
    (typeof value.endDateOptional === 'undefined' ||
      value.hasOwnProperty('endDateOptional') ||
      typeof value.endDateOptional === 'string')
  );
}
export function isCompanyOptional(value: any): value is CompanyOptional {
  return (
    value !== null &&
    value.hasOwnProperty('companyName') &&
    (typeof value.companyUnknown === 'undefined' ||
      value.hasOwnProperty('companyUnknown')) &&
    value.hasOwnProperty('address') &&
    isAddressOptional(value.address) &&
    value.hasOwnProperty('contact') &&
    isContactOptional(value.contact) &&
    (typeof value.employees === 'undefined' ||
      value.hasOwnProperty('employees') ||
      (Array.isArray(value.employees) &&
        value.employees.every((item: any) => isEmployeeOptional(item)))) &&
    value.hasOwnProperty('projects') &&
    Array.isArray(value.projects) &&
    value.projects.every((item: any) => isProjectOptional(item))
  );
}
export function isAddressType(value: any): value is AddressType {
  return (
    value !== null &&
    value.hasOwnProperty('street') &&
    typeof value.street === 'string' &&
    value.hasOwnProperty('city') &&
    typeof value.city === 'string'
  );
}
export function isPersonType(value: any): value is PersonType {
  return (
    value !== null &&
    value.hasOwnProperty('name') &&
    typeof value.name === 'string' &&
    value.hasOwnProperty('age') &&
    typeof value.age === 'number' &&
    (typeof value.address === 'undefined' ||
      value.hasOwnProperty('address') ||
      isAddressType(value.address))
  );
}
export function isEmployeeType(value: any): value is EmployeeType {
  return (
    value !== null &&
    value.hasOwnProperty('jobTitle') &&
    typeof value.jobTitle === 'string' &&
    isPersonType(value)
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
    value.hasOwnProperty('brand') &&
    typeof value.brand === 'string' &&
    value.hasOwnProperty('model') &&
    typeof value.model === 'string'
  );
}
export function isElectricCarType(value: any): value is ElectricCarType {
  return (
    value !== null &&
    value.hasOwnProperty('batteryCapacity') &&
    typeof value.batteryCapacity === 'number' &&
    isCarType(value)
  );
}
export function isSportsCar(value: any): value is SportsCar {
  return (
    value !== null &&
    value.hasOwnProperty('topSpeed') &&
    typeof value.topSpeed === 'number' &&
    isCarType(value)
  );
}
export function isPaymentType(value: any): value is PaymentType {
  return (
    value !== null &&
    value.hasOwnProperty('method') &&
    isPaymentMethodType(value.method) &&
    value.hasOwnProperty('amount') &&
    typeof value.amount === 'number'
  );
}
export function isTransactionStatus(value: any): value is TransactionStatus {
  return value !== null && (isResultType(value) || value === 'canceled');
}
export function isProductType(value: any): value is ProductType {
  return (
    value !== null &&
    value.hasOwnProperty('name') &&
    typeof value.name === 'string' &&
    value.hasOwnProperty('price') &&
    typeof value.price === 'number' &&
    value.hasOwnProperty('color') &&
    isColorTypeAliasType(value.color)
  );
}
export function isCarDetailsType(value: any): value is CarDetailsType {
  return (
    value !== null &&
    isCarType(value) &&
    value.hasOwnProperty('color') &&
    isColorTypeAliasType(value.color)
  );
}
export function isDataType(value: any): value is DataType {
  return (
    value !== null &&
    value.hasOwnProperty('kind') &&
    (value.kind === 'number' ||
      value.kind === 'string' ||
      value.kind === 'object') &&
    value.hasOwnProperty('value') &&
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
    value.hasOwnProperty('type') &&
    (value.type === 'add' || value.type === 'remove')
  );
}
export function isTargetType(value: any): value is TargetType {
  return (
    value !== null &&
    (value === 'user' || value === 'item' || value === 'group')
  );
}
export function isAddAction(value: any): value is AddAction {
  return (
    value !== null &&
    isActionType(value) &&
    value.hasOwnProperty('type') &&
    value.type === 'add' &&
    value.hasOwnProperty('target') &&
    isTargetType(value.target)
  );
}
export function isRemoveAction(value: any): value is RemoveAction {
  return (
    value !== null &&
    isActionType(value) &&
    value.hasOwnProperty('type') &&
    value.type === 'remove' &&
    value.hasOwnProperty('target') &&
    isTargetType(value.target)
  );
}
export function isShapeType(value: any): value is ShapeType {
  return (
    value !== null &&
    value.hasOwnProperty('type') &&
    (value.type === 'circle' ||
      value.type === 'square' ||
      value.type === 'triangle')
  );
}
export function isCircleType(value: any): value is CircleType {
  return (
    value !== null &&
    isShapeType(value) &&
    value.hasOwnProperty('radius') &&
    typeof value.radius === 'number'
  );
}
export function isSquareType(value: any): value is SquareType {
  return (
    value !== null &&
    isShapeType(value) &&
    value.hasOwnProperty('sideLength') &&
    typeof value.sideLength === 'number'
  );
}
export function isTriangleType(value: any): value is TriangleType {
  return (
    value !== null &&
    isShapeType(value) &&
    value.hasOwnProperty('base') &&
    typeof value.base === 'number' &&
    value.hasOwnProperty('height') &&
    typeof value.height === 'number'
  );
}
export function isCustomShapeType(value: any): value is CustomShapeType {
  return (
    value !== null &&
    (isCircleType(value) || isSquareType(value) || isTriangleType(value))
  );
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
