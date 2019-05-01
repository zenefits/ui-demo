interface SubscriptionAppInstall {
  status: number;
  app: SubscriptionAppInstallApp;
  preferences: any;
}

interface SubscriptionAppInstallApp {
  uniqueId: string;
  appUrl: string;
  appIconSqUrl: string;
  status: number;
  role: string;
  shortTitle: string;
  title: string;
  preferences: any;
}

export interface Subscription {
  status: number;
  inheritedStatus: number;
  appInstall: SubscriptionAppInstall;
  preferences: any;
}
