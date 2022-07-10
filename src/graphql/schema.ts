const { gql } = require('apollo-server');

export const typeDefs = gql`
  type User {
  id: String!
  name: String!
  balance: String!
 }

  type Bet {
    id: Int!
    betAmount: Float!
    chance: Float!
    payout: Float!
    win: Boolean!
    user: User!
 }

 type LazyBet {
    id: Int!
    betAmount: Float!
    chance: Float!
    payout: Float!
    win: Boolean!
 }

  type Query {
  getUserList: [User!]!
  getUser(id: String!): User!
  getBetList: [Bet!]!
  getBet(id: Int!): Bet!
  getBestBetPerUser(limit: Int): [LazyBet!]
 }

 type Mutation {
    createBet(userId: String, betAmount: Float, chance: Float): LazyBet!
}
`;

