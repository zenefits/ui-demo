import React from 'react';

import { Table } from 'z-frontend-tables';
import { Box, Icon } from 'zbase';
import { Link } from 'z-frontend-elements';

class IconGuide extends React.Component {
  render() {
    return (
      <Box width={700} my={4}>
        <Table columnWidths={[1 / 12, 3 / 12, 4 / 12, 4 / 12]}>
          <Table.Header>
            <Box>Icon</Box>
            <Box>Name</Box>
            <Box>Usage</Box>
            <Box>Example</Box>
          </Table.Header>
          <Table.Row>
            <Box>
              <Icon iconName="alert-circle" />
            </Box>
            <Box>alert-circle</Box>
            <Box>Error or warning</Box>
            <Box>Banner</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="block" />
            </Box>
            <Box>block</Box>
            <Box>Not allowed or do not have permission. Opposite: check.</Box>
            <Box>Deny PTO request</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="check" />
            </Box>
            <Box>check</Box>
            <Box>Save, submit, or confirm</Box>
            <Box>
              Approve PTO request, <Link href="#!/Form.Checkbox">Form.Checkbox</Link>
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="check-circle" />
            </Box>
            <Box>check-circle</Box>
            <Box>Status: successful. Never for standard buttons.</Box>
            <Box>Success message after review created</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="caret-up" />
              <br />
              <Icon iconName="caret-down" />
            </Box>
            <Box>
              caret-up
              <br />
              caret-down
            </Box>
            <Box>Sort or reverse sort</Box>
            <Box>
              <Link href="#!/Table.SortableHeaderCell">SortableHeaderCell</Link>
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="chevron-up" />
              <br />
              <Icon iconName="chevron-down" />
              <br />
              <Icon iconName="chevron-left" />
              <br />
              <Icon iconName="chevron-right" />
            </Box>
            <Box>
              chevron-up
              <br />
              chevron-down
              <br />
              chevron-left
              <br />
              chevron-right
            </Box>
            <Box>Navigate, paginate, or expand</Box>
            <Box>
              Back links, collapsible containers, <Link href="#!/Form.TimeInput">Form.TimeInput</Link>
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="close" />
            </Box>
            <Box>close</Box>
            <Box>Close (a modal) or cancel (an inline action) or dismiss (a notification). Never for delete.</Box>
            <Box>
              <Link href="#!/ConfirmationModal">ConfirmationModal</Link>
              <br />
              <Link href="#!/NotificationManager">NotificationManager</Link>
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="close-circle" />
            </Box>
            <Box>close-circle</Box>
            <Box>Status: unsuccessful. Never for standard buttons.</Box>
            <Box>Terminated benefits status</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="cloud-upload" />
            </Box>
            <Box>cloud-upload</Box>
            <Box>Upload</Box>
            <Box>
              <Link href="#!/FileUploader">FileUploader</Link>
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="delete" />
            </Box>
            <Box>delete</Box>
            <Box>Delete or remove</Box>
            <Box>
              Delete row, file, attachment, or upload (<Link href="#!/FileUploader">FileUploader</Link>)
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="download" />
            </Box>
            <Box>download</Box>
            <Box>Download or export</Box>
            <Box>Download attachment, form, or chart</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="edit" />
            </Box>
            <Box>edit</Box>
            <Box>Edit or update</Box>
            <Box>Card header with an edit mode</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="eye" />
            </Box>
            <Box>eye</Box>
            <Box>Preview or view</Box>
            <Box>Preview a report template</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="help-outline" />
            </Box>
            <Box>help-outline</Box>
            <Box>Help text</Box>
            <Box>
              <Link href="#!/Tooltip">Tooltip</Link>
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="long-arrow-up" />
              <br />
              <Icon iconName="long-arrow-down" />
            </Box>
            <Box>
              long-arrow-up
              <br />
              long-arrow-down
            </Box>
            <Box>Order or re-arrange</Box>
            <Box>Setting question order within a review</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="more-vert" />
            </Box>
            <Box>more-vert</Box>
            <Box>Indicate multiple actions (with limited screen real-estate). Never use horizontal version (more).</Box>
            <Box>
              <Link href="#!/ButtonDropdown">ButtonDropdown</Link>
            </Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="plus-circle" />
            </Box>
            <Box>plus-circle</Box>
            <Box>Create or add new. Never for standard buttons.</Box>
            <Box>Add dependent link</Box>
          </Table.Row>
          <Table.Row>
            <Box>
              <Icon iconName="search" />
            </Box>
            <Box>search</Box>
            <Box>Search or filter</Box>
            <Box>
              <Link href="#!/Form.SearchSelect">Form.SearchSelect</Link>
            </Box>
          </Table.Row>
        </Table>
      </Box>
    );
  }
}

export default IconGuide;
