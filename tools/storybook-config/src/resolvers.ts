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
      dashboard() {
        return {};
      },
      dynamicFlow() {
        return flowFragmentData['112'];
      },
      flowWithMatchingNames() {
        return flowFragmentData['113'];
      },
    },
    Mutation: {
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
