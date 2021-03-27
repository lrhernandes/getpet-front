import React from 'react';
import './styles.css';

import { IoIosFemale, IoIosMale, IoIosCalendar, IoMdHelpCircleOutline, IoIosResize } from "react-icons/io";
import { MdFavoriteBorder, MdFavorite, MdLocationOn} from "react-icons/md";
import {Link} from 'react-router-dom';
import api from '../../services/api';

import { useEffect } from 'react';
import { useState } from 'react';

export default function AnnouncementItemFromList({ann}){
    const user = localStorage.getItem('user-id');
    const [isFavorite, setIsFavorite] = useState(false)
    const [textAge, setTextAge] = useState('')
    const [textSize, setTextSize] = useState('')

    useEffect(()=>{
        async function handleAllFavorites(){
            const fav = await api.get(`/allfavourites/${user}`)
            for(var i=0; i<fav.data.length; i++){
                if(fav.data[i].announcementId === ann.id){
                    setIsFavorite(true)
                }
            }
        }
        async function handleGetImg(){
            const img = await api.get(`/img/${ann.id}`)
            console.log(img)
        }
        handleAllFavorites();
        handleGetImg()
    },[ann])

    useEffect(()=>{
        function handleData(){
            switch (ann.age) {
                case 'puppy':
                  setTextAge("Filhote")
                  break;
                case 'adult':
                    setTextAge("Adulto")
                    break;
                case 'Elderly':
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

    async function handleFavorite(e){
        try{
            const fav = await api.post(`/addfavourite/${ann.id}/${user}/`).then(()=> {
                setIsFavorite(true)
            });
        }catch(err){
            alert(err);
        }
    }

    async function handleRemoveFavorite(e){
        try{
            const fav = await api.delete(`/deletefavourite/${ann.id}/${user}/`).then(()=> {
                setIsFavorite(false)
            });
        }catch(err){
            alert(err);
        }
    }
    function handleOpenAnnouncement(e){
        const win = window.open(`/announcement/${ann.id}`, "_blank")
        win.onfocus = () => window.blur();
    }
    return (
        <a>
            {ann &&(
                <Link onClick={handleOpenAnnouncement}>
                    <div className="announcement__item">
                        <div className="announcement__item__picture">
                        </div>
                        <div className="announcement___item___description">
                            <div className="name-and-fav">
                                <p className="description-announcement-item-from-list-name">{ann.name}</p>
                                <div className="content-favorite-icon-announcement-item-from-list">
                                    {user && (
                                        <div>
                                        {isFavorite &&  (
                                            <Link title="Remover anúncio dos favoritos"onClick={handleRemoveFavorite}> <MdFavorite size={20} className="favorite-announcement-item-from-list-icon"/></Link>    
                                        )}
                                        {!isFavorite &&  (
                                            <Link title="Adicionar anúncio aos favoritos"onClick={handleFavorite}> <MdFavoriteBorder size={20} className="favorite-announcement-item-from-list-icon"/></Link>    
                                        )}</div>
                                    )}
                                </div>
                            </div>
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
                        </div>
                    </div>
                </Link>
            )}
            {/* {ann && (
                <Link onClick={handleOpenAnnouncement}>
                    <div className="announcement-item-from-list">
                        <div className="image-announcement-item-from-list">
                        </div>
                        <div className="description-announcement-item-from-list">
                            <div className="name-and-fav">
                                <p className="description-announcement-item-from-list-name">{ann.name}</p>
                                <div className="content-favorite-icon-announcement-item-from-list">
                                    {isFavorite &&  (
                                        <Link onClick={handleRemoveFavorite}> <MdFavorite size={20} className="favorite-announcement-item-from-list-icon"/></Link>    
                                    )}
                                    {!isFavorite &&  (
                                        <Link onClick={handleFavorite}> <MdFavoriteBorder size={20} className="favorite-announcement-item-from-list-icon"/></Link>    
                                    )}
                                    
                                </div>
                            </div>
                            <p className="description-announcement-item-from-list-descript"> <MdLocationOn size={12}/> {ann.city}, {ann.uf}</p>
                            <div className="caracteristicas-announcement">
                                <div id="arredondar-first-radio">
                                    {ann.sex === 'fem' && (
                                        <div>
                                            <img alt="img announcement item" src={f}/>
                                            <p>FÊMEA</p>
                                        </div>
                                    )}
                                    {ann.sex === 'mas' && (
                                        <div>
                                            <img alt="img announcement item" src={m}/>
                                            <p>MACHO</p>
                                        </div>
                                    )}
                                    {ann.sex === 'notDefined' && (
                                        <div>
                                            <img alt="img announcement item" src={u}/>
                                            <p>INDEFINIDO</p>
                                        </div>
                                    )}
                                    
                                </div>
                                <div id="arredondar-second-radio">
                                    {ann.age === 'puppy' && (
                                        <div>
                                            <img alt="img announcement item" src={ninho}/>
                                            <p>FILHOTE</p>
                                        </div>
                                    )}
                                    {ann.age === 'adult' && (
                                        <div>
                                            <img alt="img announcement item" src={pintinho}/>
                                            <p>ADULTO</p>
                                        </div>
                                    )}
                                    {ann.age === 'elderly' && (
                                        <div>
                                            <img alt="img announcement item" src={galinha}/>
                                            <p>IDOSO</p>
                                        </div>
                                    )}
                                </div>
                                <div id="arredondar-last-radio">
                                    {ann.size === 'mini' && (
                                        <div>
                                            <img alt="img announcement item" src={regua}/>
                                            <p>MINI</p>
                                        </div>
                                    )}
                                    {ann.size === 'small' && (
                                        <div>
                                            <img alt="img announcement item" src={regua}/>
                                            <p>PEQUENO</p>
                                        </div>
                                    )}
                                    {ann.size === 'medium' && (
                                        <div>
                                            <img alt="img announcement item" src={regua}/>
                                            <p>MÉDIO</p>
                                        </div>
                                    )}
                                    {ann.size === 'big' && (
                                        <div>
                                            <img alt="img announcement item" src={regua}/>
                                            <p>GRANDE</p>
                                        </div>
                                    )}
                                    {ann.size === 'giant' && (
                                        <div>
                                            <img alt="img announcement item" src={regua}/>
                                            <p>GIGANTE</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </Link>
            )} */}


            {!ann && (
                <div>
                    <h3>Nenhum anúncio nessa cidade :(</h3>
                </div>
            )}
        </a>
    )
}