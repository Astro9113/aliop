import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {trClickFunc} from './form/trClick';

import {userDetailServiceChangeOpen, userDetailServiceChangeClose,
    userDetailServiceAuditOpen, userDetailServiceAuditClose,
    userDetailServiceChainOpen, userDetailServiceChainClose,
    saveSeriveName, blockchainService,
}
    from '../../../../redux/modules/userDetail';

import ServiceChange from './helper/ServiceChange';
import ServiceAudit from './helper/ServiceAudit';
import ServiceChain from './helper/ServiceChain';

class UserService extends Component {
  static propTypes = {
    user: PropTypes.object,
    transactionId: PropTypes.string,
    applyId: PropTypes.string,

    userDetailServiceChange: PropTypes.bool,
    userDetailServiceChangeOpen: PropTypes.func,
    userDetailServiceChangeClose: PropTypes.func,

    userDetailServiceAudit: PropTypes.bool,
    userDetailServiceAuditOpen: PropTypes.func,
    userDetailServiceAuditClose: PropTypes.func,

    userDetailServiceChain: PropTypes.bool,
    userDetailServiceChainOpen: PropTypes.func,
    userDetailServiceChainClose: PropTypes.func,

    theServiceName: PropTypes.string,
    saveSeriveName: PropTypes.func,

    userDetailData: PropTypes.object,
    blockchainService: PropTypes.func,
  };
  componentWillUnmount() {
    this.props.userDetailServiceChangeClose();
    this.props.userDetailServiceAuditClose();
    this.props.userDetailServiceChainClose();
  }
  ServiceChange(event) {
    const serviceName = event.target.name;
    console.log('ChangeServiceName: ', serviceName);
    this.props.saveSeriveName(serviceName);

    setTimeout(() => {
      this.props.userDetailServiceChangeOpen();
    }, 500);
  }
  ServiceAudit(event) {
    const serviceName = event.target.name;
    console.log('AuditServiceName: ', serviceName);
    this.props.saveSeriveName(serviceName);

    setTimeout(() => {
      this.props.userDetailServiceAuditOpen();
    }, 500);
  }
  ServiceChain(event) {
    const serviceName = event.target.name;
    console.log('ChainServiceName: ', serviceName);
    this.props.saveSeriveName(serviceName);

    const userData = this.props.userDetailData;
    if (userData && userData.data && userData.data.service) {
      const id = userData.data.service._id;
      this.props.blockchainService(id, serviceName);
    }
    setTimeout(() => {
      this.props.userDetailServiceChainOpen();
    }, 500);
  }
  render() {
    const style = require('./UserService.scss');
    const service = require('../../img/service.png');
    const {userDetailServiceChange, userDetailServiceAudit, userDetailServiceChain, user, userDetailData, applyId} = this.props;

    let serviceData;
    if (userDetailData && userDetailData.data && userDetailData.data.service) {
      serviceData = userDetailData.data.service;
    }
    return (
        <div className={style['astro-personal-service'] + ' clearfix'} id="service">
          <div className={style['astro-personal-service-title']}>
            <img src={service} /><p>服务信息</p>
          </div>
          <table className={style['astro-personal-service-table'] + ' col-lg-12 table table-hover'}>
            <thead>
            <tr className={style['astro-personal-service-table-tr']} >
              <th>服务名称<p>SERVICE NAMES</p></th><th>现有服务<p>EXISTING SERVICE</p></th>
              <th>服务需求<p>SERVICE REQUIREMENTS</p></th><th>更新日期<p>UPDATE DATE</p></th><th>状态<p>STATE</p></th>
              <th>操作<p>HANDLE</p></th>
            </tr>
            </thead>
            {Number(user.role) === 1 && serviceData &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trClickFunc(['辅助器具', serviceData.equipment.available, serviceData.equipment.requested, serviceData.equipment, serviceData.equipment], [['修改', this.ServiceChange.bind(this), 'equipment'], ['区块链', this.ServiceChain.bind(this), 'equipment']])}
            {trClickFunc(['康复医疗', serviceData.rehabilitation.available, serviceData.rehabilitation.requested, serviceData.rehabilitation, serviceData.rehabilitation], [['修改', this.ServiceChange.bind(this), 'rehabilitation'], ['区块链', this.ServiceChain.bind(this), 'rehabilitation']])}
            {trClickFunc(['康复指导', serviceData.rehabilitationGuide.available, serviceData.rehabilitationGuide.requested, serviceData.rehabilitationGuide, serviceData.rehabilitationGuide], [['修改', this.ServiceChange.bind(this), 'rehabilitationGuide'], ['区块链', this.ServiceChain.bind(this), 'rehabilitationGuide']])}
            {trClickFunc(['重点康复救助服务', serviceData.rehabilitationVIP.available, serviceData.rehabilitationVIP.requested, serviceData.rehabilitationVIP, serviceData.rehabilitationVIP], [['修改', this.ServiceChange.bind(this), 'rehabilitationVIP'], ['区块链', this.ServiceChain.bind(this), 'rehabilitationVIP']])}
            {trClickFunc(['视力', serviceData.vision.available, serviceData.vision.requested, serviceData.vision, serviceData.vision], [['修改', this.ServiceChange.bind(this), 'vision'], ['区块链', this.ServiceChain.bind(this), 'vision']])}
            {trClickFunc(['听力', serviceData.listening.available, serviceData.listening.requested, serviceData.listening, serviceData.listening], [['修改', this.ServiceChange.bind(this), 'listening'], ['区块链', this.ServiceChain.bind(this), 'listening']])}
            {trClickFunc(['言语', serviceData.linguistic.available, serviceData.linguistic.requested, serviceData.linguistic, serviceData.linguistic], [['修改', this.ServiceChange.bind(this), 'linguistic'], ['区块链', this.ServiceChain.bind(this), 'linguistic']])}
            {trClickFunc(['肢体', serviceData.body.available, serviceData.body.requested, serviceData.body, serviceData.body], [['修改', this.ServiceChange.bind(this), 'body'], ['区块链', this.ServiceChain.bind(this), 'body']])}
            {trClickFunc(['智力', serviceData.intelligence.available, serviceData.intelligence.requested, serviceData.intelligence, serviceData.intelligence], [['修改', this.ServiceChange.bind(this), 'intelligence'], ['区块链', this.ServiceChain.bind(this), 'intelligence']])}
            {trClickFunc(['精神', serviceData.mind.available, serviceData.mind.requested, serviceData.mind, serviceData.mind], [['修改', this.ServiceChange.bind(this), 'mind'], ['区块链', this.ServiceChain.bind(this), 'mind']])}
            {trClickFunc(['就业服务', serviceData.job.available, serviceData.job.requested, serviceData.job, serviceData.job], [['修改', this.ServiceChange.bind(this), 'job'], ['区块链', this.ServiceChain.bind(this), 'job']])}
            {trClickFunc(['住房', serviceData.accommodation.available, serviceData.accommodation.requested, serviceData.accommodation, serviceData.accommodation], [['修改', this.ServiceChange.bind(this), 'accommodation'], ['区块链', this.ServiceChain.bind(this), 'accommodation']])}
            {trClickFunc(['小额贷款', serviceData.loan.available, serviceData.loan.requested, serviceData.loan, serviceData.loan], [['修改', this.ServiceChange.bind(this), 'loan'], ['区块链', this.ServiceChain.bind(this), 'loan']])}
            {trClickFunc(['增收项目', serviceData.added.available, serviceData.added.requested, serviceData.added, serviceData.added], [['修改', this.ServiceChange.bind(this), 'added'], ['区块链', this.ServiceChain.bind(this), 'added']])}
            {trClickFunc(['实用技术培训', serviceData.skillTraining.available, serviceData.skillTraining.requested, serviceData.skillTraining, serviceData.skillTraining], [['修改', this.ServiceChange.bind(this), 'skillTraining'], ['区块链', this.ServiceChain.bind(this), 'skillTraining']])}
            {trClickFunc(['托养', serviceData.custodian.available, serviceData.custodian.requested, serviceData.custodian, serviceData.custodian], [['修改', this.ServiceChange.bind(this), 'custodian'], ['区块链', this.ServiceChain.bind(this), 'custodian']])}
            {trClickFunc(['保险', serviceData.insurance.available, serviceData.insurance.requested, serviceData.insurance, serviceData.insurance], [['修改', this.ServiceChange.bind(this), 'insurance'], ['区块链', this.ServiceChain.bind(this), 'insurance']])}
            {trClickFunc(['补贴', serviceData.allowance.available, serviceData.allowance.requested, serviceData.allowance, serviceData.allowance], [['修改', this.ServiceChange.bind(this), 'allowance'], ['区块链', this.ServiceChain.bind(this), 'allowance']])}
            {trClickFunc(['生活物品', serviceData.grocessory.available, serviceData.grocessory.requested, serviceData.grocessory, serviceData.grocessory], [['修改', this.ServiceChange.bind(this), 'grocessory'], ['区块链', this.ServiceChain.bind(this), 'grocessory']])}
            {trClickFunc(['法律援助或司法救助', serviceData.legal.available, serviceData.legal.requested, serviceData.legal, serviceData.legal], [['修改', this.ServiceChange.bind(this), 'legal'], ['区块链', this.ServiceChain.bind(this), 'legal']])}
            {trClickFunc(['家庭无障碍改造', serviceData.house.available, serviceData.house.requested, serviceData.house, serviceData.house], [['修改', this.ServiceChange.bind(this), 'house'], ['区块链', this.ServiceChain.bind(this), 'house']])}
            {trClickFunc(['信息无障碍产品和服务', serviceData.information.available, serviceData.information.requested, serviceData.information, serviceData], [['修改', this.ServiceChange.bind(this), 'information'], ['区块链', this.ServiceChain.bind(this), 'information']])}
            {trClickFunc(['图书借阅', serviceData.book.available, serviceData.book.requested, serviceData.book, serviceData.book], [['修改', this.ServiceChange.bind(this), 'book'], ['区块链', this.ServiceChain.bind(this), 'book']])}
            {trClickFunc(['培养培训', serviceData.musical.available, serviceData.musical.requested, serviceData.musical, serviceData.musical], [['修改', this.ServiceChange.bind(this), 'musical'], ['区块链', this.ServiceChain.bind(this), 'musical']])}
            {trClickFunc(['文艺活动', serviceData.entertainment.available, serviceData.entertainment.requested, serviceData.entertainment, serviceData.entertainment], [['修改', this.ServiceChange.bind(this), 'entertainment'], ['区块链', this.ServiceChain.bind(this), 'entertainment']])}
            </tbody>
            }
            {Number(user.role) === 2 && serviceData &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trClickFunc(['辅助器具', serviceData.equipment.available, serviceData.equipment.requested, serviceData.equipment, serviceData.equipment], [['审核', this.ServiceAudit.bind(this), 'equipment'], ['区块链', this.ServiceChain.bind(this), 'equipment']])}
            {trClickFunc(['康复医疗', serviceData.rehabilitation.available, serviceData.rehabilitation.requested, serviceData.rehabilitation, serviceData.rehabilitation], [['审核', this.ServiceAudit.bind(this), 'rehabilitation'], ['区块链', this.ServiceChain.bind(this), 'rehabilitation']])}
            {trClickFunc(['康复指导', serviceData.rehabilitationGuide.available, serviceData.rehabilitationGuide.requested, serviceData.rehabilitationGuide, serviceData.rehabilitationGuide], [['审核', this.ServiceAudit.bind(this), 'rehabilitationGuide'], ['区块链', this.ServiceChain.bind(this), 'rehabilitationGuide']])}
            {trClickFunc(['重点康复救助服务', serviceData.rehabilitationVIP.available, serviceData.rehabilitationVIP.requested, serviceData.rehabilitationVIP, serviceData.rehabilitationVIP], [['审核', this.ServiceAudit.bind(this), 'rehabilitationVIP'], ['区块链', this.ServiceChain.bind(this), 'rehabilitationVIP']])}
            {trClickFunc(['视力', serviceData.vision.available, serviceData.vision.requested, serviceData.vision, serviceData.vision], [['审核', this.ServiceAudit.bind(this), 'vision'], ['区块链', this.ServiceChain.bind(this), 'vision']])}
            {trClickFunc(['听力', serviceData.listening.available, serviceData.listening.requested, serviceData.listening, serviceData.listening], [['审核', this.ServiceAudit.bind(this), 'listening'], ['区块链', this.ServiceChain.bind(this), 'listening']])}
            {trClickFunc(['言语', serviceData.linguistic.available, serviceData.linguistic.requested, serviceData.linguistic, serviceData.linguistic], [['审核', this.ServiceAudit.bind(this), 'linguistic'], ['区块链', this.ServiceChain.bind(this), 'linguistic']])}
            {trClickFunc(['肢体', serviceData.body.available, serviceData.body.requested, serviceData.body, serviceData.body], [['审核', this.ServiceAudit.bind(this), 'body'], ['区块链', this.ServiceChain.bind(this), 'body']])}
            {trClickFunc(['智力', serviceData.intelligence.available, serviceData.intelligence.requested, serviceData.intelligence, serviceData.intelligence], [['审核', this.ServiceAudit.bind(this), 'intelligence'], ['区块链', this.ServiceChain.bind(this), 'intelligence']])}
            {trClickFunc(['精神', serviceData.mind.available, serviceData.mind.requested, serviceData.mind, serviceData.mind], [['审核', this.ServiceAudit.bind(this), 'mind'], ['区块链', this.ServiceChain.bind(this), 'mind']])}
            {trClickFunc(['就业服务', serviceData.job.available, serviceData.job.requested, serviceData.job, serviceData.job], [['审核', this.ServiceAudit.bind(this), 'job'], ['区块链', this.ServiceChain.bind(this), 'job']])}
            {trClickFunc(['住房', serviceData.accommodation.available, serviceData.accommodation.requested, serviceData.accommodation, serviceData.accommodation], [['审核', this.ServiceAudit.bind(this), 'accommodation'], ['区块链', this.ServiceChain.bind(this), 'accommodation']])}
            {trClickFunc(['小额贷款', serviceData.loan.available, serviceData.loan.requested, serviceData.loan, serviceData.loan], [['审核', this.ServiceAudit.bind(this), 'loan'], ['区块链', this.ServiceChain.bind(this), 'loan']])}
            {trClickFunc(['增收项目', serviceData.added.available, serviceData.added.requested, serviceData.added, serviceData.added], [['审核', this.ServiceAudit.bind(this), 'added'], ['区块链', this.ServiceChain.bind(this), 'added']])}
            {trClickFunc(['实用技术培训', serviceData.skillTraining.available, serviceData.skillTraining.requested, serviceData.skillTraining, serviceData.skillTraining], [['审核', this.ServiceAudit.bind(this), 'skillTraining'], ['区块链', this.ServiceChain.bind(this), 'skillTraining']])}
            {trClickFunc(['托养', serviceData.custodian.available, serviceData.custodian.requested, serviceData.custodian, serviceData.custodian], [['审核', this.ServiceAudit.bind(this), 'custodian'], ['区块链', this.ServiceChain.bind(this), 'custodian']])}
            {trClickFunc(['保险', serviceData.insurance.available, serviceData.insurance.requested, serviceData.insurance, serviceData.insurance], [['审核', this.ServiceAudit.bind(this), 'insurance'], ['区块链', this.ServiceChain.bind(this), 'insurance']])}
            {trClickFunc(['补贴', serviceData.allowance.available, serviceData.allowance.requested, serviceData.allowance, serviceData.allowance], [['审核', this.ServiceAudit.bind(this), 'allowance'], ['区块链', this.ServiceChain.bind(this), 'allowance']])}
            {trClickFunc(['生活物品', serviceData.grocessory.available, serviceData.grocessory.requested, serviceData.grocessory, serviceData.grocessory], [['审核', this.ServiceAudit.bind(this), 'grocessory'], ['区块链', this.ServiceChain.bind(this), 'grocessory']])}
            {trClickFunc(['法律援助或司法救助', serviceData.legal.available, serviceData.legal.requested, serviceData.legal, serviceData.legal], [['审核', this.ServiceAudit.bind(this), 'legal'], ['区块链', this.ServiceChain.bind(this), 'legal']])}
            {trClickFunc(['家庭无障碍改造', serviceData.house.available, serviceData.house.requested, serviceData.house, serviceData.house], [['审核', this.ServiceAudit.bind(this), 'house'], ['区块链', this.ServiceChain.bind(this), 'house']])}
            {trClickFunc(['信息无障碍产品和服务', serviceData.information.available, serviceData.information.requested, serviceData.information, serviceData], [['审核', this.ServiceAudit.bind(this), 'information'], ['区块链', this.ServiceChain.bind(this), 'information']])}
            {trClickFunc(['图书借阅', serviceData.book.available, serviceData.book.requested, serviceData.book, serviceData.book], [['审核', this.ServiceAudit.bind(this), 'book'], ['区块链', this.ServiceChain.bind(this), 'book']])}
            {trClickFunc(['培养培训', serviceData.musical.available, serviceData.musical.requested, serviceData.musical, serviceData.musical], [['审核', this.ServiceAudit.bind(this), 'musical'], ['区块链', this.ServiceChain.bind(this), 'musical']])}
            {trClickFunc(['文艺活动', serviceData.entertainment.available, serviceData.entertainment.requested, serviceData.entertainment, serviceData.entertainment], [['审核', this.ServiceAudit.bind(this), 'entertainment'], ['区块链', this.ServiceChain.bind(this), 'entertainment']])}
            </tbody>
            }
            {Number(user.role) === 3 && serviceData &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trClickFunc(['辅助器具', serviceData.equipment.available, serviceData.equipment.requested, serviceData.equipment, serviceData.equipment], [['区块链', this.ServiceChain.bind(this), 'equipment']])}
            {trClickFunc(['康复医疗', serviceData.rehabilitation.available, serviceData.rehabilitation.requested, serviceData.rehabilitation, serviceData.rehabilitation], [['区块链', this.ServiceChain.bind(this), 'rehabilitation']])}
            {trClickFunc(['康复指导', serviceData.rehabilitationGuide.available, serviceData.rehabilitationGuide.requested, serviceData.rehabilitationGuide, serviceData.rehabilitationGuide], [['区块链', this.ServiceChain.bind(this), 'rehabilitationGuide']])}
            {trClickFunc(['重点康复救助服务', serviceData.rehabilitationVIP.available, serviceData.rehabilitationVIP.requested, serviceData.rehabilitationVIP, serviceData.rehabilitationVIP], [['区块链', this.ServiceChain.bind(this), 'rehabilitationVIP']])}
            {trClickFunc(['视力', serviceData.vision.available, serviceData.vision.requested, serviceData.vision, serviceData.vision], [['区块链', this.ServiceChain.bind(this), 'vision']])}
            {trClickFunc(['听力', serviceData.listening.available, serviceData.listening.requested, serviceData.listening, serviceData.listening], [['区块链', this.ServiceChain.bind(this), 'listening']])}
            {trClickFunc(['言语', serviceData.linguistic.available, serviceData.linguistic.requested, serviceData.linguistic, serviceData.linguistic], [['区块链', this.ServiceChain.bind(this), 'linguistic']])}
            {trClickFunc(['肢体', serviceData.body.available, serviceData.body.requested, serviceData.body, serviceData.body], [['区块链', this.ServiceChain.bind(this), 'body']])}
            {trClickFunc(['智力', serviceData.intelligence.available, serviceData.intelligence.requested, serviceData.intelligence, serviceData.intelligence], [['区块链', this.ServiceChain.bind(this), 'intelligence']])}
            {trClickFunc(['精神', serviceData.mind.available, serviceData.mind.requested, serviceData.mind, serviceData.mind], [['区块链', this.ServiceChain.bind(this), 'mind']])}
            {trClickFunc(['就业服务', serviceData.job.available, serviceData.job.requested, serviceData.job, serviceData.job], [['区块链', this.ServiceChain.bind(this), 'job']])}
            {trClickFunc(['住房', serviceData.accommodation.available, serviceData.accommodation.requested, serviceData.accommodation, serviceData.accommodation], [['区块链', this.ServiceChain.bind(this), 'accommodation']])}
            {trClickFunc(['小额贷款', serviceData.loan.available, serviceData.loan.requested, serviceData.loan, serviceData.loan], [['区块链', this.ServiceChain.bind(this), 'loan']])}
            {trClickFunc(['增收项目', serviceData.added.available, serviceData.added.requested, serviceData.added, serviceData.added], [['区块链', this.ServiceChain.bind(this), 'added']])}
            {trClickFunc(['实用技术培训', serviceData.skillTraining.available, serviceData.skillTraining.requested, serviceData.skillTraining, serviceData.skillTraining], [['区块链', this.ServiceChain.bind(this), 'skillTraining']])}
            {trClickFunc(['托养', serviceData.custodian.available, serviceData.custodian.requested, serviceData.custodian, serviceData.custodian], [['区块链', this.ServiceChain.bind(this), 'custodian']])}
            {trClickFunc(['保险', serviceData.insurance.available, serviceData.insurance.requested, serviceData.insurance, serviceData.insurance], [['区块链', this.ServiceChain.bind(this), 'insurance']])}
            {trClickFunc(['补贴', serviceData.allowance.available, serviceData.allowance.requested, serviceData.allowance, serviceData.allowance], [['区块链', this.ServiceChain.bind(this), 'allowance']])}
            {trClickFunc(['生活物品', serviceData.grocessory.available, serviceData.grocessory.requested, serviceData.grocessory, serviceData.grocessory], [['区块链', this.ServiceChain.bind(this), 'grocessory']])}
            {trClickFunc(['法律援助或司法救助', serviceData.legal.available, serviceData.legal.requested, serviceData.legal, serviceData.legal], [['区块链', this.ServiceChain.bind(this), 'legal']])}
            {trClickFunc(['家庭无障碍改造', serviceData.house.available, serviceData.house.requested, serviceData.house, serviceData.house], [['区块链', this.ServiceChain.bind(this), 'house']])}
            {trClickFunc(['信息无障碍产品和服务', serviceData.information.available, serviceData.information.requested, serviceData.information, serviceData], [['区块链', this.ServiceChain.bind(this), 'information']])}
            {trClickFunc(['图书借阅', serviceData.book.available, serviceData.book.requested, serviceData.book, serviceData.book], [['区块链', this.ServiceChain.bind(this), 'book']])}
            {trClickFunc(['培养培训', serviceData.musical.available, serviceData.musical.requested, serviceData.musical, serviceData.musical], [['区块链', this.ServiceChain.bind(this), 'musical']])}
            {trClickFunc(['文艺活动', serviceData.entertainment.available, serviceData.entertainment.requested, serviceData.entertainment, serviceData.entertainment], [['区块链', this.ServiceChain.bind(this), 'entertainment']])}
            </tbody>
            }

            {!(serviceData) &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trClickFunc(['辅助器具', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['康复医疗', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['康复指导', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['重点康复救助服务', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['视力', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['听力', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['言语', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['肢体', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['智力', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['精神', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['就业服务', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['住房', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['小额贷款', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['增收项目', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['实用技术培训', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['托养', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['保险', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['补贴', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['生活物品', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['法律援助或司法救助', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['家庭无障碍改造', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['信息无障碍产品和服务', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['图书借阅', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['培养培训', '', '', '', ''], [['', '', '']])}
            {trClickFunc(['文艺活动', '', '', '', ''], [['', '', '']])}
            </tbody>
            }
          </table>
          <ServiceChange show={userDetailServiceChange} onHide={this.ServiceChange.bind(this)} applyId={applyId}/>
          <ServiceAudit show={userDetailServiceAudit} onHide={this.ServiceAudit.bind(this)} applyId={applyId}/>
          <ServiceChain show={userDetailServiceChain} onHide={this.ServiceChain.bind(this)}/>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailServiceChange: state.userDetail.userDetailServiceChange,
    userDetailServiceAudit: state.userDetail.userDetailServiceAudit,
    userDetailServiceChain: state.userDetail.userDetailServiceChain,

    user: state.auth.user,

    theServiceName: state.userDetail.theServiceName,
    userDetailData: state.userDetail.userDetailData,
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

    userDetailServiceAuditOpen: () => {
      dispatch(userDetailServiceAuditOpen());
    },
    userDetailServiceAuditClose: () => {
      dispatch(userDetailServiceAuditClose());
    },

    userDetailServiceChainOpen: () => {
      dispatch(userDetailServiceChainOpen());
    },
    userDetailServiceChainClose: () => {
      dispatch(userDetailServiceChainClose());
    },
    saveSeriveName: (name) => {
      dispatch(saveSeriveName(name));
    },

    blockchainService: (id, name) => {
      dispatch(blockchainService(id, name));
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserService);
