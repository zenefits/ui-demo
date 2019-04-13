import React, { Component } from 'react';

import { Card } from 'z-frontend-composites';
import { inputWidths, labelWidths, Form } from 'z-frontend-forms';
import { DragDropList, OnDragEndResult } from 'z-frontend-drag-and-drop';
import { Box, Flex, Icon, TextBlock, TextInline } from 'zbase';
import { IconButton } from 'z-frontend-elements';

type Column = {
  name: string;
  required?: boolean;
  selected?: boolean;
};

type ColumnEditorProps = {
  /**
   * A list of columns. You should specify if a column is required and if a column should be selected initially.
   * The order in this array will be preserved in select dropdown.
   */
  columns: Column[];

  /**
   * Callback function
   */
  onChange?: (columns: string[]) => void;
};

type ColumnEditorState = {
  selectedColumns: string[];
};

type FormValues = {
  column: string;
};

class ColumnEditor extends Component<ColumnEditorProps, ColumnEditorState> {
  state = {
    selectedColumns: this.props.columns.filter(c => c.selected || c.required).map(c => c.name),
  };

  onChange = (columns: string[]) => {
    this.props.onChange && this.props.onChange(columns);
  };

  addToSelected = async (column: string) => {
    if (!column || this.state.selectedColumns.includes(column)) {
      return;
    }

    let newColumns;

    await this.setState(prevState => {
      newColumns = [...prevState.selectedColumns, column];
      return {
        selectedColumns: newColumns,
      };
    });

    this.onChange(newColumns);
  };

  onDragEnd = async (result: OnDragEndResult) => {
    const { sourceList, targetList } = result;

    if (!targetList) {
      return;
    }

    let newList;

    await this.setState(prevState => {
      newList = Array.from(prevState.selectedColumns);
      const [removed] = newList.splice(sourceList.index, 1);
      newList.splice(targetList.index, 0, removed);
      const result = { selectedColumns: newList };
      return result;
    });

    this.onChange(newList);
  };

  deleteColumn = async (column: string) => {
    let newColumns;

    await this.setState(prevState => {
      newColumns = prevState.selectedColumns.filter(c => c !== column);

      return {
        selectedColumns: newColumns,
      };
    });

    this.onChange(newColumns);
  };

  render() {
    const { columns } = this.props;
    const { selectedColumns } = this.state;

    const allColumns = columns.map(c => c.name);
    const requiredColumns = columns.filter(c => c.required).map(c => c.name);
    const columnOptions = allColumns.filter(column => !selectedColumns.includes(column));

    return (
      <>
        <Card.Row>
          <Form<FormValues> onSubmit={() => {}} initialValues={{ column: '' }}>
            {() => {
              return (
                <Form.SimpleSelect<string>
                  name="column"
                  label="Columns to Include"
                  placeholder={columnOptions.length ? 'Select Columns to Add' : 'No more options to add'}
                  onChange={value => {
                    this.addToSelected(value);
                  }}
                  value=""
                  containerProps={{ mb: 0 }}
                >
                  {({ SelectOption }) => columnOptions.map(option => <SelectOption key={option} option={option} />)}
                </Form.SimpleSelect>
              );
            }}
          </Form>
        </Card.Row>
        <Card.Row>
          <Flex wrap>
            <Box w={labelWidths} py={3}>
              <TextBlock fontStyle="controls.m">Column Ordering</TextBlock>
            </Box>
            <Box w={inputWidths}>
              <DragDropList.Context onDragEnd={this.onDragEnd}>
                <DragDropList.List listId="selectedColumns" shouldUsePortal>
                  {selectedColumns.map((item, index) => {
                    return (
                      <DragDropList.DraggableFlex
                        mb={2}
                        itemId={item}
                        key={index}
                        border
                        borderColor="secondary.b"
                        justify="space-between"
                      >
                        <Flex align="center" p={2}>
                          <Icon iconName="more-vert" s="medium" color="grayscale.e" pl={2} />
                          <Icon iconName="more-vert" s="medium" color="grayscale.e" pl={1} />
                          <TextInline pl={3} fontStyle="paragraphs.m">
                            {item}
                          </TextInline>
                        </Flex>

                        <Flex>
                          <IconButton
                            disabled={requiredColumns.includes(item)}
                            color="grayscale.d"
                            iconName="delete"
                            onClick={() => this.deleteColumn(item)}
                          />
                        </Flex>
                      </DragDropList.DraggableFlex>
                    );
                  })}
                </DragDropList.List>
              </DragDropList.Context>
            </Box>
          </Flex>
        </Card.Row>
      </>
    );
  }
}
export default ColumnEditor;
