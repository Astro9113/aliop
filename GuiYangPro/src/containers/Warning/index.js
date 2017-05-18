import { connect } from 'react-redux';
import { queryWarningInfo } from '../../redux/modules/warning';
import { Warning } from '../../components';

const mapStateToProps = (state) => {
  return {
    warningData: state.warning.warningData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryWarningInfo: () => {
      dispatch(queryWarningInfo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Warning);
