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


fetch('http://localhost:8080/ping')
  .then(function (resp) {
    resp.text().then(data => {
      console.log(data);
    });
  })
  .catch(function (error) {
    // If there is any error you will catch them here
  });


export default Foo;

//ReactDOM.render(<Foo />, document.getElementById("index"));