import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import { styled, withTheme } from './web/ThemeProvider';
import { fontDescriptions, fontStyles, FontStyleString } from './web/fonts';
import { convertToNestedMap, fontStyles as fsUtil } from './utils';

const StyledTableHeader = styled.thead`
  text-align: left;
  vertical-align: bottom;
`;

// NOTE: avoiding zbase dependency
const untypedFsUtil = fsUtil as any;
const TypographySample = styled.div<{ fontStyle?: FontStyleString }>`
  ${props => untypedFsUtil(props.fontStyle)};
`;

const sizeNamesMap: { [size: string]: boolean } = {};
Object.keys(fontDescriptions).forEach(fontCategory => {
  Object.keys(fontDescriptions[fontCategory]).forEach(size => {
    sizeNamesMap[size] = true;
  });
});
const supportedSizeParam = Object.keys(sizeNamesMap);

const placeholders: { [key: string]: string } = {
  headings: 'Heading Text',
  paragraphs: 'Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec.',
  controls: 'Control Text',
};

const Page = (props: any) => {
  const fontsStylesMap = convertToNestedMap(fontStyles);
  const rulesFlattened = supportedSizeParam.map(s =>
    Object.keys(fontsStylesMap)
      .filter(categoryName => fontsStylesMap[categoryName][s])
      .map(categoryName => ({
        rulePath: `${categoryName}.${s}` as FontStyleString,
        placeholder: placeholders[categoryName],
      })),
  );

  return (
    <table cellPadding="10">
      <StyledTableHeader>
        <tr>
          <th>Sizes</th>
          <th>Headings</th>
          <th>
            Controls
            <br />
            (button, input, avatar)
          </th>
          <th>Paragraphs</th>
        </tr>
      </StyledTableHeader>
      <tbody>
        {supportedSizeParam.map((size, index) => (
          <tr key={size}>
            <td>{size}</td>
            {rulesFlattened[index].map((rule, i) => (
              <td key={rule.rulePath}>
                <TypographySample fontStyle={rule.rulePath}>{rule.placeholder}</TypographySample>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PageWithTheme = withTheme(Page);

storiesOf('theme|Typography', module).add('All', () => <PageWithTheme />);
