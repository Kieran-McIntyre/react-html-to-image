import { useState } from "react";
import { useHtmlToImage } from "react-html-to-image";
import { Button } from "@example/Button";

export const App = () => {
  const [isLoading, setLoading] = useState(false);
  const { ref, saveHtmlAsImage } = useHtmlToImage();

  const handleDownloadImage = async () => {
    try {
      setLoading(true);
      await saveHtmlAsImage("filename");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div 
        ref={ref}
        className="w-80 h-96 bg-gradient-to-t from-blue-700 to-blue-300 flex flex-col relative" 
      >
        <img
          src="https://res.cloudinary.com/dqpvghxsm/image/upload/v1687799393/module/example_beach_lf3tro.png"
          width={200}
          height={200}
          className="mt-20 ml-4 rounded-xl rotate-6 mix-blend-difference block"
        />

        <p className="ml-32 mt-6 font-sans text-xl -rotate-2 text-gray-50">Some text!</p>

        <div className="bg-orange-500 h-12 w-12 rounded-full absolute top-4 left-4" />
        <div className="bg-red-500 h-12 w-12 rounded-full absolute bottom-2 left-4" />
        <div className="bg-green-500 h-14 w-14 rounded-full absolute bottom-10 left-8 shadow-xl opacity-80" />
        <div className="bg-purple-800 h-10 w-10 rounded-full absolute bottom-42 right-6" />
      </div>

      <Button 
        label="Download"
        loading={isLoading}
        onClick={handleDownloadImage}
      />
    </div>
  );
};
