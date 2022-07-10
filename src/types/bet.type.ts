import { User } from "./user.type";

export type Bet = {
    id: number;
    betAmount: number;
    chance: number;
    payout: number;
    win: boolean;
    user?: User;
}