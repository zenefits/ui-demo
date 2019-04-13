A wrapper component that renders charts

#### Implementation Notes

The underlying charting library is [Highcharts](https://www.highcharts.com/) with [HighCharts React](https://github.com/highcharts/highcharts-react) as a React wrapper.

#### Examples

Column Chart example:

```jsx noeditor
<StorybookExample selectedKind="charts|Chart/Column & Bar" selectedStory="grouped" />
```

Line Chart example:

```jsx
// loadExample('./exampleLine');
```

Donut Chart example:

```jsx
// loadExample('./exampleDonut');
```

See [more examples](http://ui.zenefits.com/app/stories/?selectedKind=charts|Chart/Column%26Bar).

#### Usage

Charts should be used to visually represent data.

- Column/Bar chart:
  - _Do_: Use to show the comparison of data
- Line Chart:
  - _Do_: Use to show the transition of data
- Donut/Pie Chart:
  - _Do_: Use to show the composition of data

#### Related

<!-- optional -->

- [Chart.Series](#!/Chart.Series) provides a way to display the data on the chart
- [DisplayMetric](#!/DisplayMetric) summarizes a set of data with a simple value and label.
