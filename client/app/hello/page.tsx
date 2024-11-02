import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function page() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Image
          // this address leads to a broken image
            src="/client/app/public/image.png"
            alt="asjdkfjasd"
            height={100}
            width={100}
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="sadf"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            alt="sadf"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
