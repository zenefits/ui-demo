import { getErrorId, getLabelId } from './FormFieldWrapper';

export function getAriaInputProps(name: string, error?: any, ariaLabel?: string) {
  return {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabel ? undefined : getLabelId(name),
    'aria-describedby': error ? getErrorId(name) : null,
  };
}
