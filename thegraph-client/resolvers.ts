import { Resolvers, MeshContext } from "./.graphclient";

export const resolvers: Resolvers = {
  Query: {
    cross_storageDatas: (root: any, args: any, context: any, info: any) => {
      console.log("cross_storageDatas", root, args, context, info);
      return [];
    },
  },
};
