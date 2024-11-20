import React from "react";
import dynamic from "next/dynamic";
const CCarousel = dynamic(
  () => import("@coreui/react").then((mod) => mod.CCarousel),
  { ssr: false }
);
const CCarouselItem = dynamic(
  () => import("@coreui/react").then((mod) => mod.CCarouselItem),
  { ssr: false }
);
const CImage = dynamic(
  () => import("@coreui/react").then((mod) => mod.CImage),
  { ssr: false }
);

export default function HomeCarousel() {
  return (
    <CCarousel controls transition="crossfade" interval={false} className="w-[100vw]">
      {/* Slide 1 */}
      <CCarouselItem>
        <div className="relative">
          <CImage
            className="d-block h-72 w-full"
            src="https://fujilove.com/wp-content/uploads/2017/03/21x9_DSCF1045-1small-scaled.jpg"
            alt="Slide 1"
          />
          {/* Add content */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold">First Slide Label</h3>
              <p className="text-lg">
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
      </CCarouselItem>

      {/* Slide 2 */}
      <CCarouselItem>
        <div className="relative">
          <CImage
            className="d-block h-72 w-full"
            src="https://i.pinimg.com/originals/eb/f0/02/ebf002d6348c3ae432649da4418fce40.jpg"
            alt="Slide 2"
          />
          {/* Add content */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold">Second Slide Label</h3>
              <p className="text-lg">
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
        </div>
      </CCarouselItem>
      {/* the sliding animation only seems to be working on this 3rd slide, the upper to just pops up suddenly */}
      {/* Slide 3 */}
      <CCarouselItem>
        <div className="relative">
          <CImage
            className="d-block w-full h-72"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLnWghz2myWlq_4pxfFNZMqCO09trH98wBg&s"
            alt="Slide 3"
          />
          {/* Add content */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold">Third Slide Label</h3>
              <p className="text-lg">
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
      </CCarouselItem>
    </CCarousel>
  );
}
