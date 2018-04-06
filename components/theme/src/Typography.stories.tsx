import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTheme, styled } from './web/ThemeProvider';
import { FontStyleString, fontDescriptions, fontStyles } from './web/fonts';
import { convertToNestedMap, fontStyles as fsUtil } from './utils';

const StyledTableHeader = styled.thead`
  text-align: left;
  vertical-align: bottom;
`;

// NOTE: avoiding zbase dependency
const TypographySample = styled<{ fontStyle?: string }>(props => <div {...props} />)`
  ${props => fsUtil(props.fontStyle)};
`;

const sizeNamesMap = {};
Object.keys(fontDescriptions).forEach(fontCategory => {
  Object.keys(fontDescriptions[fontCategory]).forEach(size => {
    sizeNamesMap[size] = true;
  });
});
const supportedSizeParam = Object.keys(sizeNamesMap);

const placeholders = {
  headings: 'Heading Text',
  paragraphs: 'Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec.',
  controls: 'Control Text',
};

const Page = props => {
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
            Controls<br />(button, input, avatar)
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

storiesOf('Typography', module).add('All', () => <PageWithTheme />);
