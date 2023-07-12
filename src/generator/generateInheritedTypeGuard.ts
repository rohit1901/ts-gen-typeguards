// Generate type guards for inherited types
import {generateInterfaceTypeGuard} from "./generateInterfaceTypeGuard";

export function generateInheritedTypeGuard(typeName: string, definition: any): string {
    const typeGuard = generateInterfaceTypeGuard(typeName, definition);

    return typeGuard.replace(`function is${typeName}(value: any): value is`, `type is${typeName} =`);
}