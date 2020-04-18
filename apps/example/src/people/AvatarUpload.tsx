import React, { Component, FunctionComponent } from 'react';
import gql from 'graphql-tag';

import { DialogManager, ProfileLayout } from 'z-frontend-layout';
import { Query } from 'z-frontend-network';
import { Avatar } from 'z-frontend-composites';
import { ImageUploadModal } from 'z-frontend-forms';

import { EmployeeQuery } from '../gqlTypes';
import AvatarButton from './AvatarButton';

const AvatarRender: FunctionComponent<{ employee: EmployeeQuery.Employee }> = ({ employee }) => (
  <DialogManager
    render={({ open, close, controlEl, isVisible }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Upload Photo',
        onCancel: close,
      };

      return (
        <>
          <ImageUploadModal
            fileUploadProps={{
              // NOTE: fileCategory should probably be employee_profile_photo but that errors:
              // "Only console users should create world-readable files."
              category: 'uncategorized',
              employeeId: employee.id,
            }}
            onSave={cropped => {
              close();
              alert('todo: save cropped');
              // console.log({ cropped });
            }}
            onDeleteExisting={() => {
              close();
              alert('todo: delete existing photo');
            }}
            modalProps={modalProps}
          />
          <AvatarButton onClick={open}>
            <Avatar
              firstName={employee.preferredOrFirstName}
              lastName={employee.last_name}
              photoUrl={employee.photoUrl}
              s="xxxlarge"
              tooltipBody=""
              w={1}
            />
          </AvatarButton>
        </>
      );
    }}
  />
);

export default class AvatarUpload extends Component<{}> {
  render() {
    return (
      <Query<EmployeeQuery.Query> query={employeeQuery}>
        {({ data, loading }) => {
          const { employee } = data.dashboard;
          return (
            <ProfileLayout
              name={employee.preferredOrFirstName}
              avatarRender={() => <AvatarRender employee={employee} />}
              mainRender={() => <div>This is a demo page for avatar images.</div>}
            />
          );
        }}
      </Query>
    );
  }
}

const employeeQuery = gql`
  query EmployeeQuery {
    dashboard {
      id
      employee {
        id
        preferredOrFirstName
        last_name
        photoUrl
      }
    }
  }
`;
