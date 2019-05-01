// This isn't meant to be run individually but as a post-processing step in other transformers
import prettier, { Options } from 'prettier';

// tslint:disable-next-line
import prettierConfig from '../../../../prettier.config';

export default function(source: string) {
  return prettier.format(source, {
    parser: 'typescript',
    ...prettierConfig,
  } as Options);
}
