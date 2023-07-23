"use client";

import useGeneratedImages from "@/lib/store/useGeneratedImages";
import useModelFinetune from "@/lib/store/useModelFinetune";
import Image from "next/image";

const Images = () => {
  const width = useModelFinetune((state) => state.width);
  const height = useModelFinetune((state) => state.height);
  const images = useGeneratedImages((state) => state.images);
  return (
    <div className="basis-1/3 p-3">
      {images.length > 0 ? (
        <Image
          width={width}
          height={height}
          src={images[0].url}
          alt="Your AI generated image"
        />
      ) : (
        <div>
          <h1 className="text-lg md:text-xl">No Images Generated Yet...</h1>
          <Image
            src={
              "https://illustrations.popsy.co/white/page-under-construction.svg"
            }
            width={width}
            height={height}
            alt="image"
          />
        </div>
      )}
    </div>
  );
};

export default Images;
