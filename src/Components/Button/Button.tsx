import { MouseEventHandler, PropsWithChildren } from "react";
import "./Button.css";

type Props = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const Button = (props: Props) => (
  <button className="button" onClick={props.onClick}>
    {props.children}
  </button>
);
