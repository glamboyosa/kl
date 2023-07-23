"use client";

import useGeneratedImages from "@/lib/store/useGeneratedImages";
import useModelFinetune from "@/lib/store/useModelFinetune";
import Image from "next/image";

const Images = () => {
  const width = useModelFinetune((state) => state.width);
  const height = useModelFinetune((state) => state.height);
  const images = useGeneratedImages((state) => state.images);
  return (
    <>
      {images.length > 0 && (
        <Image
          width={width}
          height={height}
          src={images[0].url}
          alt="Your AI generated image"
        />
      )}
    </>
  );
};

export default Images;
