import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Product({ imageText }) {
  return (
    <Link
      href={
        "somewhere back in time I left a part of me I wanna see if you can......"
      }
    >
      <Image
        className="rounded-md h-[100px] w-[150px]"
        src={`/${imageText}.png`}
        width={150}
        height={100}
        alt="Honey"
      />
      <p className="text-center mt-2">{imageText}</p>
    </Link>
  );
}
