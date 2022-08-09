import axios from "axios";
import { accessToken$ } from "../stores/userStore";

export const sendApiGetQuery = <T>(path: string): Promise<T> => {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_SERVER_URL}${path}`,
        headers: {
            'Authorization': `Bearer ${accessToken$.getValue()?.accessToken}`,
            'Content-Type': 'application/json'
        }
    };
    return new Promise<T>((resolve, reject) => {
        axios(config)
            .then(function (response: any) {
                resolve(response.data)
            })
            .catch(function (error: any) {
                reject(error)
            });
    })
}
