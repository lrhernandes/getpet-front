import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import './styles.css';
import { MdClose } from "react-icons/md";
import Modal from '../../modal/AnnouncementAdopt'
import {Link} from 'react-router-dom';

import ModalAdopt from '../ModalAdopt';

import cachorro from '../../assets/animais (2).svg';
import gato from '../../assets/gato.svg';
import reptil from '../../assets/animais (1).svg';
import hamster from '../../assets/hamster.svg';
import equino from '../../assets/cavalo.svg';
import outros from '../../assets/animais-de-estimacao.svg';

import f from '../../assets/femea.svg'
import m from '../../assets/fluido-de-genero.svg'
import u from '../../assets/simbolo-sexual.svg'

import ninho from '../../assets/ninho.svg'
import pintinho from '../../assets/pintinho.svg'
import galinha from '../../assets/galinha.svg'

import regua from '../../assets/regua.svg'

export default function ContentAnnouncement({ann}){
    const history = useHistory();
    const modalRef = React.useRef();
    const [temp, setTemp] = useState([]);
    const [userId, setUserId] = useState([]);

    /** SEPARAR O TEMPERAMENTO EM UM ARRAY */
    useEffect(() => {
        setUserId(localStorage.getItem('user-id'));
        function handleTemperament() {
            var str = `${ann.temperament}`;
            var resultado = str.split(",");
            console.log(resultado);
            return resultado;
        }
        const result = handleTemperament();
        function setTemperamentState(result){
            setTemp(result)
        }
        setTemperamentState();
    }, [ann]);


    const openModal = () => { modalRef.current.openModal() }
    const closeModal = () => { modalRef.current.closeModal() }

    function handleEditAnnouncement(){
        history.push(`/announcement/edit/${ann.id}`)
    }

    return (
        <div className="content-announcement">
            <Modal ref={modalRef}>
                <div onClick={closeModal} className="x-icon"><Link><MdClose size={20}/></Link></div>
                <div> <ModalAdopt user={ann.userId}/> </div>
            </Modal>
                <div className="content-announcement-sections" id="style-scroll">
                    <div className="space-scroll">
                        <p className="current-day">INSERIDO EM {ann.createdAt}</p>
                        <p className="title-announcement-sections" id="first-title-announcement-section">Que bichinho é esse?</p>
                        <p className="description-announcement-section">{ann.description}</p>
                        
                        <p className="title-announcement-sections">Quais são suas características?</p>
                        <div className="caracteristicas-announcement-section">
                            <div id="arredondar-first-radio">
                                {ann.type === 'dog' && (
                                    <div>
                                        <img src={cachorro}/>
                                        <p>CÃO</p>
                                    </div>
                                )}
                                {ann.type === 'cat' && (
                                    <div>
                                        <img src={gato}/>
                                        <p>GATO</p>
                                    </div>
                                )}
                                {ann.type === 'reptile' && (
                                    <div>
                                        <img src={reptil}/>
                                        <p>RÉPTIL</p>
                                    </div>
                                )}
                                {ann.type === 'rodent' && (
                                    <div>
                                        <img src={hamster}/>
                                        <p>ROEDOR</p>
                                    </div>
                                )}
                                {ann.type === 'equino' && (
                                    <div>
                                        <img src={equino}/>
                                        <p>EQUINO</p>
                                    </div>
                                )}
                                {ann.type === 'other' && (
                                    <div>
                                        <img src={outros}/>
                                        <p>OUTROS</p>
                                    </div>
                                )}
                            </div>
                            <div id="arredondar-second-radio">
                                {ann.sex === 'fem' && (
                                    <div>
                                        <img src={f}/>
                                        <p>FÊMEA</p>
                                    </div>
                                )}
                                {ann.sex === 'mas' && (
                                    <div>
                                        <img src={m}/>
                                        <p>MACHO</p>
                                    </div>
                                )}
                                {ann.sex === 'notDefined' && (
                                    <div>
                                        <img src={u}/>
                                        <p>INDEFINIDO</p>
                                    </div>
                                )}
                            </div>
                            <div id="arredondar-third-radio">
                                {ann.age === 'puppy' && (
                                    <div>
                                        <img src={ninho}/>
                                        <p>FILHOTE</p>
                                    </div>
                                )}
                                {ann.age === 'adult' && (
                                    <div>
                                        <img src={pintinho}/>
                                        <p>ADULTO</p>
                                    </div>
                                )}
                                {ann.age === 'elderly' && (
                                    <div>
                                        <img src={galinha}/>
                                        <p>IDOSO</p>
                                    </div>
                                )}
                            </div>
                            <div id="arredondar-last-radio">
                                {ann.size === 'mini' && (
                                    <div>
                                        <img src={regua}/>
                                        <p>MINI</p>
                                    </div>
                                )}
                                {ann.size === 'small' && (
                                    <div>
                                        <img src={regua}/>
                                        <p>PEQUENO</p>
                                    </div>
                                )}
                                {ann.size === 'medium' && (
                                    <div>
                                        <img src={regua}/>
                                        <p>MÉDIO</p>
                                    </div>
                                )}
                                {ann.size === 'big' && (
                                    <div>
                                        <img src={regua}/>
                                        <p>GRANDE</p>
                                    </div>
                                )}
                                {ann.size === 'giant' && (
                                    <div>
                                        <img src={regua}/>
                                        <p>GIGANTE</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="content-adopt-button">
                            {ann.userId != userId && (
                                <button onClick={openModal} className="purple">QUERO ADOTAR!</button>
                            )}
                            {ann.userId === userId && (
                                <button onClick={handleEditAnnouncement} className="tomato">EDITAR ANÚNCIO</button>
                            )}
                        </div>
                        {ann.temperament != "null" && (
                            <div className="temperamento-announcement-section">
                                <div className="temperamento-announcement-section-left">
                                    <p className="title-announcement-sections">Temperamento do pet</p>
                                        <p className="temperament-text">{ann.temperament}</p>
                                </div>
                            </div>
                        )}
                        <div className="historico-saude-announcement-section">
                            <p className="title-announcement-sections">Histórico de saúde</p>
                            <div className="saude-announcement-section">
                                <div className="content-list-saude-announcement-section">
                                    {ann.castrated && (
                                        <p className="checked-list-item-announcement-section"><div/><p>CASTRADO</p></p>
                                    )}
                                    {ann.vaccinated && (
                                        <p className="checked-list-item-announcement-section"><div/><p>VACINADO</p></p>
                                    )}
                                    {ann.dewormed && (
                                        <p className="checked-list-item-announcement-section"><div/><p>VERMIFUGADO</p></p>
                                    )}
                                    {ann.isSpecial && (
                                        <p className="checked-list-item-announcement-section"><div/><p>POSSUI NECESSIDADES ESPECIAIS</p></p>
                                    )}
                                </div>
                                {ann.specialDescription != "" && (
                                    <div className="content-description-saude-section">
                                        <p>Obs.: {ann.specialDescription}</p>    
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}