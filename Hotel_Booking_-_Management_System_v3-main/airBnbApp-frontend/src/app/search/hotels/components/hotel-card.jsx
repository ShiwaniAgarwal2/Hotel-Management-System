import Icon from '@/components/ui/icon';
import React from 'react';
import useHotelNavigation from '../hooks/use-hotel-navigation';
import { Link } from 'react-router';

const hotelInfo = {
  description:
    'A boutique resort with an Indo-Portuguese architecture, the Ronil Goa offers lively holidays filled with recreational activities.',
  details: {
    type: 'Entire Homestay',
    bedrooms: 1,
    guests: 4,
    policies: ['Free Cancellation', 'Book with ₹0 Payment'],
  },
  rating: {
    score: 4.8,
    text: 'Excellent',
    reviews: 8,
  },
};

const FALLBACK_IMAGE =
  'https://via.placeholder.com/240x138?text=No+Image';

const HotelImages = ({ photos }) => {
  const safePhotos = Array.isArray(photos) && photos.length > 0
    ? photos
    : [FALLBACK_IMAGE];

  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  return (
    <div className="flex flex-col gap-1">
      <div className="w-60">
        <img
          height={138}
          width={240}
          className="rounded-sm max-h-[138px] w-full object-cover"
          src={safePhotos[activeImageIndex]}
          alt="Hotel"
        />
      </div>

      {safePhotos.length > 1 && (
        <div className="grid grid-cols-4 gap-1 w-60">
          {safePhotos.slice(1).map((image, index) => (
            <div
              className="relative overflow-hidden rounded-sm"
              key={index}
              onMouseEnter={() => setActiveImageIndex(index + 1)}
            >
              <img
                height={50}
                width={60}
                className="h-12 w-full object-cover"
                src={image}
                alt="Hotel thumbnail"
              />
              {index === safePhotos.length - 2 && (
                <span className="text-[10px] flex pointer-events-none items-center justify-center font-semibold text-white absolute inset-0 backdrop-blur-sm">
                  View All
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HotelCard = ({ name, photos, city, id, amenities, price }) => {
  const navigationUrl = useHotelNavigation(id);

  const safeAmenities = Array.isArray(amenities) ? amenities : [];
  const safePrice = typeof price === 'number' ? price : 0;

  return (
    <Link className="inline-block" to={navigationUrl}>
      <article className="flex w-full transition-colors border rounded-lg hover:border-primary">
        <div className="flex flex-1 gap-4 p-4">
          <HotelImages photos={photos} />

          <div className="space-y-3">
            <div className="space-y-0.5">
              <h2 className="inline text-xl font-bold">
                {name}{' '}
                {Array.from({ length: 3 }).map((_, index) => (
                  <Icon
                    key={index}
                    icon="star"
                    size="12"
                    className="inline mb-2 text-yellow-500"
                  />
                ))}
              </h2>
              <p className="text-sm font-semibold text-primary">{city}</p>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <p className="text-sm font-semibold">{hotelInfo.details.type}</p>
              <span>|</span>
              <p className="text-sm">{hotelInfo.details.bedrooms} Bedroom</p>
              <span>|</span>
              <p className="text-sm">
                Sleep {hotelInfo.details.guests} Guests
              </p>
            </div>

            <ul className="space-y-1">
              {safeAmenities.slice(0, 2).map((amenity, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1 text-sm text-green-700"
                >
                  <Icon icon="check" size="16" />
                  {amenity}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1">
              <p className="text-sm line-clamp-1">
                {hotelInfo.description}
              </p>
              <span className="text-xs font-medium text-primary">
                View More
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end w-48 p-4 border-l shrink-0">
          <div>
            <div className="flex gap-1.5">
              <p className="text-base font-bold text-brand">
                {hotelInfo.rating.text}
              </p>
              <span className="inline-block px-1 py-0.5 text-sm font-bold text-white rounded bg-brand">
                {hotelInfo.rating.score}
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-end">
              ({hotelInfo.rating.reviews} Ratings)
            </p>
          </div>

          <div className="flex flex-col items-end justify-center flex-1">
            <p className="text-2xl font-bold">
              ₹ {safePrice.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              + ₹0 taxes & fees
            </p>
            <p className="text-sm text-muted-foreground">Per Night</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default React.memo(HotelCard);
