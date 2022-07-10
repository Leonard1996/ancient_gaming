import db from '../../models';
import { users } from '../../seeders/users';
const Op = require('sequelize').Op;

export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function seedUsersTable() {
    return db.User.bulkCreate(users);
}

export async function clearTables() {
    await db.Bet.destroy({
        where: {
            id: { [Op.not]: null }
        }
    });

    await db.User.destroy({
        where: {
            id: { [Op.not]: null }
        }
    });
}