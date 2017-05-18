import { connect } from 'react-redux';
import { Project } from '../../components';
import { queryProject, selectPage, selectStage, searchProject, saveKeyword } from '../../redux/modules/project';

const mapStateToProps = (state) => {
  return {
    projectData: state.project.projectData,
    count: state.project.count,
    stage: state.project.stage,
    theKeyword: state.project.theKeyword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryProject: (pageId, stage) => {
      dispatch(queryProject(pageId, stage));
    },

    selectPage: (page) => {
      dispatch(selectPage(page));
    },
    selectStage: (stage) => {
      dispatch(selectStage(stage));
    },
    searchProject: (keyword, page) => {
      dispatch(searchProject(keyword, page));
    },
    saveKeyword: (keyword) => {
      dispatch(saveKeyword(keyword));
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
