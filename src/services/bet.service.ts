import db from "../../models"
import { Bet } from "../types/bet.type";
import { randomIntFromInterval } from "../utils/helpers";

export class BetService {
    getBetList(): Promise<Bet[]> {
        return db.Bet.findAll({
            include: [{
                model: db.User,
                required: true,
                as: "user"
            }]
        });
    }

    getBet(id: string): Promise<Bet> {
        return db.Bet.findOne({
            where: { id },
            include: [{
                model: db.User,
                required: true,
                as: "user"
            }]
        })
    }

    async createBet(userId: string, betAmount: number, chance: number) {
        const payout = (1 / chance) * betAmount; // chance in interval (0...1)
        const result = randomIntFromInterval(0, 100);
        const win = chance * 100 >= result ? true : false;
        const balanceDifference = win ? payout : -betAmount;

        const transaction = await db.sequelize.transaction();

        try {
            await db.User.update({
                balance: db.sequelize.literal(`balance + ${balanceDifference}`)
            }, {
                where: { id: userId }
            }, { transaction });


            const bet = await db.Bet.create({
                betAmount,
                chance,
                payout,
                win,
                userId
            }, { transaction });

            await transaction.commit();

            return bet;
        } catch (error) {
            await transaction.rollback()
        }
    }

    getBestBetPerUser(limit: number) {
        return db.sequelize.query(
            `select any_value(id) as id, any_value(payout) as payout, any_value(betAmount) as betAmount,
            any_value(chance) as chance, any_value(win) as win,
            Max(payout-betAmount) as profit, userId from Bets
            where win = 1
            group by userId
            limit ${limit}`
        );
    }
}