import { addDelayToResolvers } from 'z-frontend-app-bootstrap';

// http://dev.apollodata.com/tools/graphql-tools/mocking.html#Using-MockList-in-resolvers

const flowFragmentData: { [id: string]: any } = {
  '111': {
    dispatcherArgs: '',
    id: '111',
    isActive: true,
    isComplete: false,
    resource_uri: 'sdfs',
    version_id: 22,
    sections: [
      {
        dispatcherArgs: '',
        errors: [] as any[],
        id: '444',
        index: 0,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: true,
        name: 'my_flow.user.info',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '445',
        index: 1,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.user.address',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '446',
        index: 2,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.car.brand',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '447',
        index: 3,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.car.model',
        resource_uri: 'sdfsd',
      },
    ],
  },

  '112': {
    dispatcherArgs: '',
    id: '112',
    isActive: true,
    isComplete: false,
    resource_uri: 'sdfs',
    version_id: 22,
    sections: [
      {
        dispatcherArgs: '',
        errors: [] as any[],
        id: '448',
        index: 0,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: true,
        name: 'my_flow.user.info',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '449',
        index: 2,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.user.address',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '450',
        index: 3,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.car.brand',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '451',
        index: 4,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.car.model',
        resource_uri: 'sdfsd',
      },
    ],
  },

  '113': {
    dispatcherArgs: '',
    id: '113',
    isActive: true,
    isComplete: false,
    resource_uri: 'sdfs',
    version_id: 22,
    sections: [
      {
        dispatcherArgs: '1',
        errors: [] as any[],
        id: '548',
        index: 0,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: true,
        name: 'my_flow.user.info',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '549',
        index: 2,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.user.address',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '550',
        index: 3,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.car.brand',
        resource_uri: 'sdfsd',
      },
      {
        dispatcherArgs: null,
        errors: [],
        id: '551',
        index: 4,
        isActive: true,
        isComplete: false,
        isEntered: false,
        isReady: false,
        name: 'my_flow.car.model',
        resource_uri: 'sdfsd',
      },
    ],
  },
};

