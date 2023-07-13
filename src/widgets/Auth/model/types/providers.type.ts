export type Provider = {
  id: string
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string,
  signinUrlParams?: Record<string, string> | null,
};

export type Providers = Record<string, Provider>;
