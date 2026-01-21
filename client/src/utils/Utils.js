// Number formatting utilities
export const formatValue = (value) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

// Get CSS variable with fallback
export const getCssVariable = (variable, fallback = '#000000') => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
};

// Adjust opacity for different color formats
const adjustHexOpacity = (hexColor, opacity) => {
  hexColor = hexColor.replace('#', '');
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const adjustHSLOpacity = (hslColor, opacity) => {
  return hslColor.replace('hsl(', 'hsla(').replace(')', `, ${opacity})`);
};

const adjustRGBOpacity = (rgbColor, opacity) => {
  return rgbColor.replace(/rgba?\(([^)]+)\)/, (_, inner) => {
    const parts = inner.split(',').map(p => p.trim());
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`;
  });
};

export const adjustColorOpacity = (color, opacity) => {
  if (!color || typeof color !== 'string' || color.trim() === '') {
    console.warn('adjustColorOpacity called with invalid color:', color);
    return `rgba(0, 0, 0, ${opacity})`;
  }

  if (color.startsWith('#')) {
    return adjustHexOpacity(color, opacity);
  } else if (color.startsWith('hsl')) {
    return adjustHSLOpacity(color, opacity);
  } else if (color.startsWith('rgb')) {
    return adjustRGBOpacity(color, opacity);
  } else {
    console.warn('Unsupported color format:', color);
    return `rgba(0, 0, 0, ${opacity})`;
  }
};
