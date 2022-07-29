import { ILoginError } from "./ILoginError";

export interface ILoginReturn{
    "data": {
        "customerAccessTokenCreate": {
            "customerUserErrors": Array<ILoginError>;
            "customerAccessToken": {
                "accessToken": string;
                "expiresAt": string;
            }
        }
    }
}