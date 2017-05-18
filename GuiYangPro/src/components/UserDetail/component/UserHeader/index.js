import React, { Component, PropTypes } from 'react';
import moment from 'moment';
moment.locale('zh');

import {navInput} from '../helper/headerNav';

export default class UserHeader extends Component {
    static propTypes = {
      userinfo: PropTypes.object,
    };

  render() {
    const style = require('./UserHeader.scss');
    const personal = require('../../img/person.png');
    const income = require('../../img/income.png');
    const apply = require('../../img/apply.png');
    const service = require('../../img/service.png');

    const {userinfo} = this.props;
    let name;
    let sex;
    let nationality;
    let birth;
    let identifier;

    if (userinfo) {
      name = userinfo.name !== '' ? userinfo.name : '无';
      sex = userinfo.sex !== '' ? userinfo.sex : '无';
      nationality = userinfo.nationality !== '' ? userinfo.nationality : '无';
      birth = userinfo.birth !== null ? moment(userinfo.birth).format('YYYY-MM-DD') : '无';
      identifier = userinfo.identifier !== '' ? userinfo.identifier : '无';
    } else {
      name = '无';
      sex = '无';
      nationality = '无';
      birth = '无';
      identifier = '无';
    }

    return (
      <div className={style['astro-personal-header'] + ' clearfix'}>
        <div className={style['astro-personal-header-title']}>
          <h2>个人信息</h2>
          <p>Personal</p><p>Information</p>
        </div>
        <div className={style['astro-personal-header-line']}></div>
        <div className={style['astro-personal-header-info-part1']}>
            <h2>{name}</h2>
            <p>{sex}{' / '}{nationality}</p>
        </div>
        <div className={style['astro-personal-header-info-part2']}>
          <h2>生日{' / '}<small>BIRTHDAY</small></h2>
            <p>{birth}</p>
        </div>
        <div className={style['astro-personal-header-info-part3']}>
          <h2>身份证{' / '}<small>ID{' '}CARD</small></h2>
            <p>{identifier}</p>
        </div>
          {navInput(style['astro-personal-header-photo-part1'], '#info', personal, '基本信息')}
          {navInput(style['astro-personal-header-photo-part2'], '#income', income, '年度收入支出')}
          {navInput(style['astro-personal-header-photo-part3'], '#apply', apply, '救助资金申请')}
          {navInput(style['astro-personal-header-photo-part4'], '#service', service, '服务')}
      </div>
    );
  }
}