export const resolvers = addDelayToResolvers(
  {
    Query: {
      enrollmentFlow() {
        return flowFragmentData['111'];
      },
      flow(root: any, { id }: { id: string }) {
        return flowFragmentData[id];
      },
      dynamicFlow() {
        return flowFragmentData['112'];
      },
      flowWithMatchingNames() {
        return flowFragmentData['113'];
      },
      datagrid() {
        return {
          id: '5',
          __typename: 'Datagrid',
          rows: [
            {
              id: '1',
              data: {
                first_name: 'Johnny',
                last_name: 'Canuck',
                email: 'jcanuck@zenefits.com',
                age: 31,
              },
              errors: () => ({}),
            },
            {
              id: '2',
              data: {
                first_name: '',
                last_name: '',
              },
              errors: () => ({}),
            },
          ],
          // Note that server side logic needs to be simulated in the row save resolver
          columnConfiguration: [
            {
              id: 'first_name',
              label: 'First name',
              __typename: 'DatagridRow',
              type: 'string',
              validations: [
                {
                  key: 'firstName_required',
                  type: 'required',
                  message: 'First name is required.',
                  meta: {},
                },
              ],
            },
            {
              id: 'last_name',
              label: 'Last name',
              __typename: 'DatagridRow',
              type: 'string',
              validations: [
                {
                  key: 'last_required',
                  type: 'required',
                  message: 'Last name is required.',
                  meta: {},
                },
              ],
            },
            {
              id: 'email',
              label: 'Email',
              type: 'email',
              __typename: 'DatagridRow',
              validations: [
                {
                  key: 'email_required',
                  type: 'required',
                  message: 'Email is required.',
                  meta: {},
                },
                {
                  key: 'email_regex_default',
                  type: 'regex',
                  message: 'Email address must have a valid format.',
                  meta: {
                    pattern: '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)',
                  },
                },
                {
                  key: 'email_zenefits',
                  type: 'custom',
                  message: 'Email must have a zenefits domain',
                },
              ],
            },
            {
              id: 'age',
              __typename: 'DatagridRow',
              label: 'Age',
              type: 'integer',
              validations: [
                {
                  key: 'age_valueRange',
                  type: 'valueRange',
                  message: 'Age must be between 0 and 99.',
                  meta: {
                    max: 99,
                    min: 0,
                  },
                },
              ],
            },
          ],
        };
      },
    },
    Mutation: {
      saveDatagridRows(root: any, { rows }: any) {
        return rows.map((row: any) => {
          // It's unfortunate that we have to do this but Datagrid will update errors with server returned errors
          const errors: { [key: string]: any[] } = {};

          if (!row.data.first_name) {
            errors.first_name = [{ key: 'first_required', message: 'First name is required.' }];
          }
          if (!row.data.last_name) {
            errors.first_name = [{ key: 'last_required', message: 'Last name is required.' }];
          }

          errors.email = [];
          if (!row.data.email) {
            errors.email.push({ key: 'email_required', message: 'Email is required.' });
          }
          if (row.data.email && !row.data.email.match(/(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/)) {
            errors.email.push({ key: 'email_regex_default', message: 'Email address must have a valid format.' });
          }

          if (row.data.email && !row.data.email.includes('@zenefits.com')) {
            errors.email.push({ key: 'email_zenefits', message: 'Email must be in the Zenefits domain.' });
          }
          return {
            __typename: 'DatagridRow',
            ...row,
            errors,
          };
        });
      },
      addFamilyStep(root: any, { familySize }: { familySize: number }) {
        flowFragmentData['113'].sections.push({
          dispatcherArgs: familySize,
          errors: [] as any[],
          id: '600',
          index: 1,
          isActive: true,
          isComplete: false,
          isEntered: false,
          isReady: true,
          name: 'my_flow.user.family',
          resource_uri: 'sdfsd',
        });
        return true;
      },

      updateFlowSection(
        root: any,
        {
          flowSectionId,
          flowSectionUpdate: { isEntered, isComplete },
        }: { flowSectionId: string; flowSectionUpdate: { isEntered: boolean; isComplete: boolean } },
      ) {
        const section =
          Object.keys(flowFragmentData)
            .reduce((acc, key) => acc.concat(flowFragmentData[key].sections), [])
            .find((sec: any) => sec.id === flowSectionId) || ({} as any);

        // console.log('updateFlowSection', { flowSectionId, isEntered, isComplete, name: section.name });
        if (isEntered !== undefined) {
          section.isEntered = isEntered;
        }
        if (isComplete !== undefined) {
          section.isComplete = isComplete;
          section.isEntered = true;
        }

        const flowId = Object.keys(flowFragmentData).find(flowId =>
          flowFragmentData[flowId].sections.find((sec: any) => sec.id === section.id),
        ) as string;
        const flowObject = flowFragmentData[flowId];
        const nextSection = flowObject.sections.find((sec: any) => sec.index > section.index);
        if (nextSection) {
          nextSection.isReady = true;
        }

        // console.table(
        //   flowObject.sections.map(s => ({
        //     name: s.name,
        //     isEntered: s.isEntered,
        //     isComplete: s.isComplete,
        //     isReady: s.isReady,
        //   })),
        // );

        // example dynamic flow model change (adding extr step)
        if (flowId === '112' && section.name === 'my_flow.user.info' && isComplete) {
          flowFragmentData[flowId].sections.push({
            dispatcherArgs: '',
            errors: [] as any[],
            id: '455',
            index: 1,
            isActive: true,
            isComplete: false,
            isEntered: false,
            isReady: true,
            name: 'my_flow.user.extra',
            resource_uri: 'sdfsd',
          });
        }

        if (flowId === '113' && section.name === 'my_flow.user.info' && section.dispatcherArgs === '1' && isComplete) {
          flowFragmentData[flowId].sections.push({
            ...section,
            dispatcherArgs: '2',
            id: '552',
            isComplete: false,
            isEntered: false,
            index: 1,
          });
        }

        return section;
      },
    },
  },
  300,
);
