import React from 'react';
import './styles.css';

import BackgroundCenteredPage from '../../templates/BackgroundCenteredPage';
import ContentAreaCenteredLogin from '../../templates/ContentAreaCenteredLogin';

export default function Register() {
  return(
    <BackgroundCenteredPage content={ContentAreaCenteredLogin}/>  
  );
}


