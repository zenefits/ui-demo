import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Heading } from 'zbase';
import { Form } from 'z-frontend-forms';
import { Card } from 'z-frontend-composites';
import { PageLayout } from 'z-frontend-layout';

const checkboxGroupOptions = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];

const radioGroupOptions = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];

const selectOptions = [
  { id: '1', label: 'Widget' },
  { id: '2', label: 'Doodad' },
  { id: '3', label: 'Contraption' },
  { id: '4', label: 'Gimmick' },
];

interface MatchProps {
  widgetId: string;
}

type Props = RouteComponentProps<MatchProps> & {};

type AddWidgetFormValues = {
  widgetName: string;
  widgetChoice: string;
};

class AddWidgetPage extends Component<Props> {
  render() {
    // const { widgetId } = this.props.match.params;
    return (
      <PageLayout mode="fixed" columns="2-8-2">
        <PageLayout.Nav />
        <PageLayout.Main>
          <Form<AddWidgetFormValues>
            initialValues={{
              widgetName: '',
              widgetChoice: '1',
            }}
            validationSchema={{
              widgetName: Form.Yup.string().required('Required'),
            }}
            onSubmit={() => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true);
                }, 2000); // simulate network
              });
            }}
          >
            {props => (
              <Card>
                <Card.Header>
                  <Heading level={5}>Create Widget</Heading>
                </Card.Header>
                <Card.Row>
                  <Form.TextInput name="widgetName" label="Text Field" />
                  <Form.RadioGroup name="widgetChoice" label="Radio Button Group">
                    {radioGroupOptions.map(option => (
                      <Form.Radio key={option.id} value={option.id} label={option.label} />
                    ))}
                  </Form.RadioGroup>
                  <Form.CheckboxGroup label="Checkbox Group">
                    {({ Checkbox }) =>
                      checkboxGroupOptions.map(option => (
                        <Checkbox key={option.id} name={option.id} label={option.label} />
                      ))
                    }
                  </Form.CheckboxGroup>
                  <Form.Select<{ id: string; label: string }>
                    name="widgetType"
                    label="Select"
                    getOptionText={o => o.label}
                  >
                    {({ SelectOption, basicOptionFilter }) =>
                      basicOptionFilter(selectOptions).map(option => <SelectOption key={option.id} option={option} />)
                    }
                  </Form.Select>
                </Card.Row>
                <Card.Footer>
                  <Form.Footer primaryText="Save" cancelOnClick={() => this.props.history.push(`/overview`)} />
                </Card.Footer>
              </Card>
            )}
          </Form>
        </PageLayout.Main>
      </PageLayout>
    );
  }
}

export default AddWidgetPage;
