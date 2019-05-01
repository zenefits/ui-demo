```jsx
const optionList = [
  { value: 'Option 1' },
  { value: 'Option 2' },
  { value: 'Option 3' },
  { value: 'Option 4' },
  { value: 'Option 5' },
  { value: 'Option 6' },
];
<SearchSelectDeprecated
  getOptions={query => optionList.filter(option => option.value.toLowerCase().includes(query.toLowerCase()))}
/>;
```
