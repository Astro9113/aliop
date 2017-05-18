/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component, PropTypes } from 'react';

export default class ExistEvidents extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div >
        {this.props.children}
      </div>
    );
  }
}
