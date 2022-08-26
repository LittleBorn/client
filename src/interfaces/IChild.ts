export interface IChild{
    _id: string;
    childName: string;
    height: Array<{id: string, value: string; updated_at: string}>;
    weight: Array<{id: string, value: string; updated_at: string}>;
    gender: string;
    birthDate: Date;
    created_at: number;
    updated_at: number;
}