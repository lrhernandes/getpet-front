import React from 'react';
import {Link} from 'react-router-dom';
import { MdClose } from "react-icons/md";
import '../../js/select';
import CadastrarClientRegister from '../../templates/CadastrarClientsForm';
import './styles.css';

export default function ContentareaCenteredRegister(){
    return (
        <div className="content-area-centered">
            <section>
                <div className="content-left-register">
                </div>
            </section>
            <section>
                <div className="content-right-register">
                    <div className="x-icon"><Link to="/"><MdClose size={20}/></Link></div>
                    <div className="camada-fix">
                        <div className="form-register">
                            <CadastrarClientRegister/>
                        </div>              
                        <div className="bottom-register">
                            <p className="login-link"> <Link to="/login">Já possuo cadastro</Link></p>   
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}