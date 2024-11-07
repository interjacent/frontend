import { useState } from "react";
import "./Dropdown.css";

type Props = {
  initialState: string;
  dropdownItems: string[];
  handleSelect: (item: string) => void;
  className?: string;
};

export const Dropdown = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<string>(props.initialState);
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <div className="dropdown-basic" onClick={() => setOpen((open) => !open)}>
        {selectedItem}
      </div>

      <div className={"dropdown-menu " + (open ? "" : "hidden")}>
        {props.dropdownItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
              setOpen(false);
              props.handleSelect(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
