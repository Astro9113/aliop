import React, {PropTypes} from 'react';

import Popup from '../../components/Popup/index';
import { modalOpen, setContent } from '../../redux/modules/popup';
import { connect } from 'react-redux';

class Test extends React.Component {
  static propTypes = {
    alertOpen: PropTypes.func.isRequired,
    alertText: PropTypes.func.isRequired,
    isopen: PropTypes.bool
  };

  openModal() {
    const aa = {'test': '这是测试'};
    this.props.alertText(aa);
    this.props.alertOpen();
  }

  render() {
    return (
      <div style={{margin: '0 auto', width: '1200px', marginTop: '120px'}}>
        <div>
          <button onClick={this.openModal.bind(this)}>Open Modal</button>
          <Popup/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isopen: state.popup.isopen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertOpen: () => {
      dispatch(modalOpen());
    },
    alertText: (desc) => {
      dispatch(setContent(desc));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
