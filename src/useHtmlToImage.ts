import { useRef } from "react";
import { toJpeg } from "dom-to-image";
import { saveAs } from "file-saver";

const SCALE_JPEG = 3;
const DEFAULT_QUALITY = 0.7;

export type HtmlToImageOptions = {
  quality?: number;
}

export const useHtmlToImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const saveHtmlAsImage = async (fileName: string, options?: HtmlToImageOptions) => {
    const containerElement = containerRef?.current;
    if (!containerElement) {
      throw new Error("container ref is undefined");
    }

    const {
      offsetHeight = 0,
      offsetWidth = 0,
    } = containerElement ?? {};

    const dataUrl = await toJpeg(containerElement, {
      height: offsetHeight * SCALE_JPEG,
      width: offsetWidth * SCALE_JPEG,
      quality: options?.quality ?? DEFAULT_QUALITY,
      style: {
        transformOrigin: "center",
        transform: `scale(${SCALE_JPEG}) translate(${offsetWidth}px, ${offsetHeight}px)`,
      },
    });

    return saveAs(dataUrl, `${fileName}.jpg`);
  };

  return {
    ref: containerRef,
    saveHtmlAsImage,
  };
};