import * as guards from '../../out/typeGuards';
import * as types from '../../input/combinedTypeGuards';
import {
  LogLevelEnum,
  PropertyContainer,
} from '../../input/combinedTypeGuards';
import { LogLevelIntersectionEnum } from '../../input/enums';

describe('Generated Guards', () => {
  // Test for DirectionEnum
  it('should test DirectionEnum correctly', () => {
    expect(guards.isDirectionEnum(types.DirectionEnum.Up)).toBe(true);
  });

  // Test for ColorEnum
  it('should test ColorEnum correctly', () => {
    expect(guards.isColorEnum(types.ColorEnum.Red)).toBe(true);
  });

  // Test for ComputedValues
  it('should test ComputedValues correctly', () => {
    expect(guards.isComputedValuesEnum(types.ComputedValuesEnum.Middle)).toBe(
      true,
    );
  });

  // Test for Status
  it('should test Status correctly', () => {
    expect(guards.isStatusType('success')).toBe(true);
  });

  // ... repeat similar tests for other enums and types ...

  // Test for AddressOptional
  it('should test AddressOptional correctly', () => {
    const addressOptional = {
      street: '456 Elm St',
      city: 'Townsville',
      postalCodeOptional: '12345',
    };
    expect(guards.isAddressOptional(addressOptional)).toBe(true);
  });

  // Test for ContactOptional
  it('should test ContactOptional correctly', () => {
    const contactOptional = {
      email: 'example@example.com',
      phone: '123-456-7890',
      faxOptional: '987-654-3210',
    };
    expect(guards.isContactOptional(contactOptional)).toBe(true);
  });
  // Test for Container<T>
  it('should test Container<T> correctly', () => {
    const isString = (value: any): value is string => typeof value === 'string';
    const container = {
      value: 'test',
    };
    expect(guards.isContainer<string>(container, isString)).toBe(true);
  });
  // Test for PropertyContainer<T>
  it('should test PropertyContainer<T> correctly', () => {
    const isString = (value: any): value is string => typeof value === 'string';
    const propertyContainer: PropertyContainer<string> = {
      value: 'test',
      additionalValue: 'test',
    };
    const onlyRequired: PropertyContainer<string> = {
      value: 'test',
    };
    expect(
      guards.isPropertyContainer<string>(propertyContainer, isString),
    ).toBe(true);
    expect(guards.isPropertyContainer<string>(onlyRequired, isString)).toBe(
      true,
    );
  });
  // Test for ShapeGeneric
  it('should test ShapeGeneric correctly', () => {
    const shapeGeneric = {
      type: 'circle',
    };
    expect(guards.isShapeGeneric(shapeGeneric)).toBe(true);
  });
  //Test for AddressInterface
  it('should test AddressInterface correctly', () => {
    const addressInterface = {
      street: '123 Main St',
      city: 'Townsville',
    };
    expect(guards.isAddressInterface(addressInterface)).toBe(true);
  });
  // Test for PersonInterface
  it('should test PersonInterface correctly', () => {
    const personInterface = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Townsville',
      },
    };
    expect(guards.isPersonInterface(personInterface)).toBe(true);
  });
  // Test for EmployeeInterface
  it('should test EmployeeInterface correctly', () => {
    const employeeInterface = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Townsville',
      },
      jobTitle: 'Software Engineer',
    };
    expect(guards.isEmployeeInterface(employeeInterface)).toBe(true);
  });
  // Test for CircleInterface
  it('should test CircleInterface correctly', () => {
    const circleInterface = {
      type: 'circle',
      radius: 10,
    };
    expect(guards.isCircleInterface(circleInterface)).toBe(true);
  });
  // Test for SquareInterface
  it('should test SquareInterface correctly', () => {
    const squareInterface = {
      type: 'square',
      sideLength: 10,
    };
    expect(guards.isSquareInterface(squareInterface)).toBe(true);
  });
  // Test for TriangleInterface
  it('should test TriangleInterface correctly', () => {
    const triangleInterface = {
      type: 'triangle',
      base: 10,
      height: 10,
    };
    expect(guards.isTriangleInterface(triangleInterface)).toBe(true);
  });
  // Test for CarInterface
  it('should test CarInterface correctly', () => {
    const carInterface = {
      brand: 'Toyota',
      model: 'Corolla',
    };
    expect(guards.isCarInterface(carInterface)).toBe(true);
  });
  // Test for ElectricCarInterface
  it('should test ElectricCarInterface correctly', () => {
    const electricCarInterface = {
      brand: 'Tesla',
      model: 'Model S',
      batteryCapacity: 100,
    };
    expect(guards.isElectricCarInterface(electricCarInterface)).toBe(true);
  });
  // Test for SportsCarInterface
  it('should test SportsCarInterface correctly', () => {
    const sportsCarInterface = {
      brand: 'Ferrari',
      model: 'F40',
      topSpeed: 200,
    };
    expect(guards.isSportsCarInterface(sportsCarInterface)).toBe(true);
  });
  // Test for AnimalInterface
  it('should test AnimalInterface correctly', () => {
    const animalInterface = {
      name: 'Fido',
      makeSound: () => console.log('woof'),
    };
    expect(guards.isAnimalInterface(animalInterface)).toBe(true);
  });
  // Test for DogInterface
  it('should test DogInterface correctly', () => {
    const dogInterface = {
      name: 'Fido',
      makeSound: () => console.log('woof'),
      breed: 'Labrador',
    };
    expect(guards.isDogInterface(dogInterface)).toBe(true);
  });
  // Test for CatInterface
  it('should test CatInterface correctly', () => {
    const catInterface = {
      name: 'Fluffy',
      makeSound: () => console.log('meow'),
      color: 'black',
    };
    expect(guards.isCatInterface(catInterface)).toBe(true);
  });
  // Test for CalculatorInterface
  it('should test CalculatorInterface correctly', () => {
    const calculatorInterface = {
      add: (a: number, b: number) => a + b,
      subtract: (a: number, b: number) => a - b,
      multiply: (a: number, b: number) => a * b,
      divide: (a: number, b: number) => a / b,
    };
    expect(guards.isCalculatorInterface(calculatorInterface)).toBe(true);
  });
  // Test for DictionaryInterface
  it('should test DictionaryInterface correctly', () => {
    const dictionaryInterface = {
      key1: 'value1',
      key2: 'value2',
    };
    expect(guards.isDictionaryInterface(dictionaryInterface)).toBe(true);
  });
  // Test for PersonWithOptionalAddressInterface
  it('should test PersonWithOptionalAddressInterface correctly', () => {
    const personWithOptionalAddressInterface = {
      name: 'John Doe',
      age: 30,
      address: '123 Main St',
    };
    const withoutAddress = {
      name: 'John Doe',
      age: 30,
    };
    expect(
      guards.isPersonWithOptionalAddressInterface(
        personWithOptionalAddressInterface,
      ),
    ).toBe(true);
    expect(guards.isPersonWithOptionalAddressInterface(withoutAddress)).toBe(
      true,
    );
  });
  // Test for ImageInterface
  it('should test ImageInterface correctly', () => {
    const imageInterface = {
      type: 'image',
      url: 'https://example.com/image.jpg',
    };
    expect(guards.isImageInterface(imageInterface)).toBe(true);
  });
  // Test for VideoInterface
  it('should test VideoInterface correctly', () => {
    const videoInterface = {
      type: 'video',
      source: 'https://example.com/video.mp4',
    };
    expect(guards.isVideoInterface(videoInterface)).toBe(true);
  });
  // Test for AdressOptional
  it('should test AdressOptional correctly', () => {
    const addressOptional = {
      street: '123 Main St',
      city: 'Townsville',
    };
    const withPostalCode = {
      street: '123 Main St',
      city: 'Townsville',
      postalCodeOptional: '12345',
    };
    expect(guards.isAddressOptional(addressOptional)).toBe(true);
    expect(guards.isAddressOptional(withPostalCode)).toBe(true);
  });
  // Test for ContactOptional
  it('should test ContactOptional correctly', () => {
    const contactOptional = {
      email: 'test@mail.com',
      phone: '123-456-7890',
    };
    const withFax = {
      email: 'test@email.com',
      phone: '123-456-7890',
      faxOptional: '987-654-3210',
    };
    expect(guards.isContactOptional(contactOptional)).toBe(true);
    expect(guards.isContactOptional(withFax)).toBe(true);
  });
  // Test for LogLevelUnion
  it('should test LogLevelUnionEnum correctly', () => {
    expect(guards.isLogLevelUnionEnum(LogLevelEnum.Error)).toBe(true);
    expect(guards.isLogLevelUnionEnum(4)).toBe(false);
  });
  // Test for ContainerOfString
  it('should test ContainerOfString correctly', () => {
    const isString = (value: any): value is string => typeof value === 'string';
    const containerOfString = {
      value: 'test',
    };
    expect(guards.isContainerOfString(containerOfString, isString)).toBe(true);
  });
  // Test for ContainerOfNumber
  it('should test ContainerOfNumber correctly', () => {
    const isNumber = (value: any): value is number => typeof value === 'number';
    const containerOfNumber = {
      value: 1,
    };
    expect(guards.isContainerOfNumber(containerOfNumber, isNumber)).toBe(true);
  });
  // Test for ColorEnumGeneric
  it('should test ColorEnumGeneric correctly', () => {
    expect(guards.isColorEnumGeneric(types.ColorEnumGeneric.Red)).toBe(true);
  });
  // Test for RedContainer
  it('should test RedContainer correctly', () => {
    const redContainer = {
      value: 'RED',
    };
    const typeguard = (v: any): v is types.ColorEnumGeneric.Red => {
      return guards.isColorEnumGeneric(v);
    };
    expect(guards.isRedContainer(redContainer, typeguard)).toBe(true);
  });
  // Test for GreenContainer
  it('should test GreenContainer correctly', () => {
    const greenContainer = {
      value: 'GREEN',
    };
    const typeguard = (v: any): v is types.ColorEnumGeneric.Green => {
      return guards.isColorEnumGeneric(v);
    };
    expect(guards.isGreenContainer(greenContainer, typeguard)).toBe(true);
  });
  // Test for BlueContainer
  it('should test BlueContainer correctly', () => {
    const blueContainer = {
      value: 'BLUE',
    };
    const typeguard = (v: any): v is types.ColorEnumGeneric.Blue => {
      return guards.isColorEnumGeneric(v);
    };
    expect(guards.isBlueContainer(blueContainer, typeguard)).toBe(true);
  });
  // Test for OptionalContainerOfString
  it('should test OptionalContainerOfString correctly', () => {
    const isString = (value: any): value is string => typeof value === 'string';
    const optionalContainerOfString = {
      value: 'test',
      additionalValue: 'test',
    };
    const onlyRequired = {
      value: 'test',
    };
    expect(
      guards.isOptionalContainerOfString(optionalContainerOfString, isString),
    ).toBe(true);
    expect(guards.isOptionalContainerOfString(onlyRequired, isString)).toBe(
      true,
    );
  });
  // Test for OptionalContainerOfNumber
  it('should test OptionalContainerOfNumber correctly', () => {
    const isNumber = (value: any): value is number => typeof value === 'number';
    const optionalContainerOfNumber = {
      value: 1,
      additionalValue: 2,
    };
    const onlyRequired = {
      value: 1,
    };
    expect(
      guards.isOptionalContainerOfNumber(optionalContainerOfNumber, isNumber),
    ).toBe(true);
    expect(guards.isOptionalContainerOfNumber(onlyRequired, isNumber)).toBe(
      true,
    );
  });
  // Test for DirectionContainer<T>
  it('should test DirectionContainer<T> correctly', () => {
    const isDirection = (value: any): value is types.DirectionGeneric => {
      return (
        value === 'up' ||
        value === 'down' ||
        value === 'left' ||
        value === 'right'
      );
    };
    const directionContainer = {
      value: 'up',
    };
    expect(guards.isDirectionContainer(directionContainer, isDirection)).toBe(
      true,
    );
  });
  // Test for UpDirectionContainer
  it('should test UpDirectionContainer correctly', () => {
    const upDirectionContainer = {
      value: 'up',
    };
    const typeguard = (v: any): v is 'up' => {
      return v === 'up';
    };
    expect(guards.isUpDirectionContainer(upDirectionContainer, typeguard)).toBe(
      true,
    );
  });
  // Test for DownDirectionContainer
  it('should test DownDirectionContainer correctly', () => {
    const downDirectionContainer = {
      value: 'down',
    };
    const typeguard = (v: any): v is 'down' => {
      return v === 'down';
    };
    expect(
      guards.isDownDirectionContainer(downDirectionContainer, typeguard),
    ).toBe(true);
  });
  // Test for ColoredCircle
  it('should test ColoredCircle correctly', () => {
    const coloredCircle = {
      type: 'circle',
      radius: 10,
      color: 'RED',
    };
    const typeguard = (val: any): val is { type: 'circle'; radius: number } => {
      return (
        'type' in val &&
        val.type === 'circle' &&
        'radius' in val &&
        typeof val.radius === 'number'
      );
    };
    expect(guards.isColoredCircle(coloredCircle, typeguard)).toBe(true);
  });
  // Test for ColoredSquare
  it('should test ColoredSquare correctly', () => {
    const coloredSquare = {
      type: 'square',
      sideLength: 10,
      color: 'GREEN',
    };
    const typeguard = (
      val: any,
    ): val is { type: 'square'; sideLength: number } => {
      return (
        'type' in val &&
        val.type === 'square' &&
        'sideLength' in val &&
        typeof val.sideLength === 'number'
      );
    };
    expect(guards.isColoredSquare(coloredSquare, typeguard)).toBe(true);
  });
  // Test for VehicleWithType<T>
  it('should test VehicleWithType<T> correctly', () => {
    const isVehicleType = (value: any): value is types.VehicleTypeGeneric => {
      return value === 'CAR' || value === 'BIKE';
    };
    const vehicleWithType = {
      type: 'CAR',
      brand: 'Toyota',
      model: 'Corolla',
    };
    expect(guards.isVehicleWithType(vehicleWithType, isVehicleType)).toBe(true);
  });
  // Test for CarWithInfo
  it('should test CarWithInfo correctly', () => {
    const carWithInfo = {
      type: 'CAR',
      brand: 'Toyota',
      model: 'Corolla',
    };
    const typeguard = (v: any): v is types.VehicleTypeGeneric.Car => {
      return v === types.VehicleTypeGeneric.Car;
    };
    expect(guards.isCarWithInfo(carWithInfo, typeguard)).toBe(true);
  });
  // Test for BikeWithInfo
  it('should test BikeWithInfo correctly', () => {
    const bikeWithInfo = {
      type: 'BIKE',
      brand: 'Trek',
      model: 'Emonda',
    };
    const typeguard = (v: any): v is types.VehicleTypeGeneric.Bike => {
      return v === types.VehicleTypeGeneric.Bike;
    };
    expect(guards.isBikeWithInfo(bikeWithInfo, typeguard)).toBe(true);
  });
  // Test for CustomShapeInterface
  it('should test CustomShapeInterface correctly', () => {
    const customShapeInterface = {
      type: 'circle',
      radius: 24,
    };
    expect(guards.isCustomShapeInterface(customShapeInterface)).toBe(true);
  });
  // Test for MediaInterface
  it('should test MediaInterface correctly', () => {
    const mediaInterface = {
      type: 'image',
      url: 'https://example.com/image.jpg',
    };
    expect(guards.isMediaInterface(mediaInterface)).toBe(true);
  });
  // Test for DirectionType
  it('should test DirectionType correctly', () => {
    expect(guards.isDirectionType('up')).toBe(true);
  });
  // Test for EvenNumbersType
  it('should test EvenNumbersType correctly', () => {
    expect(guards.isEvenNumbersType(2)).toBe(true);
  });
  // Test for BooleanStatesType
  it('should test BooleanStatesType correctly', () => {
    expect(guards.isBooleanStatesType(true)).toBe(true);
  });
  // Test for StatusCodeType
  it('should test StatusCodeType correctly', () => {
    expect(guards.isStatusCodeType(200)).toBe(true);
  });
  // Test for StatusType
  it('should test StatusType correctly', () => {
    expect(guards.isStatusType('success')).toBe(true);
  });
  // Test for GreetingType
  it('should test GreetingType correctly', () => {
    expect(guards.isGreetingType('Hello, ')).toBe(true);
  });
  // NumberStringComboType
  it('should test NumberStringComboType correctly', () => {
    expect(guards.isNumberStringComboType('one')).toBe(true);
  });
  // Test for GreetingFlagType
  it('should test GreetingFlagType correctly', () => {
    expect(guards.isGreetingFlagType('Hello')).toBe(true);
  });
  // Test for LiteralOrUnionType
  it('should test LiteralOrUnionType correctly', () => {
    expect(guards.isLiteralOrUnionType('option1')).toBe(true);
  });
  // Test for AnyType
  it('should test AnyType correctly', () => {
    expect(guards.isAnyType('test')).toBe(true);
  });
  // Test for UnknownType
  it('should test UnknownType correctly', () => {
    expect(guards.isUnknownType('test')).toBe(true);
  });
  // PersonOptional
  it('should test PersonOptional correctly', () => {
    const personOptional: types.PersonOptional = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Townsville',
      },
      contact: {
        email: 'test@mail.com',
        phone: '123-456-7890',
      },
    };
    expect(guards.isPersonOptional(personOptional)).toBe(true);
  });
  // EmployeeOptional
  it('should test EmployeeOptional correctly', () => {
    const employeeOptional = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Townsville',
      },
      contact: {
        email: 'some@email.com',
        phone: '123-456-7890',
      },
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      supervisorOptional: {
        name: 'Jane Doe',
      },
    };
    expect(guards.isEmployeeOptional(employeeOptional)).toBe(true);
  });
  // ProjectOptional
  it('should test ProjectOptional correctly', () => {
    const projectOptional = {
      projectTitle: 'Project X',
      startDate: '2020-01-01',
      endDateOptional: '2020-12-31',
    };
    expect(guards.isProjectOptional(projectOptional)).toBe(true);
  });
  // CompanyOptional
  it('should test CompanyOptional correctly', () => {
    const companyOptional: types.CompanyOptional = {
      companyName: 'ABC Corp',
      companyUnknown: 'unknown',
      address: {
        street: '123 Main St',
        city: 'Townsville',
      },
      contact: {
        email: 'email@mail.com',
        phone: '123-456-7890',
      },
      projects: [
        {
          projectTitle: 'Project X',
          startDate: '2020-01-01',
        },
        {
          projectTitle: 'Project Y',
          startDate: '2020-01-01',
        },
      ],
    };
    expect(guards.isCompanyOptional(companyOptional)).toBe(true);
  });
  // AddressType
  it('should test AddressType correctly', () => {
    const addressType = {
      street: '123 Main St',
      city: 'Townsville',
    };
    expect(guards.isAddressType(addressType)).toBe(true);
  });
  // PersonType
  it('should test PersonType correctly', () => {
    const personType = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Townsville',
      },
    };
    expect(guards.isPersonType(personType)).toBe(true);
  });
  // EmployeeType
  it('should test EmployeeType correctly', () => {
    const employeeType = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Townsville',
      },
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      supervisorOptional: {
        name: 'Jane Doe',
      },
    };
    expect(guards.isEmployeeType(employeeType)).toBe(true);
  });
  // NumberOrStringType
  it('should test NumberOrStringType correctly', () => {
    expect(guards.isNumberOrStringType(1)).toBe(true);
    expect(guards.isNumberOrStringType('test')).toBe(true);
  });
  // ResultType
  it('should test ResultType correctly', () => {
    expect(guards.isResultType('success')).toBe(true);
    expect(guards.isResultType('error')).toBe(true);
    expect(guards.isResultType('pending')).toBe(true);
  });
  // PaymentMethodType
  it('should test PaymentMethodType correctly', () => {
    expect(guards.isPaymentMethodType('creditCard')).toBe(true);
    expect(guards.isPaymentMethodType('paypal')).toBe(true);
    expect(guards.isPaymentMethodType('bitcoin')).toBe(true);
  });
  // CarType
  it('should test CarType correctly', () => {
    const carType = {
      brand: 'Toyota',
      model: 'Corolla',
    };
    expect(guards.isCarType(carType)).toBe(true);
  });
  // ElectricCarType
  it('should test ElectricCarType correctly', () => {
    const electricCarType = {
      brand: 'Tesla',
      model: 'Model S',
      batteryCapacity: 100,
    };
    expect(guards.isElectricCarType(electricCarType)).toBe(true);
  });
  // SportsCarType
  it('should test SportsCarType correctly', () => {
    const sportsCarType = {
      brand: 'Ferrari',
      model: 'F40',
      topSpeed: 200,
    };
    expect(guards.isSportsCar(sportsCarType)).toBe(true);
  });
  // PaymentType
  it('should test PaymentType correctly', () => {
    const paymentType = {
      method: 'creditCard',
      amount: 100,
    };
    expect(guards.isPaymentType(paymentType)).toBe(true);
  });
  // TransactionStatus
  it('should test TransactionStatus correctly', () => {
    expect(guards.isTransactionStatus('success')).toBe(true);
    expect(guards.isTransactionStatus('error')).toBe(true);
    expect(guards.isTransactionStatus('pending')).toBe(true);
    expect(guards.isTransactionStatus('canceled')).toBe(true);
  });
  // ProductType
  it('should test ProductType correctly', () => {
    const productType: types.ProductType = {
      name: 'Widget',
      price: 10,
      color: types.ColorTypeAliasType.Red,
    };
    expect(guards.isProductType(productType)).toBe(true);
  });
  // CarDetailsType
  it('should test CarDetailsType correctly', () => {
    const carDetailsType: types.CarDetailsType = {
      brand: 'Toyota',
      model: 'Corolla',
      color: types.ColorTypeAliasType.Red,
    };
    expect(guards.isCarDetailsType(carDetailsType)).toBe(true);
  });
  // DataType
  it('should test DataType correctly', () => {
    const dataType = {
      kind: 'number',
      value: 1,
    };
    expect(guards.isDataType(dataType)).toBe(true);
  });
  // VehicleType
  it('should test VehicleType correctly', () => {
    const vehicleType = {
      brand: 'Toyota',
      model: 'Corolla',
    };
    expect(guards.isVehicleType(vehicleType)).toBe(true);
  });
  // ActionType
  it('should test ActionType correctly', () => {
    const actionType: types.ActionType = {
      type: 'add',
    };
    expect(guards.isActionType(actionType)).toBe(true);
  });
  // TargetType
  it('should test TargetType correctly', () => {
    const targetType: types.TargetType = 'user';
    expect(guards.isTargetType(targetType)).toBe(true);
  });
  // AddAction
  it('should test AddAction correctly', () => {
    const addAction: types.AddAction = {
      type: 'add',
      target: 'user',
    };
    expect(guards.isAddAction(addAction)).toBe(true);
  });
  // RemoveAction
  it('should test RemoveAction correctly', () => {
    const removeAction: types.RemoveAction = {
      type: 'remove',
      target: 'user',
    };
    expect(guards.isRemoveAction(removeAction)).toBe(true);
  });
  // ShapeType
  it('should test ShapeType correctly', () => {
    const shapeType = {
      type: 'circle',
    };
    expect(guards.isShapeType(shapeType)).toBe(true);
  });
  // CircleType
  it('should test CircleType correctly', () => {
    const circleType = {
      type: 'circle',
      radius: 10,
    };
    expect(guards.isCircleType(circleType)).toBe(true);
  });
  // SquareType
  it('should test SquareType correctly', () => {
    const squareType = {
      type: 'square',
      sideLength: 10,
    };
    expect(guards.isSquareType(squareType)).toBe(true);
  });
  // TriangleType
  it('should test TriangleType correctly', () => {
    const triangleType = {
      type: 'triangle',
      base: 10,
      height: 10,
    };
    expect(guards.isTriangleType(triangleType)).toBe(true);
  });
  // CustomShapeType
  it('should test CustomShapeType correctly', () => {
    const customShapeType = {
      type: 'circle',
      radius: 10,
    };
    expect(guards.isCustomShapeType(customShapeType)).toBe(true);
  });
  // DirectionEnum
  it('should test DirectionEnum correctly', () => {
    expect(guards.isDirectionEnum(types.DirectionEnum.Up)).toBe(true);
  });
  // ColorEnum
  it('should test ColorEnum correctly', () => {
    expect(guards.isColorEnum(types.ColorEnum.Red)).toBe(true);
  });
  // MixedValuesEnum
  it('should test MixedValuesEnum correctly', () => {
    expect(guards.isMixedValuesEnum(types.MixedValuesEnum.One)).toBe(true);
  });
  // ComputedValuesEnum
  it('should test ComputedValuesEnum correctly', () => {
    expect(guards.isComputedValuesEnum(types.ComputedValuesEnum.Middle)).toBe(
      true,
    );
  });
  // StatusEnum
  it('should test StatusEnum correctly', () => {
    expect(guards.isStatusEnum(types.StatusEnum.Active)).toBe(true);
  });
  // TrafficLightEnum
  it('should test TrafficLightEnum correctly', () => {
    expect(guards.isTrafficLightEnum(types.TrafficLightEnum.Green)).toBe(true);
  });
  // LogLevelEnum
  it('should test LogLevelEnum correctly', () => {
    expect(guards.isLogLevelEnum(LogLevelEnum.Error)).toBe(true);
  });
  // ColorEnumGeneric
  it('should test ColorEnumGeneric correctly', () => {
    expect(guards.isColorEnumGeneric(types.ColorEnumGeneric.Red)).toBe(true);
  });
  //VehicleTypeGeneric
  it('should test VehicleTypeGeneric correctly', () => {
    const vehicleTypeGeneric = types.VehicleTypeGeneric.Bike;
    expect(guards.isVehicleTypeGeneric(vehicleTypeGeneric)).toBe(true);
  });
  // MediaTypeInterface
  it('should test MediaTypeInterface correctly', () => {
    const mediaTypeInterface = types.MediaTypeInterface.Video;
    expect(guards.isMediaTypeInterface(mediaTypeInterface)).toBe(true);
  });
  // ColorTypeAliasType
  it('should test ColorTypeAliasType correctly', () => {
    expect(guards.isColorTypeAliasType(types.ColorTypeAliasType.Red)).toBe(
      true,
    );
  });
  // MediaTypeType
  it('should test MediaTypeType correctly', () => {
    const mediaTypeType = types.MediaTypeType.Image;
    expect(guards.isMediaTypeType(mediaTypeType)).toBe(true);
  });
  // ImageTypeType
  it('should test ImageTypeType correctly', () => {
    const imageTypeType = types.ImageTypeType.PNG;
    expect(guards.isImageTypeType(imageTypeType)).toBe(true);
  });
  // VideoType
  it('should test VideoType correctly', () => {
    const videoType: types.VideoType = types.VideoType.MP4;
    expect(guards.isVideoType(videoType)).toBe(true);
  });
});
