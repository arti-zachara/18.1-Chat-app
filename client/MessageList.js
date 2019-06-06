import React from "react";
import styles from "./MessageList.css";
// ----- imports ------------------------------

// ----- Message --------------------------------------------
// presentation component - function(props) - render, not render()
const Message = props => (
  <div className={styles.message}>
    <strong> {props.from}: </strong>
    <span>{props.text}</span>
  </div>
);

// ----- MessageList --------------------------------------------
// presentation component - function(props) - render, not render()
const MessageList = props => (
  <div className={styles.messageList}>
    {props.messages.map((message, i) => {
      return <Message key={i} from={message.from} text={message.text} />;
    })}
  </div>
);

export default MessageList;
