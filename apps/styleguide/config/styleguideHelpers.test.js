import { prepareExampleCode, checkLoadExample, normalizeExamplePath } from './styleguideHelpers';

describe('styleguideHelpers', () => {
  describe('checkLoadExample', () => {
    it('detects loadExample', () => {
      const checked = checkLoadExample('// loadExample("somePath");');
      expect(checked).toHaveProperty('found', true);
      expect(checked).toHaveProperty('path', 'somePath');
    });

    it('handles relative paths', () => {
      const checked = checkLoadExample('// loadExample("../foo-bar/baz");');
      expect(checked).toHaveProperty('found', true);
      expect(checked).toHaveProperty('path', '../foo-bar/baz');
    });

    it('handles missing whitespace etc', () => {
      expect(checkLoadExample('//loadExample("somePath");')).toHaveProperty('found', true);
      expect(checkLoadExample("//loadExample('somePath')")).toHaveProperty('found', true);
    });

    it('does not match false positives', () => {
      expect(checkLoadExample('<loadExample')).toHaveProperty('found', false);
      expect(checkLoadExample('// load example')).toHaveProperty('found', false);
      expect(checkLoadExample('let loadExample;')).toHaveProperty('found', false);
    });
  });

  describe('normalizeExamplePath', () => {
    it('uses base', () => {
      const normalized = normalizeExamplePath('components/forms/src/Component/Component.md', './examplePath');
      expect(normalized.endsWith('components/forms/src/Component/examplePath.tsx')).toBe(true);
    });

    it('adds tsx only if needed', () => {
      const normalized = normalizeExamplePath('components/forms/src/Component/Component.md', './examplePath.tsx');
      expect(normalized.endsWith('components/forms/src/Component/examplePath.tsx')).toBe(true);
    });

    it('respects extension if provided', () => {
      const normalized = normalizeExamplePath('components/forms/src/Component/Component.md', './examplePath.ts');
      expect(normalized.endsWith('components/forms/src/Component/examplePath.ts')).toBe(true);
    });
  });

  describe('prepareExampleCode', () => {
    it('strips newlines', () => {
      const actualExampleCode = "const foo = 'bar';";
      const withImports = `
import React from 'react';

${actualExampleCode}

`;
      const prepared = prepareExampleCode(withImports);
      expect(prepared.split('\n')).toHaveLength(1);
    });

    it('removes single imports', () => {
      const actualExampleCode = "const foo = 'bar';";
      const withImports = `
import React from 'react';
import { Avatar } from '../..';

${actualExampleCode}
`;
      const prepared = prepareExampleCode(withImports);
      expect(prepared).toBe(actualExampleCode);
      expect(prepared).not.toMatch('import');
    });

    it('removes multiline imports', () => {
      const actualExampleCode = "const foo = 'bar';";
      const withMultilineImport = `
import React from 'react';
import {
  Avatar,
  Box,
  Flex
} from '../..';

${actualExampleCode}
`;
      const prepared = prepareExampleCode(withMultilineImport);
      expect(prepared).toBe(actualExampleCode);
    });

    it('removes export wrapper', () => {
      const actualExampleCode = '<div>Hi</div>';
      const withExport = `export default () => ${actualExampleCode};`;
      const prepared = prepareExampleCode(withExport);
      expect(prepared).toBe(actualExampleCode);
    });

    it('removes multiline export wrapper', () => {
      const actualExampleCode =
        '<div>Some rather long text that makes prettier wrap this whole thing in parentheses for formatting reasons</div>';
      const withExport = `
export default () => (
${actualExampleCode}
);
`;
      const prepared = prepareExampleCode(withExport);
      expect(prepared).toBe(actualExampleCode);
    });

    it('preserves indentation', () => {
      const actualExampleCode = `<Outer>
  <One>
    <Two>2</Two>
  </One>
</Outer>`;
      const withExport = `
export default () => (
${actualExampleCode}
);
`;
      const prepared = prepareExampleCode(withExport);
      expect(prepared).toBe(actualExampleCode);
    });

    it('removes trailing semicolon for JSX examples', () => {
      const actualExampleCode = '<Avatar p={3} photoUrl="foo.com/bar" />';
      const withTrailingSemicolon = `export default () => ${actualExampleCode};`;
      const prepared = prepareExampleCode(withTrailingSemicolon);
      expect(prepared).toBe(actualExampleCode);
    });

    it('strips component types', () => {
      const classLineWithoutTypes = `class ComponentExample extends React.Component {`;
      const classLineWithTypes = `class ComponentExample extends React.Component<{}, { state1: boolean; state2?: number }> {`;
      const exampleWithTypes = `
${classLineWithTypes}
  constructor(props) {
    super(props);
    this.state = {
      state1: true
    };
  }
}

export default () => <ComponentExample />`;
      const prepared = prepareExampleCode(exampleWithTypes);
      expect(prepared).toMatch(classLineWithoutTypes);
    });

    it('strips typescript assertions', () => {
      const withTypeAssertion = `<Text fontStyle={fs as FontStyleString}>text</Text>`;
      const withoutTypeAssertion = `<Text fontStyle={fs}>text</Text>`;
      const prepared = prepareExampleCode(withTypeAssertion);
      expect(prepared).toMatch(withoutTypeAssertion);
    });
  });
});
