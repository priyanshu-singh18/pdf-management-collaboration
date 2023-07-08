import React from "react";
import "./ListItem.css";

export default function ListItem(props) {
  const handleClick = () => {
    // console.log(props.key);
    props.clickedItem(props.file_id);
  };

  return (
    <li className="list-item-container" onClick={handleClick}>
      <span>{props.serial}</span>
      <span>{props.name}</span>
      <span>{props.uploaded_by}</span>
      <span>{props.uploaded_at}</span>
    </li>
  );
}
