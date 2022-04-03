import React from "react";
import {Link,NavLink} from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
      <div>
        <h1 style={{textAlign:"center",fontSize:"36px",margin:"36px"}} >Something went wrong.</h1>;
        <span>
        Go back to<NavLink activeClassName="nav-link" to='/' >Home page</NavLink>
        </span>
      </div> 
      )
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;