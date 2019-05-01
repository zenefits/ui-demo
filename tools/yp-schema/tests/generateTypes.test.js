import path from 'path';
import { generateTypes /* , getSchemaPaths */ } from '../index';

const testSchemaPath = path.resolve(__dirname, 'testSchema.graphql');
const testFilePath = path.resolve(__dirname, 'testFile.ts');

describe('generateTypes function', () => {
  it('should generate all types for given schema and documents', async () => {
    expect(1).toBe(1);
    const result = await generateTypes({
      files: [testFilePath],
      generateDocuments: true,
      generateSchemaTypes: true,
      schemaPath: testSchemaPath,
    });
    // console.log('result', result);
    expect(result).toMatchSnapshot();
  });

  // it('should not throw when run for real yp schema', async () => {
  //   const result = await generateTypes({
  //     files: [testFilePath],
  //     schemaPath: getSchemaPath(),
  //     generateDocuments: true,
  //     generateSchemaTypes: true,
  //   });
  //   // console.log('result', result);
  //   expect(!!result).toBe(true);
  // });
});
