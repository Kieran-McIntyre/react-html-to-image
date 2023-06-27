type Options = {
  width?: number | undefined;
  height?: number | undefined;
  style?: {
    transformOrigin: string;
    transform: string;
  };
  quality?: number | undefined;
}

declare module "dom-to-image" {
  // eslint-disable-next-line no-unused-vars
  export function toJpeg(node: HTMLDivElement, options?: Options): Promise<string>
}