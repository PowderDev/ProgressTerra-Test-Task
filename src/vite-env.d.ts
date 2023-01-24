declare module "*.svg" {
  const ReactComponent: import("react").FC<import("react").SVGProps<SVGSVGElement>>
  export { ReactComponent }
}

/// <reference types="vite/client" />
