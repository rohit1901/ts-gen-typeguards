// Generate type guards for optional properties
import {generateInterfaceTypeGuard} from "./generateInterfaceTypeGuard";

export function generateOptionalPropertyTypeGuard(typeName: string, definition: any): string {
    const typeGuard = generateInterfaceTypeGuard(typeName, definition);

    return typeGuard.replace(`function is${typeName}(value: any): value is`, `type is${typeName} =`);
}