export type InputSize = 'small' | 'medium' | 'large'; // 'size' is taken and not compatible (number)

export const sizeMap: { [size in InputSize]: number } = {
  small: 0,
  medium: 1,
  large: 2,
};
