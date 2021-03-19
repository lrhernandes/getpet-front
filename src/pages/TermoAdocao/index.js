import React from 'react';

import LeftMenu from '../../templates/LeftMenu';
import RightSessionDefault from '../../templates/RightSessionDefault';

import ContentClientLeftMenu from '../../templates/ContentClientLeftMenu';
import TermoPage from '../../templates/TermoAdoção'

export default function TermoAdocao() {
  return(
      <div className="base-page">
            <LeftMenu content={ContentClientLeftMenu}/>
            <RightSessionDefault content={TermoPage}/>
      </div>
  );
}