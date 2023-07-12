// Generate type guards for type aliases
import {generateInterfaceTypeGuard} from "./generateInterfaceTypeGuard";

export function generateTypeAliasGuard(typeName: string, definition: any): string {
    const typeGuard = generateInterfaceTypeGuard(typeName, definition);

    return typeGuard.replace(`function is${typeName}(value: any): value is`, `type is${typeName} =`);
}