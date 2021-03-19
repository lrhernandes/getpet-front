import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import {MdInsertDriveFile, MdMail, MdPhoneIphone} from 'react-icons/md'

export default function ModalAdopt({user}){
    const [donor, setDonor] = useState([]);
    
    useEffect(()=>{
        async function fetchData() {
            const u = await api.get(`/client/${user}`);
            setDonor(u.data);
        }
        fetchData();
    }, []);

    return (
        <div className="modal-adopt">
            <div className="modal-adopt-wrapper">
                <div className="modal-adopt-content-wrapper">
                    <p className="modal-adopt-title"><strong>Quer adotar esse bichinho?</strong></p>
                    <p className="modal-adopt-subtitle">Entre em contato com o doador:</p>
                    <p className="modal-adopt-content">Utilize os botões abaixo para falar com o doador</p>
                    <div className="modal-adopt-contact-wrappper">
                        <a className="none-link" target="_blank" href={`https://wa.me/${donor.whatsapp}`}>
                            <div className="modal-adoption-contact">
                                WhatsApp
                            </div>
                        </a>
                        <a className="none-link" target="_blank" href={`mailto:${donor.email}`}>
                            <div className="modal-adoption-contact">
                                <p>
                                Email</p>
                            </div>
                        </a>
                    </div>
                    <p id="second-title-modal" className="modal-adopt-title"><strong>Não se esqueça:</strong></p>
                    <p className="modal-adopt-subtitle">Leia os termos com atenção</p>
                    <p className="modal-adopt-content">Ao adotar um pet na plataforma GetPet você concorda com os termos de adoção responsável.</p>
                    <Link className="default-link" to="/termo" target="_blank"><div className="modal-adoption-file">
                        <p><MdInsertDriveFile className="icon-modal-adoption-contact" size={20}/>
                        Termo de Adoção</p>
                    </div></Link>
                    </div>
                <div className="modal-adopt-image-wrapper">
                </div>
            </div>
        </div>
    )
}