import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';

const FALLBACK_IMAGE =
  'https://via.placeholder.com/800x400?text=No+Images+Available';

const PropertyViewCarousel = ({ images }) => {
  const safeImages =
    Array.isArray(images) && images.length > 0
      ? images
      : [FALLBACK_IMAGE];

  return (
    <section>
      <Carousel
        className="overflow-hidden rounded-lg"
        opts={{
          breakpoints: {
            '(min-width: 1024px)': { slidesToScroll: 2 },
          },
        }}
      >
        <CarouselContent className="-ml-0.5">
          {safeImages.map((image, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 pl-0.5">
              <img
                className="h-96 w-full object-cover"
                src={image}
                alt={`Hotel image ${index + 1}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {safeImages.length > 1 && (
          <>
            <CarouselPrevious className="left-1 shadow-lg" />
            <CarouselNext className="right-1 shadow-lg" />
          </>
        )}
      </Carousel>
    </section>
  );
};

export default PropertyViewCarousel;
