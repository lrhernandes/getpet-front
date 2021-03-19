import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import Gallery from '../../templates/GalleryAnnouncement'
import ContentAnnouncement from '../../templates/ContentAnnouncement'

export default function Announcement(){
    const [announcement, setAnnouncement] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            try{
                const ann = await api.get(`/announcement/${id}`);
                setAnnouncement(ann.data);
                console.log(announcement)
            }catch(err){
                alert(err);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="default-wrapper" id="announcement-page">
        <p className="title-default-page">{announcement.name}</p>
        <p className="subtitle-default-page">{announcement.city}/{announcement.uf}</p>
        
            <div className="default-page-content-wrapper">
                <div className="announcement-sections-grid">
                    <section className="section-gallery-announcement-sections">
                        <Gallery/>
                    </section>
                    <section className="section-content1-announcement-sections">
                        <ContentAnnouncement ann={announcement}/>
                    </section>
                </div>
            </div>
        </div>
    )
}