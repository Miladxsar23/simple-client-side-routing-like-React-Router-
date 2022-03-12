import React, {Component} from "react";
import "./App.css";
import {
  Link,
  BrowserRouter,
  Navigate,
  Route,
} from "./components/React_Router_Components";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-header">
          <h1>what Body of water</h1>
          <Link className="Link" to="/atlantic">/atlantic</Link>
          <br />
          <Link className="Link" to="/pasific">/posific</Link>
          <br />
          <Link className="Link" to="/black-sea">/black-sea</Link>
          <br />
        </div>
        <div className="App-body">
          <Route path="/atlantic" element={<Atlantic />} />
          <Route path="/pasific" element={<Pacific />} />
          <Route path="/black-sea" element={<BlackSea />} />
        </div>
      </div>
    </BrowserRouter>
  );
};

const Atlantic = (props) => {
  return (
    <div>
      <h3>Atlantic ocean</h3>
      <p>
        The Atlantic Ocean covers approximately 1/5th of the surface of the
        earth.
      </p>
    </div>
  );
};

const Pacific = (props) => {
  return (
    <div>
      <h3>Pacific ocean</h3>
      <p>
        Ferdinand Magellan, a Portuguese explorer, named the ocean 'mar
        pacifico' in 1521, which means peaceful sea.
      </p>
    </div>
  );
};
class BlackSea extends Component {
  state = {
    counter: 3,
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        return {
          counter: --prevState.counter,
        };
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="Black_sea">
        {this.state.counter > 0 ? this.state.counter : <Navigate to="/" />}
      </div>
    );
  }
}

export default App;
