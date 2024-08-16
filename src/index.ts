import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoPax.web.ts
// and on native platforms to ExpoPax.ts
import ExpoPaxModule from './ExpoPaxModule';
import ExpoPaxView from './ExpoPaxView';
import { ChangeEventPayload, ExpoPaxViewProps } from './ExpoPax.types';

// Get the native constant value.
export const PI = ExpoPaxModule.PI;

export function hello(): string {
  return ExpoPaxModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoPaxModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoPaxModule ?? NativeModulesProxy.ExpoPax);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoPaxView, ExpoPaxViewProps, ChangeEventPayload };
