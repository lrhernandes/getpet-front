import React, {useEffect} from 'react';
import './styles.css';

import {Link, useHistory} from 'react-router-dom';
import ContentMyAnnouncements from '../../templates/ContentMyFavouriteAnnouncements'

export default function LikedAnnouncements(){
    const history = useHistory();
    const userId = localStorage.getItem('user-id')
    useEffect(()=>{
        if(!userId){
            history.push('/error')
        }
    })
    
    return (
        <div className="liked-announcements">
            {userId &&(<div className="content-find-announcements">
                <p className="title-default-page">MEUS ANÚNCIOS FAVORITOS</p>
                <p className="subtitle-default-page">Os bichinhos que tenho interesse em adotar</p>
                <Link to="/termo"><button className="purple">TERMO DE ADOÇÃO</button></Link>
                <div id="content-itens-my-favourite-announcements">
                    <ContentMyAnnouncements/>
                </div>
            </div>)}
        </div>
    )
}