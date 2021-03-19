import React from 'react';
import './styles.css';

import LeftMenu from '../../templates/LeftMenu';
import RightSessionDefault from '../../templates/RightSessionDefault';

import ContentClientLeftMenu from '../../templates/ContentClientLeftMenu';
import MyAnnouncements from '../../templates/MyAnnouncements';

export default function ContentClientAnnouncements() {
  return(
      <div className="base-page">
            <LeftMenu content={ContentClientLeftMenu}/>
            <RightSessionDefault content={MyAnnouncements}/>
      </div>
  );
}


