import { randomIntFromInterval } from "../src/utils/helpers";

const crypto = require('crypto');

const mockedUsers = new Array(3).fill({});


export const users = mockedUsers.map((_user, index) => ({
    id: crypto.randomUUID(),
    name: `user${index}`,
    balance: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
}))