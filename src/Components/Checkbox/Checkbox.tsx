import { ChangeEventHandler } from "react";
import "./Checkbox.css";

type Props = {
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const Checkbox = (props: Props) => (
  <input
    type="checkbox"
    className={"checkbox " + (props.className ?? "")}
    checked={props.checked}
    defaultChecked={props.defaultChecked}
    onChange={props.onChange}
  />
);
