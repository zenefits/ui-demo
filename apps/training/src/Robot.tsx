import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import gql from 'graphql-tag';

import { ProfileLayout } from 'z-frontend-layout';
import { Form, FormTextInput } from 'z-frontend-forms';
import { IconButton, Link } from 'z-frontend-elements';
import { Flex, Heading } from 'zbase';
import { Card } from 'z-frontend-composites';

import robotData from './robotData';
// import RobotAvatar from './RobotAvatar';
// import { RobotMutation, RobotQuery } from './gqlTypes';

type RobotPageComponentProps = {
  editMode?: boolean;
};
type RobotPageProps = RouteComponentProps<{ robotId: string }> & RobotPageComponentProps;

class SaveFooter extends Component {
  render() {
    return (
      <Card.Footer>
        <Form.Footer primaryText="Save" cancelShown={false} />
      </Card.Footer>
    );
  }
}

// Part 2 - Exercise 3
/*
<Query<RobotQuery.Query, RobotQuery.Variables> query={TODO}>
  {({ data: { robot } }) => ...}
</Query>
*/

// Part 2 - Exercise 4
/*
<Mutation<RobotMutation.Mutation>
  mutation={TODO}
  refetchQueries={[
    {
      query: robotsQuery,
      variables: {
        id: robot.id,
      },
    },
  ]}
  >
  {robotMutation => {...}}
</Mutation>
*/

class RobotPage extends Component<RobotPageProps> {
  render() {
    const { match, editMode } = this.props;
    const { robotId } = match.params;
    const robot = robotData.find(robot => robot.id === robotId); // later, fetch via graphql
    return (
      <ProfileLayout
        name={robot.name}
        mainRender={() => (
          <Form
            onSubmit={values => {
              alert(JSON.stringify(values));
            }}
            initialValues={{}}
          >
            <Card>
              <Card.Header>
                <Flex justify="space-between" align="center">
                  <Heading level={5}>{editMode ? 'Edit Details' : 'Details'}</Heading>
                  <Link to={editMode ? `/robots/${robot.id}` : `/robots/${robot.id}/edit`}>
                    <IconButton iconName={editMode ? 'close' : 'edit'} s="small" />
                  </Link>
                </Flex>
              </Card.Header>
              <Card.Row>
                <FormTextInput name="name" label="Name" disabled={!editMode} />
              </Card.Row>
              {editMode && <SaveFooter />}
            </Card>
          </Form>
        )}
      />
    );
  }
}

export default RobotPage;
