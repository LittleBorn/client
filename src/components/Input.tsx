import { useState } from "react";

export type TextFieldTypes =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
;

interface ContainerProps {
    placeholder?: string;
    onChange?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    value?: string | number | readonly string[] | undefined; 
    type?: TextFieldTypes | undefined;
    style?: any;
}

const Input: React.FC<ContainerProps> = ({ placeholder,onKeyDown, onChange, value, type, style }) => {

    return (
        <input className="input-border" onKeyDown={onKeyDown} type={type} onChange={onChange} style={{...style, backgroundColor: "white", border: "none", borderRadius: "5rem", padding: "1rem", width: "80%"}} value={value} placeholder={placeholder}/>
    );
};

export default Input;
