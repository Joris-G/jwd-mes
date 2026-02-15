import { User } from "./users/user.model";

export interface Pointage{
    id:number,
    user:User,
    temps:number,
    date:Date,
}