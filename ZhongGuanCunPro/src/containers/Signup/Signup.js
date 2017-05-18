import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Helmet from 'react-helmet';
// import { Link } from 'react-router';
import { signup, selectType } from '../../redux/modules/auth';

class Signup extends Component {
  static propTypes = {
    signup: React.PropTypes.func,
    singupType: React.PropTypes.string,
    selectType: React.PropTypes.func,
  };

  onClick(event) {
    const type = event.target.name;
    this.props.selectType(type);
  }

  render() {
    const { singupType } = this.props;
    const style = require('./Signup.scss');
    return (
      <div className={style['signup-container'] + ' container'}>
        <div className={style['signup-button']}>
          <button name="PERSON" onClick={this.onClick.bind(this)}>个人注册</button>
          <button name="CORP" onClick={this.onClick.bind(this)}>企业会员注册</button>
          <div className={style['signup-type']}>
            { singupType === 'PERSON' &&
            <h2>个人注册:</h2>
            }
            { singupType === 'CORP' &&
            <h2>企业会员注册:</h2>
            }
            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">邮箱注册:{' '}</label><br/>
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword3" className="col-sm-2 control-label">密码:{' '}</label>
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword3" className="col-sm-2 control-label">密码确认:{' '}</label>
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password Second" />
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">注册</button>
                </div>
              </div>
            </form>
          </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singupType: state.auth.singupType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user, pwd) => {
      dispatch(signup(user, pwd));
    },
    selectType: (type) => {
      dispatch(selectType(type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
