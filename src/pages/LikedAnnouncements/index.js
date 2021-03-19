import React from 'react';

import LeftMenu from '../../templates/LeftMenu';
import RightSessionDefault from '../../templates/RightSessionDefault';

import ContentClientLeftMenu from '../../templates/ContentClientLeftMenu';
import Liked from '../../templates/LikedAnnouncements'

export default function LikedAnnouncements() {
  return(
      <div className="base-page">
            <LeftMenu content={ContentClientLeftMenu}/>
            <RightSessionDefault content={Liked}/>
      </div>
  );
}


