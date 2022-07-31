export interface IRegistrationError{
    "code": string;
    "field": Array<string> | null;
    "message": string;
}