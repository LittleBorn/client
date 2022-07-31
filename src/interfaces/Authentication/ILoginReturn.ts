import { IAccessToken } from "../IAccessToken";
import { ILoginError } from "./ILoginError";

export interface ILoginReturn{
    "data": {
        "customerAccessTokenCreate": {
            "customerUserErrors": Array<ILoginError>;
            "customerAccessToken": IAccessToken;
        }
    }
}