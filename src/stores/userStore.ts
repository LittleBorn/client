import { BehaviorSubject } from "rxjs";
import { IAccessToken } from "../interfaces/IAccessToken";
import { IUser } from "../interfaces/IUser";

export const user$ = new BehaviorSubject<IUser | undefined>(undefined);
export const accessToken$ = new BehaviorSubject<IAccessToken | undefined>(undefined);

user$.asObservable().subscribe(v => {
    console.log("user$ Observable changed: ", v)
})

accessToken$.asObservable().subscribe(v => {
    console.log("accessToken$ Observable changed: ", v)
})