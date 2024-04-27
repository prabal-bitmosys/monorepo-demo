'use client';

// Import necessary dependencies from 'react'
import { useEffect, useState } from 'react'
// Import necessary dependencies from '@fluentui/react-components'
import {
  createDOMRenderer,
  RendererProvider,
  FluentProvider,
  webLightTheme,
  SSRProvider,
  Theme,
  createLightTheme,
  createDarkTheme,
  BrandVariants,
} from '@fluentui/react-components';


// custome fluent ui theme
const bitmosys: BrandVariants = {
  10: "#060203",
  20: "#251017",
  30: "#411626",
  40: "#581932",
  50: "#701B3F",
  60: "#891B4C",
  70: "#A21A59",
  80: "#BC1767",
  90: "#D70F75",
  100: "#EB2783",
  110: "#F04E91",
  120: "#F56B9E",
  130: "#F984AD",
  140: "#FD9BBB",
  150: "#FFB2CA",
  160: "#FFC8D8"
};

const lightTheme: Theme = {
  ...createLightTheme(bitmosys),
};

const darkTheme: Theme = {
  ...createDarkTheme(bitmosys),
};

darkTheme.colorBrandForeground1 = bitmosys[110];
darkTheme.colorBrandForeground2 = bitmosys[120];

// Create a DOM renderer for Fluent UI.
const renderer = createDOMRenderer();

/**
 * Providers component.
 *
 * This component wraps other components with a set of providers
 * for Fluent UI, SSR, and a custom renderer.
 *
 * @param {Object} props - The properties for the Providers component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the Providers.
 * @returns {React.Element} The Providers component with child components.
 */
export function Providers({ children }: {children: any}) {
  // Declare a state variable named 'hasMounted' and a function named 'setHasMounted' to update it.
  const [hasMounted, setHasMounted] = useState(false);

  // Use the 'useEffect' hook to set 'hasMounted' to true once the component has mounted.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // If the component hasn't mounted yet, return nothing.
  if (!hasMounted) {
    return null;
  }

  // If the component has mounted, return a set of providers.
  return (
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <SSRProvider>
        <FluentProvider theme={webLightTheme}>
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}