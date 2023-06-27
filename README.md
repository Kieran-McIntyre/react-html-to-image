# react-html-to-image

A simple `React` hook to download your `HTML` markup as a `.jpg` image.

## Installation

Using yarn:

```sh
yarn add react-html-to-image
```

or with npm:

```sh
npm install react-html-to-image
```

## Usage

```tsx
import { useHtmlToImage } from "react-html-to-image";

export const App = () => {
  const { ref, saveHtmlAsImage } = useHtmlToImage();

  const handleDownloadImage = async () => {
    try {
      await saveHtmlAsImage("your-file-name", {
        quality: 0.7,
      });
    } catch (error) {
      // Handle error.
    }
  };

  return (
    <main>
      <div ref={ref} className="…">
        {/* Your markup */}
      </div>
    
      <button onClick={handleDownloadImage} />
    </main>
  );
};
```

`saveHtmlAsImage` accepts two params: `saveHtmlAsImage(fileName, options)`

| Param             | Type   | Required | Default | Description |
|-------------------|--------|----------|---------|----------------------------------------------------|
| `fileName`        | string | `true`   |         | The file name for the downloaded image.            |
| `options`         | object | `false`  |         | The options for saving your downloaded image.      |
| `options.quality` | object |          | `0.7`   | The desired quality of the image. Default is `0.7` |

## Known issues

- `<img />` within `display: flex` containers do not show in the downloaded image.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)