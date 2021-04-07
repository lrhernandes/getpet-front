import React from 'react';
import './styles.css'
import api from '../../services/api';

import { IoIosFemale, IoIosMale, IoIosCalendar, IoMdHelpCircleOutline, IoIosResize } from "react-icons/io";
import { MdDelete, MdLocationOn} from "react-icons/md";
import {Link, useHistory} from 'react-router-dom';


import { useEffect } from 'react';
import { useState } from 'react';

export default function MyAnnouncementItem({ann, setAnnouncements}){
    const history = useHistory();
    const [textAge, setTextAge] = useState('')
    const [textSize, setTextSize] = useState('')
    const [url, setUrl] = useState('https://closekids.com.br/wp-content/uploads/2016/10/default-placeholder.png')

    async function handleDelete(e){
        const response = window.confirm("Tem certeza que deseja excluir o anúncio?");
        if(response){
            try{
                await api.delete(`/announcements/delete/${ann.userId}/${ann.id}`);
                setAnnouncements(state => state.filter(announcement => announcement.id !== ann.id));    
                history.push(`/myannouncements`);
            }catch(err){
                alert(err);
            }
        }
    }

    useEffect(()=>{
        async function handleGetImg(){
            const response = await api.get(`/img/${ann.id}`).then(response => response.data);
            if(response.length>0){
                setUrl(response[0].url)
            }
        }
        handleGetImg()
    },[])

    useEffect(()=>{
        function handleData(){
            switch (ann.age) {
                case 'puppy':
                  setTextAge("Filhote")
                  break;
                case 'adult':
                    setTextAge("Adulto")
                    break;
                case 'elderly':
                    setTextAge("Idoso")
                    break;
            }
            switch (ann.size) {
                case 'mini':
                  setTextSize("Mini")
                  break;
                case 'small':
                    setTextSize("Pequeno")
                    break;
                case 'medium':
                    setTextSize("Médio")
                    break;
                case 'big':
                    setTextSize("Grande")
                    break;
                case 'giant':
                    setTextSize("Gigante")
                    break;
            }
        }
        handleData()
    })
    function handleOpenAnnouncement(e){
        history.push(`/announcement/${ann.id}`);
    }
    return (
            <div className="announcement__item">
                <Link onClick={handleOpenAnnouncement}>
                    <div style={{backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}} className="announcement__item__picture" ></div>
                </Link>
                <div className="announcement___item___description">
                    <div className="name-and-fav">
                        <Link onClick={handleOpenAnnouncement}>
                            <p className="description-announcement-item-from-list-name">{ann.name}</p>
                        </Link>
                        <div className="content-favorite-icon-announcement-item-from-list">
                        <Link onClick={handleDelete} title="Deletar anúncio"><MdDelete size={20} className="favorite-announcement-item-from-list-icon"/></Link>
                        </div>
                    </div>
                    <Link onClick={handleOpenAnnouncement}>
                        <p className="description-announcement-item-from-list-descript"> <MdLocationOn size={12}/> {ann.city}, {ann.uf}</p>
                        <div className="announcement__item__description__animal__item-wrapper">
                            {ann.sex === 'fem' && (
                                <p className="announcement__item__description__animal-item"> <IoIosFemale/>Fêmea</p>
                            )}
                            {ann.sex === 'mas' && (
                                <p className="announcement__item__description__animal-item"> <IoIosMale/>Macho</p>
                            )}
                            {ann.sex === 'notDefined' && (
                                <p className="announcement__item__description__animal-item"><IoMdHelpCircleOutline/>Indefinido</p>
                            )}

                            <p className="announcement__item__description__animal-item">  <IoIosCalendar/>{textAge}</p>
                            <p className="announcement__item__description__animal-item">  <IoIosResize/>{textSize}</p>
                        </div>
                    </Link>
                </div>
            </div>
        // <Link onClick={handleOpenAnnouncement}>
        //     <div className="announcement-item-from-list">
        //         <div className="image-announcement-item-from-list">
        //         </div>
        //         <div className="description-announcement-item-from-list">
        //             <div className="name-and-fav">
        //                 <p className="description-announcement-item-from-list-name">{ann.name}</p>
        //                 <div className="content-favorite-icon-announcement-item-from-list">
        //                     <Link onClick={handleDelete} title="Deletar anúncio"><MdDelete size={20} className="favorite-announcement-item-from-list-icon"/></Link>
        //                 </div>
        //             </div>
        //             <p className="description-announcement-item-from-list-descript"> <MdLocationOn size={12}/> {ann.city}, {ann.uf}</p>
        //             <div className="caracteristicas-announcement">
        //                 <div id="arredondar-first-radio">
        //                     {ann.sex === 'fem' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={f}/>
        //                             <p>FÊMEA</p>
        //                         </div>
        //                     )}
        //                     {ann.sex === 'mas' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={m}/>
        //                             <p>MACHO</p>
        //                         </div>
        //                     )}
        //                     {ann.sex === 'notDefined' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={u}/>
        //                             <p>INDEFINIDO</p>
        //                         </div>
        //                     )}
                            
        //                 </div>
        //                 <div id="arredondar-second-radio">
        //                     {ann.age === 'puppy' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={ninho}/>
        //                             <p>FILHOTE</p>
        //                         </div>
        //                     )}
        //                     {ann.age === 'adult' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={pintinho}/>
        //                             <p>ADULTO</p>
        //                         </div>
        //                     )}
        //                     {ann.age === 'elderly' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={galinha}/>
        //                             <p>IDOSO</p>
        //                         </div>
        //                     )}
        //                 </div>
        //                 <div id="arredondar-last-radio">
        //                     {ann.size === 'mini' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={regua}/>
        //                             <p>MINI</p>
        //                         </div>
        //                     )}
        //                     {ann.size === 'small' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={regua}/>
        //                             <p>PEQUENO</p>
        //                         </div>
        //                     )}
        //                     {ann.size === 'medium' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={regua}/>
        //                             <p>MÉDIO</p>
        //                         </div>
        //                     )}
        //                     {ann.size === 'big' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={regua}/>
        //                             <p>GRANDE</p>
        //                         </div>
        //                     )}
        //                     {ann.size === 'giant' && (
        //                         <div>
        //                             <img alt="img cadastro de anúncios" src={regua}/>
        //                             <p>GIGANTE</p>
        //                         </div>
        //                     )}
        //                 </div>
        //             </div>
                    
        //         </div>
        //     </div>
        // </Link>
    )
}