A component allowing the user to paginate through a DataTable.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="data-manager|DataPager" selectedStory="default" />
```

#### Usage

- Use this whenever you have a [DataTable](#!/DataTable).
- Choose a page size based on the use case:

| Size | Count | Guidance                                                                                                                                        |
| ---- | ----: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| XS   |     5 | Use for small lists embedded in another page. Example: on overview pages.                                                                       |
| S    |    10 | Use for small lists when increased data density is useful. Example: company selector.                                                           |
| M    |    25 | (Default) Use when a large number of rows would be overwhelming (example: there are many columns) or when there are performance considerations. |
| L    |    50 | Consider using M or XL instead. This size exists only for backwards-compatibility in existing apps.                                             |
| XL   |   100 | Use for simple data that is easier to digest in bulk. Never for editable data.                                                                  |

#### Implementation Notes

This is a convenience component around the Pager component.

Page size is inherited from DataManager via the `initialPageSize` prop.

#### Related

- [DataTable](#!/DataTable)
