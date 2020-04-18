import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';

import { Heading } from 'zbase';
import { Form, FormCheckboxGroup, FormRadio, FormRadioGroup, FormSimpleSelect, FormTextInput } from 'z-frontend-forms';
import { Card } from 'z-frontend-composites';
import { PageLayout } from 'z-frontend-layout';
import { Query } from 'z-frontend-network';

import {
  createMockedObject,
  getMockedObject,
  objectOriginOptions,
  objectSizeOptions,
  ObjectType,
} from '../../../mockedBackend';
import { ObjectQuery } from '../../../gqlTypes';

const categoryOptions = [
  { id: '1', label: 'Navigation' },
  { id: '2', label: 'Textiles' },
  { id: '3', label: 'Food' },
];

interface MatchProps {
  objectId: string;
}

type AddObjectPageProps = RouteComponentProps<MatchProps> & {};

function getInitialValues(data: ObjectQuery.Query, objectId: string): ObjectType {
  // in real app, would use data (from Query) but here we fake it
  const object = objectId && getMockedObject(objectId);
  return {
    id: object ? object.id : null,
    created: object ? object.created : null,
    name: object ? object.name : '',
    size: object ? object.size : null,
    origin: object ? object.origin : [],
    category: object ? object.category : '',
  };
}

class AddObjectPage extends Component<AddObjectPageProps> {
  render() {
    const { objectId } = this.props.match.params;
    const { history } = this.props;
    const isNew = !objectId;
    return (
      <Query<ObjectQuery.Query, ObjectQuery.Variables> query={objectQuery} /* variables={{ objectId }} */ skip={isNew}>
        {({ data }) => {
          const initialValues = getInitialValues(data, objectId);
          return (
            <PageLayout mode="fixed" columns="2-8-2">
              <PageLayout.Nav />
              <PageLayout.Main>
                <Form<ObjectType>
                  // debug
                  initialValues={initialValues}
                  validationSchema={{
                    name: Form.Yup.string().required('Required'),
                  }}
                  onSubmit={values => {
                    // typically fire a Mutation here
                    // just simulating a response for now
                    return new Promise(resolve => {
                      setTimeout(() => {
                        if (isNew) {
                          createMockedObject(values);
                          history.push('/objects');
                        }
                        resolve(true);
                      }, 2000);
                    });
                  }}
                >
                  {props => (
                    <Card>
                      <Card.Header>
                        <Heading level={5} data-testid="PageHeading">
                          {isNew ? 'Create a New Object' : 'Edit Object'}
                        </Heading>
                      </Card.Header>
                      <Card.Row>
                        <FormTextInput name="name" label="Name" />
                        <FormRadioGroup name="size" label="Size">
                          {objectSizeOptions.map(option => (
                            <FormRadio key={option} value={option} label={option} />
                          ))}
                        </FormRadioGroup>
                        <FormCheckboxGroup name="origin" label="Origin">
                          {({ Checkbox }) =>
                            objectOriginOptions.map(option => <Checkbox key={option} name={option} label={option} />)
                          }
                        </FormCheckboxGroup>
                        <FormSimpleSelect<string> name="category" label="Category">
                          {({ SelectOption }) =>
                            categoryOptions.map(option => (
                              <SelectOption key={option.id} option={option.label}>
                                {option.label}
                              </SelectOption>
                            ))
                          }
                        </FormSimpleSelect>
                      </Card.Row>
                      <Card.Footer>
                        <Form.Footer primaryText="Save" cancelOnClick={() => history.push('/objects')} />
                      </Card.Footer>
                    </Card>
                  )}
                </Form>
              </PageLayout.Main>
            </PageLayout>
          );
        }}
      </Query>
    );
  }
}

const objectQuery = gql`
  query ObjectQuery {
    # this is what the query could look like
    #
    # object(objectId: $objectId) {
    #   id
    #   name
    # }

    # dashboard query here just a placeholder
    dashboard {
      id
      employee {
        id
      }
    }
  }
`;

export default AddObjectPage;
