import React, { Component } from "react";
import { createBrowserHistory } from "history";
/**
 * Create a context object for the router components that contains an object with two values history and location
 */
const RouterContext = React.createContext();
 /* For Outlet components, we need a context to access the children of Route in element */
const RouteContext = React.createContext();

/**
 * Link component for navigate between routes
 */

const Link = ({to, children, ...props}) => {
  return (
    <RouterContext.Consumer>
      {({history}) => {
        return (
          <a
            href={to}
            onClick = {() => {
              history.push(to)
            }}
            {...props}
          >
          {children}
          </a>
        )
      }}
    </RouterContext.Consumer>
  )
}

/**
 * Route Component
 */

const Route = ({path, element, children}) => {
  return (
    <RouterContext.Consumer>
      {({location}) => {
        return location.pathname.match(path) && <RouteContext.Provider value={{children}}>{element}</RouteContext.Provider>
      }}
    </RouterContext.Consumer>
  )
}

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

/*Outlet Component*/
const Outlet = () => {
  return (
  <RouteContext.Consumer>
    {({children}) => children} 
  </RouteContext.Consumer>
  )
}
export { Link, Navigate, Route, BrowserRouter };
