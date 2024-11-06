import { MouseEventHandler, PropsWithChildren } from "react";
import "./Button.css";

type Props = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}>;

export const Button = (props: Props) => (
  <button
    className={"button " + (props.className ?? "")}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
