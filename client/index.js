import React, { PropTypes } from 'react';
import ReactDOM from "react-dom";

const propTypes = {};

const defaultProps = {};

class Foo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="foo">
        Bar
      </div>
    );
  }
}

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;

//ReactDOM.render(<Foo />, document.getElementById("index"));