import { Icon } from '../types';

const IMAGE_BASE_URL = 'https://static.ui.com/fingerprint/ui/icons/';

export const getImageURL = (icon: Icon, size: number): string => {
  const index = Math.min(size, icon.resolutions.length - 1);
  return `${IMAGE_BASE_URL}${icon.id}_${icon.resolutions[index][0]}x${icon.resolutions[index][1]}.png`;
};
