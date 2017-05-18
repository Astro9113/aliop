import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    // const styles = require('./Footer.scss');

    return (
        <p className="container" style={{textAlign: 'center', color: '#cccccc'}}>@本平台区块链及相关技术由网录科技提供</p>
    );
  }
}

// <footer className={styles.fisrtPart}>
//  <div className={styles.wrapper} style={{paddingBottom: '0'}}>
//    <p>备案号 京6011119888</p>
//  </div>
// </footer>
