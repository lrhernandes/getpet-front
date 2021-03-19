import React from 'react';
import './styles.css';

export default function LeftMenu({content}){
    const Content = content;
    return (
        <div className="left-menu">
            <Content/>
        </div>
    )
}