import { BehaviorSubject } from "rxjs";
import { IAccessToken } from "../interfaces/IAccessToken";
import { ICustomer } from "../interfaces/ICustomer";
import { IUser } from "../interfaces/IUser";
import { sendApiGetQuery } from "../utils/apiHelper";
import { sendStorefrontQuery } from "../utils/shopifyStorefrontHelper";

export const accessToken$ = new BehaviorSubject<IAccessToken | undefined>(undefined);
export const user$ = new BehaviorSubject<IUser | undefined>(undefined);
export const customer$ = new BehaviorSubject<ICustomer | undefined>(undefined);


accessToken$.asObservable().subscribe(v => {
    console.log("accessToken$ Observable changed: ", v)
})

user$.asObservable().subscribe(v => {
    console.log("user$ Observable changed: ", v)
})

customer$.asObservable().subscribe(v => {
    console.log("customer$ Observable changed: ", v)
})

// fetch user from storefront api when access Token changes
accessToken$.asObservable().subscribe(v => {
    if (typeof v?.accessToken !== "undefined" && typeof v?.expiresAt !== "undefined") {
        var data = JSON.stringify({
            query: `query {
        customer(customerAccessToken: "${v.accessToken}") {
          id
          firstName
          lastName
          acceptsMarketing
          email
          phone
        }
      }`,
            variables: {}
        });
        sendStorefrontQuery<{ data: { customer: IUser } }>(data).then(res => user$.next(res.data.customer))
    }
})

// fetch customer from rest api when user state changes
user$.asObservable().subscribe(v => {
    if(typeof v?.id !== "undefined"){
        sendApiGetQuery<{ id: string }>("/api/auth/getCustomerIdFromAccessToken").then(res => {
            const customerId: any = res.id;
            if(typeof customerId === "string"){
                sendApiGetQuery<ICustomer>(`/api/customer/${customerId}`).then(res1 => {
                    customer$.next(res1);
                })
            }
        })
    }
})