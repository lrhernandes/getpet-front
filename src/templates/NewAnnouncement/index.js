import React from 'react';
import './styles.css';

import ContentNewAnnouncement from '../../templates/ContentNewAnnouncement';

export default function NewAnnouncement(){
    return (
        <div className="default-wrapper">
            <div>
                <p className="title-default-page">NOVO ANÚNCIO</p>
                <p className="subtitle-default-page">Como é o bichinho que preciso doar?</p>
                <div>
                    <ContentNewAnnouncement/>
                </div>
            </div>
        </div>
    )
}