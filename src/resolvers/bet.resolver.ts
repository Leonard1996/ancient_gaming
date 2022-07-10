import { BetService } from "../services/bet.service";
import { UserService } from "../services/user.service";
import { Bet } from "../types/bet.type";

const betService = new BetService();
const userService = new UserService();
export const betResolver = {

    Query: {
        getBetList(): Promise<Bet[]> {
            return betService.getBetList();
        },
        getBet(_root: any, { id }: { id: string }): Promise<Bet> {
            return betService.getBet(id);
        },
        async getBestBetPerUser(_root: any, { limit }: { limit: number }): Promise<Bet[]> {
            const [result, metadata] = await betService.getBestBetPerUser(limit);
            return result;
        }
    },

    Mutation: {
        async createBet(
            _root: any,
            { userId, betAmount, chance }: { userId: string, betAmount: number, chance: number }
        ): Promise<Bet | undefined> {
            const isExisting = await userService.getUser(userId);
            if (!isExisting || isExisting?.balance < betAmount) throw Error('Balance not enough');

            return await betService.createBet(userId, betAmount, chance);
        }
    }

}



