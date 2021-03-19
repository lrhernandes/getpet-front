import React, {useState, useEffect} from 'react';
import './styles.css';


import { IoIosFemale, IoIosMale, IoIosCalendar, IoMdHelpCircleOutline, IoIosResize } from "react-icons/io";
import { MdFavoriteBorder, MdLocationOn} from "react-icons/md";
import {Link} from 'react-router-dom';

export default function AnnouncementItemFromInicio({ann}){
    const [textAge, setTextAge] = useState('')
    const [textSize, setTextSize] = useState('')
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
    function openAnnouncement(){
        window.open(`/announcement/${ann.id}`, "_blank")
    }
    return (
        <Link onClick={openAnnouncement}>
            <div className="announcement__item">
                <div className="announcement__item__picture">
                </div>
                <div className="announcement___item___description">
                    <div className="name-and-fav">
                        <p className="description-announcement-item-from-list-name">{ann.name}</p>
                        <div className="content-favorite-icon-announcement-item-from-list">
                            <Link to="/login" title="Adicionar anúncio aos favoritos"><MdFavoriteBorder size={20} className="favorite-announcement-item-from-list-icon"/></Link>
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
    )
}