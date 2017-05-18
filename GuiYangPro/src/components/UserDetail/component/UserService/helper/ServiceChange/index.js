import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import {boxInput} from '../../form/checkbox';
import {textInput} from '../../form/text';

import { userDetailServiceChangeOpen, userDetailServiceChangeClose, insertService, updateService, saveSeriveName, queryUserDetail } from '../../../../../../redux/modules/userDetail';

class ServiceChange extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    applyId: PropTypes.string,
    queryUserDetail: PropTypes.func,

    userDetailServiceChange: PropTypes.bool,
    userDetailServiceChangeOpen: PropTypes.func,
    userDetailServiceChangeClose: PropTypes.func,

    userDetailData: PropTypes.object,
    theServiceName: PropTypes.string,
    insertService: PropTypes.func,
    updateService: PropTypes.func,

    insertServiceState: PropTypes.object,
    saveSeriveName: PropTypes.func,
  };
  onSubmit(event) {
    event.preventDefault();
    const id = event.target.name;
    const theServiceName = this.props.theServiceName;

    let data;
    if ( theServiceName === 'rehabilitationVIP' || theServiceName === 'added' || theServiceName === 'insurance' || theServiceName === 'allowance' || theServiceName === 'entertainment') {
      const {available, requested} = this.refs;
      const availabeValue = available.value ? available.value : '';
      const requestedValue = requested.value ? requested.value : '';

      data = { available: availabeValue, requested: requestedValue};
    } else {
      const str = document.getElementsByName('available');
      const objarray = str.length;
      const equipmentList = [];

      for ( let ii = 0; ii < objarray; ii++ ) {
        if (str[ii].checked === true) {
          equipmentList.push(str[ii].value);
        }
      }

      const str2 = document.getElementsByName('requested');
      const objarray2 = str.length;
      const equipmentList2 = [];

      for ( let ii = 0; ii < objarray2; ii++ ) {
        if (str2[ii].checked === true) {
          equipmentList2.push(str[ii].value);
        }
      }
      data = {available: equipmentList, requested: equipmentList2};
    }

    if (this.props.userDetailData.data.service) {
      const info = this.props.userDetailData.data.service[`${theServiceName}`];
      if (info.info) {
        console.log('调用修改接口');
        this.props.updateService(id, theServiceName, data);
      } else {
        console.log('调用新增接口');
        this.props.insertService(id, theServiceName, data);
      }

      setTimeout(() => {
        if (this.props.insertServiceState) {
          const state = this.props.insertServiceState;
          alert(state.msg);
          this.props.queryUserDetail(this.props.applyId);
          this.props.userDetailServiceChangeClose();
          this.props.saveSeriveName();
        } else {
          alert('操作失败!!!!!');
          this.props.userDetailServiceChangeClose();
          this.props.saveSeriveName();
        }
      }, 500);
    }
  }
  showCard() {
    this.props.userDetailServiceChangeOpen();
  }
  closeCard() {
    this.props.userDetailServiceChangeClose();
  }

  render() {
    const style = require('./ServiceChange.scss');
    const {userDetailData, theServiceName} = this.props;
    const boxClass = style['astro-home-modal-box'] + ' form-group col-lg-12';

    let userServiceData;
    if (userDetailData && userDetailData.data && userDetailData.data.service) {
      userServiceData = userDetailData.data.service;
    }
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        {userServiceData &&
        <div className={style['astro-home-modal']}>
          <h4>信息添加/修改</h4>
          <div className={style['astro-home-modal-button']}>
            {theServiceName && theServiceName === 'equipment' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['个人医疗辅助器具', '技能训练辅助器具', '个人移动辅助器具', '家务管理辅助器具', '家庭和其它场所使用的家具及其适配、通讯、信息和讯号辅助器具', '用于环境改善的辅助器具和设备、工具和机器', '休闲娱乐辅助器具'], userServiceData.equipment.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['个人医疗辅助器具', '技能训练辅助器具', '个人移动辅助器具', '家务管理辅助器具', '家庭和其它场所使用的家具及其适配、通讯、信息和讯号辅助器具', '用于环境改善的辅助器具和设备、工具和机器', '休闲娱乐辅助器具'], userServiceData.equipment.requested)}
            </form>
            }
            {theServiceName && theServiceName === 'rehabilitation' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['医疗诊断', '白内障复明', '人工耳蜗植入', '肢体矩形', '精神病住院', '精神病服药', '康复护理', '传统医疗', '残疾评定', '家庭病床', '住院', '转诊', '其他医疗需求'], userServiceData.rehabilitation.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['医疗诊断', '白内障复明', '人工耳蜗植入', '肢体矩形', '精神病住院', '精神病服药', '康复护理', '传统医疗', '残疾评定', '家庭病床', '住院', '转诊', '其他医疗需求'], userServiceData.rehabilitation.requested)}
            </form>
            }
            {theServiceName && theServiceName === 'rehabilitationGuide' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['知识普及', '家属培训', '社工服务'], userServiceData.rehabilitationGuide.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['知识普及', '家属培训', '社工服务'], userServiceData.rehabilitationGuide.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'rehabilitationVIP' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {textInput(boxClass, '', 'available', userServiceData.rehabilitationGuide.available)}
              <h3>服务需求</h3>
              {textInput(boxClass, '', 'requested', userServiceData.rehabilitationGuide.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'vision' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['盲人定向行走训练', '日常生活技能训练', '社会适应训练', '低视力功能训练', '其它视力康复训练需求'], userServiceData.vision.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['盲人定向行走训练', '日常生活技能训练', '社会适应训练', '低视力功能训练', '其它视力康复训练需求'], userServiceData.vision.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'listening' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['听觉语言能力训练', '其它听力纪录片训练需求'], userServiceData.listening.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['听觉语言能力训练', '其它听力纪录片训练需求'], userServiceData.listening.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'linguistic' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['言语矫治', '双语训练', '手语指导', '其它言语康复训练需求'], userServiceData.linguistic.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['言语矫治', '双语训练', '手语指导', '其它言语康复训练需求'], userServiceData.linguistic.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'body' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['运动功能主训练', '生活自理训练', '社会适应训练', '脑瘫儿康复训练', '其它肢体康复训练需求'], userServiceData.body.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['运动功能主训练', '生活自理训练', '社会适应训练', '脑瘫儿康复训练', '其它肢体康复训练需求'], userServiceData.body.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'intelligence' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['生活自理能力训练', '简单劳动技能训练', '语言交流训练', '社会适应能力训练', '其它智力康复训练需求'], userServiceData.intelligence.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['生活自理能力训练', '简单劳动技能训练', '语言交流训练', '社会适应能力训练', '其它智力康复训练需求'], userServiceData.intelligence.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'mind' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['工（农）疗、娱（体）疗', '职业劳动技能训练', '心理服务', '自闭儿童康复训练', '其它精神康复训练需求'], userServiceData.mind.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['工（农）疗、娱（体）疗', '职业劳动技能训练', '心理服务', '自闭儿童康复训练', '其它精神康复训练需求'], userServiceData.mind.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'job' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['求职登记', '职业指导', '职业培训', '职业评测', '推荐就业', '职业等级评定', '技能等级评定', '其它就业服务需求'], userServiceData.job.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['求职登记', '职业指导', '职业培训', '职业评测', '推荐就业', '职业等级评定', '技能等级评定', '其它就业服务需求'], userServiceData.job.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'accommodation' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['城镇廉租住房', '全省农村', '城镇危房改造工程', '彩票公益金农村贫困残疾人危房改造项目', '其它住房需求'], userServiceData.accommodation.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['城镇廉租住房', '全省农村', '城镇危房改造工程', '彩票公益金农村贫困残疾人危房改造项目', '其它住房需求'], userServiceData.accommodation.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'loan' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['到户贷款', '大户贷款', '项目贷款', '其它小额贷款需求'], userServiceData.loan.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['到户贷款', '大户贷款', '项目贷款', '其它小额贷款需求'], userServiceData.loan.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'added' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {textInput(boxClass, '', 'available', userServiceData.added.available)}
              <h3>服务需求</h3>
              {textInput(boxClass, '', 'requested', userServiceData.added.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'skillTraining' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['农村种养植', '电脑操作、维护及软件制作', '美术绘画', '陶艺蜡染', '家政', '家电维修', '服装设计与加工', '手工编织', '园林花卉', '美容美发', '烹饪', '针灸推拿', '盲人按摩', '手语培训', '速录', '外语', '工业操作', '法律知识', '其它需求'], userServiceData.skillTraining.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['农村种养植', '电脑操作、维护及软件制作', '美术绘画', '陶艺蜡染', '家政', '家电维修', '服装设计与加工', '手工编织', '园林花卉', '美容美发', '烹饪', '针灸推拿', '盲人按摩', '手语培训', '速录', '外语', '工业操作', '法律知识', '其它需求'], userServiceData.skillTraining.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'custodian' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['居家托养', '日间照料', '集中托养'], userServiceData.custodian.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['居家托养', '日间照料', '集中托养'], userServiceData.custodian.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'insurance' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {textInput(boxClass, '', 'available', userServiceData.insurance.available)}
              <h3>服务需求</h3>
              {textInput(boxClass, '', 'requested', userServiceData.insurance.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'allowance' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {textInput(boxClass, '', 'available', userServiceData.allowance.available)}
              <h3>服务需求</h3>
              {textInput(boxClass, '', 'requested', userServiceData.allowance.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'grocessory' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['手机', '固定电话', '彩电', '洗衣机', '冰箱', '电脑', '电饭煲', '热水器', '电熨斗', '微波炉', '电风扇', '空调', '加湿器', '排油烟机', '电暖器', '电水壶', '缝纫机', '吸尘器', '足浴盆', '按摩椅', '饮水机', '音响', '其他需求'], userServiceData.grocessory.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['手机', '固定电话', '彩电', '洗衣机', '冰箱', '电脑', '电饭煲', '热水器', '电熨斗', '微波炉', '电风扇', '空调', '加湿器', '排油烟机', '电暖器', '电水壶', '缝纫机', '吸尘器', '足浴盆', '按摩椅', '饮水机', '音响', '其他需求'], userServiceData.grocessory.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'legal' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['侵权类', '裁审结案类', '教育类', '就业类', '救济类', '优惠政策类', '借贷类', '康复类', '婚姻户籍类', '建议类', '举报类', '机动轮椅类', '残疾人驾驶汽车类', '精神残疾类', '其它需求'], userServiceData.legal.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['侵权类', '裁审结案类', '教育类', '就业类', '救济类', '优惠政策类', '借贷类', '康复类', '婚姻户籍类', '建议类', '举报类', '机动轮椅类', '残疾人驾驶汽车类', '精神残疾类', '其它需求'], userServiceData.legal.requested)}
            </form>
            }
            {theServiceName && theServiceName === 'house' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['室内外坡道', '坡道扶手', '卫生间蹲便改坐便', '卫生间扶手', '固定折叠浴凳', '活动浴椅', '坐便椅', '洗脸盆抓杆', '配备轮椅', '院内路面整修', '闪光门铃', '铺设盲道', '升降淋浴', '升降晒衣架', '其它需求'], userServiceData.house.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['室内外坡道', '坡道扶手', '卫生间蹲便改坐便', '卫生间扶手', '固定折叠浴凳', '活动浴椅', '坐便椅', '洗脸盆抓杆', '配备轮椅', '院内路面整修', '闪光门铃', '铺设盲道', '升降淋浴', '升降晒衣架', '其它需求'], userServiceData.house.requested)}
            </form>
            }
            {theServiceName && theServiceName === 'information' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['网站无障碍', '聋人呼叫中心', '数字手语系统', '听力补偿系统', '读屏软件', '盲人电子显示器', '盲文打印机', '盲用数字终端设备', '其它需求'], userServiceData.information.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['网站无障碍', '聋人呼叫中心', '数字手语系统', '听力补偿系统', '读屏软件', '盲人电子显示器', '盲文打印机', '盲用数字终端设备', '其它需求'], userServiceData.information.requested)}
            </form>
            }
            {theServiceName && theServiceName === 'book' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['公共图书馆借阅', '社区图书室借阅', '盲文及盲人语音图书阅读', '送书上门'], userServiceData.book.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['公共图书馆借阅', '社区图书室借阅', '盲文及盲人语音图书阅读', '送书上门'], userServiceData.book.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'musical' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {boxInput(boxClass, '', 'available', ['声乐', '器乐', '舞蹈', '摄影', '书法', '绘画', '其它需求'], userServiceData.musical.available)}
              <h3>服务需求</h3>
              {boxInput(boxClass, '', 'requested', ['声乐', '器乐', '舞蹈', '摄影', '书法', '绘画', '其它需求'], userServiceData.musical.requested)}
            </form>
            }

            {theServiceName && theServiceName === 'entertainment' &&
            <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
              <h3>现有服务</h3>
              {textInput(boxClass, '', 'available', userServiceData.entertainment.available)}
              <h3>服务需求</h3>
              {textInput(boxClass, '', 'requested', userServiceData.entertainment.requested)}
            </form>
            }

            <div className={style['astro-home-modal-button']}>
              <button key="1" name={userServiceData._id} style={{background: 'green'}} onClick={this.onSubmit.bind(this)}>保存</button>
              <button key="3" style={{background: '#f6f6f6', color: '#2b2c35'}} onClick={this.closeCard.bind(this)}>关闭</button>
            </div>
          </div>
        </div>
        }
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailServiceChange: state.userDetail.userDetailServiceChange,
    show: ownProps.show,

    userDetailData: state.userDetail.userDetailData,
    theServiceName: state.userDetail.theServiceName,
    insertServiceState: state.userDetail.insertServiceState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailServiceChangeOpen: () => {
      dispatch(userDetailServiceChangeOpen());
    },
    userDetailServiceChangeClose: () => {
      dispatch(userDetailServiceChangeClose());
    },
    insertService: (id, name, data) => {
      dispatch(insertService(id, name, data));
    },
    updateService: (id, name, data) => {
      dispatch(updateService(id, name, data));
    },
    saveSeriveName: (name) => {
      dispatch(saveSeriveName(name));
    },

    queryUserDetail: (uid) => {
      dispatch(queryUserDetail(uid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceChange);
