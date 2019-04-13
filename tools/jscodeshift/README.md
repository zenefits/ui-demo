### Writing a transformer

See https://github.com/facebook/jscodeshift

### To run transformers

`yarn zcli jscodeshift <pathToTransformer> ...transformerArgs`

For example:
`yarn zcli jscodeshift src/transformers/addFieldToGqlQueries.ts --fieldName=dashboard --entityName=id`
