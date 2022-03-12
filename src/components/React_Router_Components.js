import React, { Component } from "react";
import { createBrowserHistory } from "history";
/**
 * Create a context object for the router components that contains an object with two values history and location
 */
const RouterContext = React.createContext();

/**
 * Link component for navigate between routes
 */

class Link extends Component {
  static contextType = RouterContext;
  handleClick = (evt) => {
    evt.preventDefault();
    const { history } = this.context;
    const to = evt.target.href;
    history.push(to);
  };
  render() {
    return (
      <a className={this.props.className} href={this.props.to} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

/**
 * Route Component
 */

const Route = ({ path, element }) => {
  return (
    <RouterContext.Consumer>
      {({ location }) => location.pathname.match(path) && element}
    </RouterContext.Consumer>
  );
};

/**
 * Navigate Component
 */
class Navigate extends Component {
  static contextType = RouterContext;
  componentDidMount() {
    const { history } = this.context;
    const { to } = this.props;
    history.push(to);
  }
  render() {
    return null;
  }
}

/**
 * BrowserRouter Component
 */

class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.state = {
      location: window.location,
    };
  }
  componentDidMount() {
    this.history.listen(() => {
      this.setState({
        location: window.location,
      });
    });
  }
  render() {
    return (
      <RouterContext.Provider
        value={{ history: this.history, location: this.state.location }}
      >
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export { Link, Navigate, Route, BrowserRouter };
