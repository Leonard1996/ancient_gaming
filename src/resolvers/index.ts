import { betResolver } from "./bet.resolver";
import { userResolver } from "./user.resolver";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...betResolver.Query
    },
    Mutation: {
        ...betResolver.Mutation,
    },
}