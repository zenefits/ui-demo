export namespace LoginUserMutation {
  export type Variables = LoginFormValues;
  export type Mutation = {
    loginUser?: { id: string; createdAt: any };
  };
}
