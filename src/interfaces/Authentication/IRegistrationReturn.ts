import { IRegistrationError } from "./IRegistrationError";

export interface IRegistrationReturn{
    "data": {
        "customerCreate": {
            "customerUserErrors": Array<IRegistrationError>;
            "customer": {
                "id": string;
            }
        }
    }
}