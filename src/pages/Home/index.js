import React from 'react';
import './styles.css';

import LeftMenu from '../../templates/LeftMenu';
import RightSession from '../../templates/RightSession';

import ContentClientLeftMenu from '../../templates/ContentClientLeftMenu';
import ContentFindAnnouncement from '../../templates/ContentFindAnnouncement';

export default function Home() {
  return(
      <div className="base-page">
            <LeftMenu content={ContentClientLeftMenu}/>
            <RightSession contentAnnouncement={ContentFindAnnouncement}/>
      </div>
  );
}


