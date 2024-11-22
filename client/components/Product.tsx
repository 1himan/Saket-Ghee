import { Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Product({ imageText }) {
  return (
    <Tooltip placement="top" arrow title={`Click to see and Buy ${imageText}`}>
      <Link
        href={
          "somewhere back in time I left a part of me I wanna see if you can......"
        }
      >
        <Image
          className="rounded-md h-[150px] w-[200px]"
          src={`/${imageText}.png`}
          width={150}
          height={100}
          alt="Honey"
        />
        <p className="text-center mt-2">{imageText}</p>
      </Link>
    </Tooltip>
  );
}
