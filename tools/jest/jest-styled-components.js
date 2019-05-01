import { addSerializer } from 'jest-specific-snapshot';
import 'jest-styled-components';
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer';

addSerializer(styleSheetSerializer);
