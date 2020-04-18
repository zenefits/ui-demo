import { gainedOrLostSpanHover, RowProps, SpanStartsByRow } from './DataTableRow';

type Row = { color: string; spanned: string };
const rowSpanStartsForRow = {
  columnsWithSpans: {
    1: true,
  },
  spanStarts: {
    1: {
      spanLength: 2,
    },
  },
} as SpanStartsByRow;

describe('DataTableRow', () => {
  it('returns true for when a spanned row has been hovered', () => {
    expect(
      gainedOrLostSpanHover<Row>({
        rowSpanStartsForRow,
        rowIndex: 1,
        hoverProps: {
          hoveredRow: 2,
          lastHoveredRow: 1,
        },
      } as RowProps<Row>),
    ).toBe(true);
  });

  it('returns false if when a spanned row has hover, but hover was not recently updated', () => {
    expect(
      gainedOrLostSpanHover<Row>({
        rowSpanStartsForRow,
        rowIndex: 3,
        hoverProps: {
          hoveredRow: 2,
          lastHoveredRow: 2,
        },
      } as RowProps<Row>),
    ).toBe(false);
  });

  it('returns false for a non-hovered row', () => {
    expect(
      gainedOrLostSpanHover<Row>({
        rowSpanStartsForRow,
        rowIndex: 3,
        hoverProps: {
          hoveredRow: 1,
        },
      } as RowProps<Row>),
    ).toBe(false);
  });
});
