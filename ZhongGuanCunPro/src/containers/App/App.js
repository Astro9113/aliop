import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Footer from '../../components/Footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles['my-App-app']}>
        <Helmet title="区块链新金融实验室"/>
        <div className={styles.body}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}
