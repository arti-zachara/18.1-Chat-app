import React, { Component } from "react";
import { hot } from "react-hot-loader";
import io from "socket.io-client";
import styles from "./App.css";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import UsersList from "./UsersList";
import UserForm from "./UserForm";
// ------ imports ------------------------

const socket = io("/");

// ------ Class App ------------------------
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], messages: [], text: "", name: "" };
  }

  // ----- listening ------------------------
  componentDidMount() {
    // handle posting message
    socket.on("message", message => this.messageReceive(message));
    // handle update of users list
    socket.on("update", ({ users }) => this.chatUpdate(users));
  }

  // ----- methods -------------------------------
  // ----- receiving:
  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
  }

  chatUpdate(users) {
    this.setState({ users });
  }
  // ----- submitting:
  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
    socket.emit("message", message);
  }

  handleUserSubmit(name) {
    this.setState({ name });
    socket.emit("join", name);
  }

  // ----- render ------------------------
  render() {
    // if name is given -> layout, if not -> userform
    return this.state.name !== "" ? this.renderLayout() : this.renderUserForm();
  }
  // render layout (name not '')
  renderLayout() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <div className={styles.appTitle}>ChatApp</div>
          <div className={styles.appRoom}>App room</div>
        </div>
        <div className={styles.appBody}>
          <UsersList users={this.state.users} />
          <div className={styles.messageWrapper}>
            <MessageList messages={this.state.messages} />
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </div>
        </div>
      </div>
    );
  }

  renderUserForm() {
    return <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />;
  }
}

export default hot(module)(App);
