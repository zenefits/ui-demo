export type ConnectionInterface = {
  rtt?: number;
  type?: string;
  addEventListener?: (event: string, callback: (e: ConnectionChangeEvent) => void) => void;
  removeEventListener?: (event: string, callback: (e: ConnectionChangeEvent) => void) => void;
};

type ConnectionChangeEvent = {
  target?: ConnectionInterface;
  srcElement?: ConnectionInterface;
};

export type NavigatorInterface = Partial<Navigator> & {
  connection?: ConnectionInterface;
  mozConnection?: ConnectionInterface;
  webkitConnection?: ConnectionInterface;
};
