import React from 'react';

import dots3 from '../../assets/change1 1.png';
import curls from '../../assets/curls 1.png';
import elipse5 from '../../assets/Ellipse 6.png';
import elipse6 from '../../assets/Ellipse 6-1.png';

export default function BackgroundCenteredPage({content}){
    const Content = content;
    return (
        <div className="center-page">
            <img alt="elipse" id="elipse5" src={elipse5}/>
            <img alt="elipse" id="elipse6" src={elipse6}/>
            <img alt="dots" id="dots3" src={dots3}/>
            <img alt="curls" id="curls" src={curls}/>
            <div className="camada">
                <Content/>
            </div>
      </div>
    )
}