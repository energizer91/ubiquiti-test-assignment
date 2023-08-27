import React from 'react';
import { Icon } from '../../types';

interface ImageProps {
  icon: Icon;
  size: number;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const IMAGE_BASE_URL = 'https://static.ui.com/fingerprint/ui/icons/';

export default function Image({ className, icon, size, alt, width, height }: ImageProps) {
  const index = Math.min(size, icon.resolutions.length - 1);
  const url = `${IMAGE_BASE_URL}${icon.id}_${icon.resolutions[index][0]}x${icon.resolutions[index][1]}.png`;

  return (
    <img
      className={className}
      src={url}
      alt={alt}
      width={width || icon.resolutions[index][0]}
      height={height || icon.resolutions[index][1]}
    />
  );
}
