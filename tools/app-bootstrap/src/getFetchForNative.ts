import { ApolloClientOptions, NetworkInterfaceInitParamsFetch } from './createApolloClient';

type GetDemoResponse = (operationName: string, vairables?: Object) => Object;

export type ExtraApolloOptions = {
  isDemoMode?: () => Promise<boolean>;
  getDemoResponse?: GetDemoResponse;
};

let requestCounter = 0;

// fetch wrapper with extra logging and Demo mode support
export default function getFetchForNative(
  params: ApolloClientOptions & ExtraApolloOptions & NetworkInterfaceInitParamsFetch,
) {
  return async function fetchWithDemo(url: RequestInfo, options: RequestInit): Promise<Response> {
    requestCounter += 1;
    const requestNumber = requestCounter;

    const logFn = __NATIVE__ ? (global as any).log : console.log.bind(console);

    if (__DEVELOPMENT__) {
      logFn(
        `==== fetch #${requestNumber} ===>> `,
        // ((JSON.parse(options.body) || []) as any[]).map(r => r.operationName).join(', '),
        JSON.parse((options as any).body),
        // options.headers,
      );
    }

    if (typeof params.isDemoMode === 'function' && typeof params.getDemoResponse === 'function') {
      const isDemoMode = await params.isDemoMode();

      if (isDemoMode) {
        const body = JSON.parse((options as any).body);

        const demoResponses = await Promise.all(
          (body || [body]).map((b: any) => (params.getDemoResponse as GetDemoResponse)(b.operationName, b.variables)),
        );

        if (__DEVELOPMENT__) {
          logFn(
            `<<== fetch #${requestNumber} DEMO RESPONSE == `,
            body.map((r: any) => r.operationName).join(', '),
            demoResponses,
          );
        }

        if (demoResponses[0] !== undefined) {
          return new Promise<Response>(res => {
            setTimeout(() => {
              res({
                ok: true,
                status: 200,
                statusText: 'OK',
                type: 'application/json',
                text() {
                  return new Promise(resolveText => {
                    resolveText(JSON.stringify(Array.isArray(body) ? demoResponses : demoResponses[0]));
                  });
                },
              } as any);
            }, 400);
          });
        }
      }
    }

    let result = params.fetch(url, options);

    if (__DEVELOPMENT__) {
      result = result.then(r => {
        try {
          r.clone()
            .json()
            .then(
              (jsonData: any) => {
                logFn(`<<== fetch #${requestNumber} ==== `, jsonData);
              },
              (e: Error) => {
                logFn(`<<== fetch #${requestNumber} ERROR ==== `, e);
              },
            );
        } catch (e) {
          // do nothing
        }

        return r;
      });
    }

    return result;
  };
}
