import { BehaviorSubject } from "rxjs";

export const basket$ = new BehaviorSubject<Array<any>>([]);

basket$.asObservable().subscribe(v => console.log("New Value: ",v))

export const addItemToBasket = (product: any) => {
    basket$.next([...basket$.getValue(), product]);
}

export const removeItemFromBasket = (product: any) => {
    basket$.next(basket$.getValue().filter(i => i !== product));
}

