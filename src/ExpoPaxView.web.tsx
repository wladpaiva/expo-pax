import * as React from 'react';

import { ExpoPaxViewProps } from './ExpoPax.types';

export default function ExpoPaxView(props: ExpoPaxViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
