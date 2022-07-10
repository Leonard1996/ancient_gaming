import db from "../../models"
import { User } from "../types/user.type";

export class UserService {
    getUserList(): Promise<User[]> {
        return db.User.findAll();
    }
    getUser(id: string): Promise<User> {
        return db.User.findByPk(id)
    }
}