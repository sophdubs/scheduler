import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let itemClass = "interviewers__item";

  return (
    <li onClick={props.setInterviewer} className={props.selected ? itemClass + '--selected' : itemClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}



