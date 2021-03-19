import React from 'react';
import './styles.css';

export default function RightSession({contentAnnouncement}){
    const Content = contentAnnouncement;
    return (
        <div className="right-session">
            <Content/>
        </div>
    )
}