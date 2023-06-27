import { render, renderHook } from "@testing-library/react";
import { useHtmlToImage } from "@/useHtmlToImage";
import { toJpeg } from "dom-to-image";
import { saveAs } from "file-saver";

jest.mock("dom-to-image");
jest.mock("file-saver");

describe("useHtmlToImage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock <div /> 'offsetWidth' and 'offsetHeight'.
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 420
    });
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 218,
    });
  });

  it("should return the initial values for ref and saveHtmlAsImage", async () => {
    // Arrange.
    const { result } = renderHook(() => useHtmlToImage());
    const { ref, saveHtmlAsImage } = result.current;

    // Assert.
    expect(ref.current).toBe(null);
    expect(saveHtmlAsImage).toEqual(expect.any(Function));
  });

  describe("saveHtmlAsImage", () => {
    const fileName = "some-file-name";
    const fileNameWithExtension = "some-file-name.jpg";
    
    it("ref is null > should throw error", async () => {
      // Arrange.
      const { result } = renderHook(() => useHtmlToImage());
      const { saveHtmlAsImage } = result.current;

      // Assert.
      await expect(saveHtmlAsImage(fileName))
        .rejects
        .toThrowError("container ref is undefined");
    });

    it("does NOT provide quality option > should call \"toJpeg\" with correct params", async () => {
      // Arrange.
      const { result } = renderHook(() => useHtmlToImage());
      const { ref, saveHtmlAsImage } = result.current;
      
      const renderResult = render(
        <div ref={ref} />
      );

      // Assert.
      expect(toJpeg).not.toBeCalled();

      // Act.
      await saveHtmlAsImage(fileName);

      // Assert.
      expect(toJpeg).toBeCalledTimes(1);
      expect(toJpeg).toHaveBeenCalledWith(renderResult.container.firstChild, {
        height: 654,
        width: 1260,
        quality: 0.7, 
        style: { 
          transform: "scale(3) translate(420px, 218px)",
          transformOrigin: "center" 
        },
      });
    });

    it("does provide quality option > should call \"toJpeg\" with correct params", async () => {
      // Arrange.
      const { result } = renderHook(() => useHtmlToImage());
      const { ref, saveHtmlAsImage } = result.current;
      
      const renderResult = render(
        <div ref={ref} />
      );

      // Act.
      await saveHtmlAsImage(fileName, {
        quality: 0.2
      });

      // Assert.
      expect(toJpeg).toBeCalledTimes(1);
      expect(toJpeg).toHaveBeenCalledWith(renderResult.container.firstChild, expect.objectContaining({
        quality: 0.2,
      }));
    });

    it("should call \"saveAs\" with correct params", async () => {
      // Arrange.
      const fileBlob = "some-blob-string";
      (toJpeg as jest.Mock).mockResolvedValue(fileBlob);

      const { result } = renderHook(() => useHtmlToImage());
      const { ref, saveHtmlAsImage } = result.current;

      render(
        <div ref={ref} />
      );

      // Assert.
      expect(saveAs).not.toHaveBeenCalled();

      // Act.
      await saveHtmlAsImage(fileName);

      // Assert.
      expect(saveAs).toHaveBeenCalledTimes(1);
      expect(saveAs).toHaveBeenCalledWith(fileBlob, fileNameWithExtension);
    });
  });
});