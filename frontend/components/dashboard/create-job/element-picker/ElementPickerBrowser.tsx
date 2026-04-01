import { forwardRef } from 'react';

interface Props { html: string; }

export const ElementPickerBrowser = forwardRef<HTMLIFrameElement, Props>(
  ({ html }, ref) => (
    <iframe
      ref={ref}
      srcDoc={html}
      sandbox="allow-scripts allow-same-origin"
      className="w-full h-full border-0"
      title="Element picker"
    />
  )
);
ElementPickerBrowser.displayName = 'ElementPickerBrowser';