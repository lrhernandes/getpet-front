import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api'
import Item from '../AnnouncementItemFromInicio'

export default function NovosAnimais(){
    const [announcements, setAnnouncements] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const resp = await api.get(`/announcements`);
            setAnnouncements(resp.data);
            console.log(resp)
        }
        fetchData();
    },[])
    return (
        <div className="center-announcements">
            <h1 className="title-seccion">Novos por aqui</h1>
            <p className="subtitle-seccion">Alguns pets que achamos que você vai curtir!</p>

                <div className="small-announcement">
                    {announcements.map( announce => 
                        <div className="item">
                            <Item ann={announce} title={announce.name} key={announce.id} className="announcement-link"/>
                        </div>
                    )}
                </div>

        </div>
    )
}