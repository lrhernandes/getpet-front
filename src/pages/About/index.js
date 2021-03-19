import React from 'react';
import './styles.css';

import BackgroundCenteredPage from '../../templates/BackgroundCenteredPage';
import CenteredAreaContentAbout from '../../templates/CenteredAreaContenteAbout';

export default function About() {
  return(
    <BackgroundCenteredPage content={CenteredAreaContentAbout}/>  
  );
}

