let delay = 300;

export const getDelay = () => delay;
export const setDelay = (newDelay: number) => {
  delay = newDelay;
};

export const timeoutPromise = (timeout: number = 0) => new Promise(resolve => setTimeout(resolve, timeout));

function addDelayToQueries(queryMap: { [queryName: string]: any }) {
  Object.keys(queryMap).forEach(queryName => {
    const origin = queryMap[queryName];
    queryMap[queryName] = async (...args: any[]) => {
      if (__CLIENT__) {
        console.log(`mocks resolving "${queryName}" with ${getDelay()}ms delay, params:`, args[1]);
      }
      await timeoutPromise(getDelay());
      const result = await origin(...args);
      if (__CLIENT__) {
        // console.log(`mocks resolved "${queryName}", params:`, args[1], 'result:', result);
      }
      return result;
    };
  });
}

export function addDelayToResolvers(resolvers: any, delay?: number) {
  if (delay !== undefined) {
    setDelay(delay);
  }
  const result = { ...resolvers };
  if (result.Query) {
    addDelayToQueries(result.Query);
  }
  if (result.Mutation) {
    addDelayToQueries(result.Mutation);
  }
  return result;
}
