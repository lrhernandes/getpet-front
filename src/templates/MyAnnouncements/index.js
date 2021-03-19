import React from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';

import ContentMyAnnouncements from '../../templates/ContentMyAnnouncementsItens'
import { useEffect } from 'react';

export default function MyAnnouncements(){
    const history = useHistory();
    const userId = localStorage.getItem('user-id')
    useEffect(()=>{
        if(!userId){
            history.push('/error')
        }
    })
    return (
        <div className="my-announcements">
            {userId && (<div className="content-find-announcements">
                <p className="title-default-page">MEUS ANÚNCIOS</p>
                <p className="subtitle-default-page">Animais cadastrados para adoção</p>
                <Link to="/newannouncement"><button className="purple">NOVO ANÚNCIO</button></Link>
                <div className="content-itens-my-favourite-announcements">
                    <ContentMyAnnouncements/>
                </div>
            </div>)}
        </div>
    )
}