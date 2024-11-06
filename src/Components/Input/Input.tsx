import { ChangeEventHandler } from "react";
import "./Input.css";

type Props = {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

export const Input = (props: Props) => (
  <input
    value={props.value}
    defaultValue={props.defaultValue}
    placeholder={props.placeholder}
    onChange={props.onChange}
    className={"input " + (props.className ?? "")}
  />
);
