import React, { useState } from 'react';
import { restaurantData } from '../data/restaurant';

export function ImageWithFallback({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy'
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(restaurantData.info.placeholderImage.path);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || restaurantData.info.name}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
    />
  );
}
