import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';

import Announcement from '../../templates/MyAnnouncementItem';

export default function ContentMyAnnouncementsItens(){
    const [announcements, setAnnouncements] = useState([]);
    
    useEffect(()=>{
        async function fetchData() {
            const userId = localStorage.getItem('user-id');
            const resp = await api.get(`/clientannouncements/${userId}`);
            setAnnouncements(resp.data);
        }
        fetchData();
    }, []);

    return (
        <div className="box-home-announcements-animals">
            <ul className="home-announcements-animals">
                {announcements.map( announce => 
                    <li title={announce.name} className="list-item-temperament" key={announce.id}>
                        <Announcement ann={announce} setAnnouncements={setAnnouncements}/>
                    </li>
                )}
            </ul>
        </div>
    )
}