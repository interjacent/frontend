import { ChangeEventHandler, MouseEventHandler } from "react";
import "./Input.css";

type Props = {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  className?: string;
  readOnly?: boolean;
};

export const Input = (props: Props) => (
  <input
    value={props.value}
    defaultValue={props.defaultValue}
    placeholder={props.placeholder}
    onChange={props.onChange}
    onClick={props.onClick}
    className={"input " + (props.className ?? "")}
    readOnly={props.readOnly}
  />
);
