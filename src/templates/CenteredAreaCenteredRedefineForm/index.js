import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import api from '../../services/api'
import { useState } from 'react';

export default function ContentAreaCenteredRedefineForm(){
    var reEmail = false;

    const [email, setEmail] = useState(null);

    async function handleGetPassword(){
        handleEmail();
        if(reEmail){
            await api.get(`/client/password/${email}`).then(()=>{
                alert("Sua senha foi enviada para o e-mail inserido");
            }).catch((err)=>{
                alert("Ooops, parece que algo está errado")
            });
        }
    }

    function handleEmail(){
        const patternMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        reEmail = patternMail.test(String(email).toLowerCase());
        if(reEmail) {
            document.getElementById("msgemail").innerHTML="";
            document.getElementById("email").style.border= '1px solid green';
            reEmail = true
        }
        else{
            document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
            document.getElementById("email").style.border= '1px solid tomato';
            document.getElementById("email").style.marginBottom= '5px';
            reEmail = false
        }
    }

    return (
        <div className="content-area-centered">
            <section>
                <div className="content-left-about">
                    <div className="sobrepor"/>
                </div>
            </section>
            <section>
                <div className="content-right-exception redefine-right">
                    <div className="x-icon"><Link to="/"><MdClose size={20}/></Link></div>
                    <div className="redefine-right-content">     
                        <div className="login-item-wrapper">
                            <label><span className="span__obrigatory__item">*</span> E-mail</label><br/>
                            <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@email.com"/>
                            <span className="validationError" id="msgemail"/>
                        </div>
                        <button onClick={handleGetPassword} className="purple">RECUPERAR SENHA</button>
                    </div>
                    <a href="javascript:history.back()" className="back-link"><MdArrowBack/>Voltar</a>
                </div>
            </section>
        </div>
    )
}