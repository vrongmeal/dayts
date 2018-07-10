import React from "react";
import Calendar from "./calendar";
import GoTo from "./goTo";
import "../styles/main.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Calendar />
        <GoTo />
      </div>
    );
  }
}

export default App;
