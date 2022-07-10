import { UserService } from '../services/user.service';
import { User } from '../types/user.type';

const userService = new UserService();
export const userResolver = {

    Query: {
        async getUserList(): Promise<User[]> {
            return await userService.getUserList();
        },
        async getUser(_root: any, { id }: { id: string }): Promise<User> {
            return await userService.getUser(id);
        }
    }

}



