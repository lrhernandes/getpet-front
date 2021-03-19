import React, {useEffect} from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom';

import ContentEditAnnouncement from '../ContentEditAnnouncement';

export default function NewAnnouncement(){
    const history = useHistory();
    const userId = localStorage.getItem('user-id')
    useEffect(()=>{
        if(!userId){
            history.push('/error')
        }
    })
    return (
        <div className="default-wrapper">
            {userId &&(<div>
                <p className="title-default-page">EDITAR ANÚNCIO</p>
                <p className="subtitle-default-page">Como é o bichinho que preciso doar?</p>
                <div>
                    <ContentEditAnnouncement/>
                </div>
            </div>)}
        </div>
    )
}