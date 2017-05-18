import React, { Component, PropTypes } from 'react';
import ShareButtons from '../../containers/ShareButton';
export default class Test extends Component {

    static propTypes = {
      queryMemberAll: PropTypes.func.isRequired,
      memberAllData: PropTypes.object,
      count: PropTypes.number,
      theKeyword: PropTypes.string,
      selectPage: PropTypes.func.isRequired,
      searchMemberAll: PropTypes.func.isRequired,
      saveKeyword: PropTypes.func.isRequired,
    };

    componentDidMount() {
      this.props.queryMemberAll(0);
    }

    componentWillUnmount() {
      this.props.selectPage(0);
    }

    onSearch() {
      this.props.selectPage(0);
      const keyword = document.getElementById('search-memberAll').value;
      this.props.searchMemberAll(keyword, 0);
      this.props.saveKeyword(keyword);
    }

    selectPage() {
      const page = this.props.count + 1;
      this.props.selectPage(page);
      this.props.searchMemberAll(this.props.theKeyword, page);
    }

    render() {
      return (
          <ShareButtons
              sites = {['qzone', 'weibo', 'qq', 'tencent', 'wechat']}
              url = "https://github.com/DawnyWu/react-share-buttons"
              title = "react-share-buttons"
              description = "一键分享到各大社交网站的react组件"
          />
        );
    }
}
