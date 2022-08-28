import { BehaviorSubject } from "rxjs";

export const cart$ = new BehaviorSubject<string | undefined>(undefined);

cart$.asObservable().subscribe(v => console.log("New Value: ",v))


/* Card Mutations */
const cartCreate = () => {
    
}