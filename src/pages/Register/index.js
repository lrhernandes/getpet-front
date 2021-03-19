import React from 'react';
import './styles.css';

import BackgroundCenteredPage from '../../templates/BackgroundCenteredPage';
import ContentAreaCenteredRegister from '../../templates/ContentAreaCenteredRegister';

export default function Register() {
  return(
    <BackgroundCenteredPage content={ContentAreaCenteredRegister}/>  
  );
}

