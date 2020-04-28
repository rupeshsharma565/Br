import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from "./../../images/logo.png";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
         <div className="full_div right_content"><figure className="side_logo"><img src={logo} alt="logo" /></figure></div>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
