//IMPORTS
import React, {useEffect} from 'react';
import './styles.css';
import { MdCopyright } from "react-icons/md";
import Modal from '../../modal/Notify'
import {Link, useHistory} from 'react-router-dom';
import FormularioLocalizar from '../../templates/LocalizarAnimaisForm';
import NovosAnimais from '../../templates/NovosAnimais';
import BannerPrincipal from '../../templates/BannerPrincipal';
import MenuHorizontal from '../../templates/MenuHorizontal';

export default function TelaPrincipal(){
    const history = useHistory();
    const modalRef = React.useRef();
    useEffect(() => {
        if(localStorage.getItem('user-id') && localStorage.getItem('app-token')){
            history.push('/home');
        }
        window.alert("Olá, banca! Como estou usando um host gratuito para o banco de dados, vou ter que atuaizar ele a cada semana, então no dia 01/04 e no dia 08/04 em alguma parte do dia o banco de dados vai ser zerado, o que provavelmente vai gerar um pouquinho de instabilidade. Abraços!")
        openModal();
    },[]);
    
    const openModal = () => {
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.closeModal()
    }

    return (
        <div className="page">
            {/* NOTIFICAÇÃO DE TERMOS DE ADOÇÃO */}
            <Modal ref={modalRef}>
                <div>
                    <div className="notifica-card">
                        <p>Ao doar e adotar com o GetPet você concorda em seguir os <Link target="_blank" to="/termo">termos de adoção responsável</Link> da plataforma. </p>
                        <button onClick={closeModal} className="purple">Concordo</button>
                    </div>
                </div>
            </Modal>
            
            <div className="content-area">

                {/* MENU HORIZONTAL E BANNER */}
                <header>
                    <MenuHorizontal/>
                    <BannerPrincipal/>
                </header>

                {/* FORMULÁRIO DE BUSCA POR ANÚNCIOS */}
                <div className="form-content">
                    <div className="center-form">
                        <h1 className="title-seccion">Buscar bichinhos ;)</h1>
                        <p className="subtitle-seccion">Insira os dados da sua cidade para encontrarmos os pets mais perto de você!</p>
                        <FormularioLocalizar/>
                    </div>
                </div>

                {/* NOVOS ANÚNCIOS NO SITE*/}
                <div className="new-announcements-content">
                    <NovosAnimais/>
                </div>

                {/* RODAPÉ */}
                <hr/>
                <p className="copy">
                    2020 <MdCopyright size={12}/> GetPet
                </p>
                
            </div>
        </div>
    );
}