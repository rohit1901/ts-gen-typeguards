import { tsGenTypeguards } from './';

// Usage Examples
tsGenTypeguards();
// tsGenTypeguards(undefined, 'inputNew', 'outputNew');
// tsGenTypeguards(undefined, 'inputNew');
// tsGenTypeguards(undefined, undefined, 'outputNew');
// tsGenTypeguards('export interface Container<T, K> {value: T;}export type ContainerOfString = Container<string, number>;export type ContainerOfNumber = Container<number>;');
