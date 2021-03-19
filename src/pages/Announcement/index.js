import React from 'react';

import LeftMenu from '../../templates/LeftMenu';
import RightSessionDefault from '../../templates/RightSessionDefault';

import ContentClientLeftMenu from '../../templates/ContentClientLeftMenu';
import Announcement from '../../templates/Announcement'

export default function ClientSettings() {

  return(
      <div className="base-page">
            <LeftMenu content={ContentClientLeftMenu}/>
            <RightSessionDefault content={Announcement}/>
      </div>
  );
}