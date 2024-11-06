import Dropdown from "react-bootstrap/Dropdown";
import { PropsWithChildren, useState} from "react";
import "./Dropdown.css";

type Props = PropsWithChildren<{
  initialState: string;
  dropdownItems: string[];
  handleSelect?: () => {};
  className?: string;
}>;


export const CustomDropdown = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<string>(props.initialState);

  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdown-basic">
        {selectedItem}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-basic">
        {props.dropdownItems.map((item, index) => (
          <Dropdown.Item className="dropdown-basic" key={index} onClick={() => setSelectedItem(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}