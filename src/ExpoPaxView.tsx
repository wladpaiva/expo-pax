import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoPaxViewProps } from './ExpoPax.types';

const NativeView: React.ComponentType<ExpoPaxViewProps> =
  requireNativeViewManager('ExpoPax');

export default function ExpoPaxView(props: ExpoPaxViewProps) {
  return <NativeView {...props} />;
}
