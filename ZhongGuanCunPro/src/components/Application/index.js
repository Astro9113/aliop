// import { connect } from 'react-redux';
import React, { Component } from 'react';
import HeaderNew from '../../components/HeaderNew';

export default class Application extends Component {

    render() {
      const style = require('./Application.scss');
      const building = require('./building.png');
      return (
          <div>
              <HeaderNew/>
              <div className={style['astro-application-container'] + ' container'}>
                  <img src={building}/>
              </div>
          </div>
      );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         ishidden: state.header.ishidden,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         chooseHidden: (module) => {
//             dispatch(chooseHidden(module));
//         },
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Header);
