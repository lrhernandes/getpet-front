import React, {useEffect} from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom'

import ContentClientSettings from '../../templates/ContentClientSettings'

export default function ClientSettings(){
    const history = useHistory();
    const userId = localStorage.getItem('user-id')
    useEffect(()=>{
        if(!userId){
            history.push('/error')
        }
    })
    return (
        <div className="client-settings">
            {userId && (<div className="client-settings-content-title-content">
                <div>
                    <p className="title-default-page">MEU PERFIL</p>
                    <p className="subtitle-default-page">Meus dados cadastrados</p>
                </div>
                <div className="default-page-content-wrapper">
                    <ContentClientSettings/>
                </div>
            </div>)}
        </div>
    )
}