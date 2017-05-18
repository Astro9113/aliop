/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import * as authActions from '../../redux/modules/auth';
import { connect } from 'react-redux';


@connect(
  state => ({
    user: state.auth.user
  }),
  authActions)
export default class NewPro extends Component {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.object
  };

  render() {
    const { user} = this.props;
    return (
      <div >
        <Helmet title="存证"/>
        <div className="center-block" style={{margin: '0 auto', marginTop: '100px', width: '1200px'}}>
          <Nav navbar pullLeft>
            {user &&
            <LinkContainer to="/new">
              <NavItem eventKey={1}><strong className="text-primary">本地文件</strong></NavItem>
            </LinkContainer>}
            {user &&
            <LinkContainer to="/new/remote">
              <NavItem eventKey={1}><strong className="text-primary">远程文件</strong></NavItem>
            </LinkContainer>}
            {user &&
            <LinkContainer to="/new/upload">
              <NavItem eventKey={3} ><strong className="text-primary">文件存证并存储</strong></NavItem>
            </LinkContainer>}
            {user &&
            <LinkContainer to="/new/text">
              <NavItem eventKey={6} ><strong className="text-primary">文本</strong></NavItem>
            </LinkContainer>}
          </Nav>
        </div>
        {this.props.children}
      </div>
    );
  }
}
