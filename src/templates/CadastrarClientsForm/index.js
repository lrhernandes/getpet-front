import React, { useEffect, useState } from 'react';
import './styles.css'
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function CadastrarClientForm(){
    const history = useHistory();
    useEffect(() => {
        function loadSelect(){
            return (function(uf, city, api) {
                function createOption (value, text) {
                    const option = document.createElement('option')
                    option.value = value
                    option.innerHTML = text
                    return option
                }
                function pushSelect (item, el) {
                    const opt = createOption(item.geonameId, item.toponymName)
                    el.append(opt)
                } 
                function handleAjax (res, el) {   
                    res.geonames.forEach(each => {
                    pushSelect(each, el)
                })
            } 
            function getinfo (geoid, hasUf = false) {
                fetch(`https://www.geonames.org/childrenJSON?geonameId=${geoid}`)
                    .then(res => res.json())
                    .then(res => {
                    if(hasUf) {
                        city.length = 1; //clear
                        handleAjax(res, city)
                    } else {
                        handleAjax(res, uf)
                    }
                });
            }
            function init () {
                uf.addEventListener('change', function() {
                    getinfo(this.value, true)
                })
                getinfo(api)
            }init()})(
                document.getElementById('uf'),
                document.getElementById('cidade'),
                3469034
            );
        }
        loadSelect();
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [uf, setUF] = useState('');
    const [city, setCity] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');

    var reMail, reFirstName, reLastName, reWhatsapp, rePassword, reCity, reUf

    async function handleRegister(e){
        e.preventDefault();
        const active = true;
        
        handleEmail();
        handleWhatsapp();
        handleFirstName();
        handleLastName();
        handlePassword();
        handleUf();
        handleCity();

        if(reMail, reWhatsapp, reFirstName, reLastName, rePassword){
            const data = {firstName, lastName, password, email, uf, city, whatsapp, active};
            console.log(data)
            try{
                const response = await api.post('/client', data);
                if(response){
                    localStorage.setItem('app-token', response.data.token);
                    localStorage.setItem('user-id', response.data.id);
                    history.push('/home');
                    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                    api.defaults.headers.User = `Bearer ${response.data.id}`;
                }
                //alert(`Seu token: ${response.data.token} <br/>Seu id: ${response.data.id}`)
            }catch(err){
                alert(err);
            }
        }
    }

    function validateFirstName(value){
        setFirstName(value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+/i, ''))
    }
    function validateLastName(value){
        setLastName(value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+/i, ''))
    }
    function validateWhatsapp(value){
        const n = value.replace(/\D/g, '')
        setWhatsapp(n)
    }

    function handleEmail(){
        const patternMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        reMail = patternMail.test(String(email).toLowerCase());
        if(reMail) {
            document.getElementById("msgemail").innerHTML="";
            document.getElementById("email").style.border= '1px solid green';
            reMail = true
        }
        else{
            document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
            document.getElementById("email").style.border= '1px solid tomato';
            document.getElementById("email").style.marginBottom= '5px';
            reMail = false
        }
    }

    function handleWhatsapp(){
        const patternWhatsapp =  /\d{13,13}/;
        reWhatsapp = patternWhatsapp.test(String(whatsapp).toLowerCase())
        if(reWhatsapp && whatsapp != null && whatsapp != ''){
            document.getElementById("msgwhatsapp").innerHTML="";
            document.getElementById("whatsapp").style.border= '1px solid green';
            reWhatsapp = true
        }else{
            document.getElementById("msgwhatsapp").innerHTML="<font color='red'>Telefone inválido</font>";
            document.getElementById("whatsapp").style.border= '1px solid tomato';
            document.getElementById("whatsapp").style.marginBottom= '5px';
            reWhatsapp = false
        }
    }

    function handlePassword(){
        if(password !== null && password != "" && password != undefined){
            document.getElementById("msgpassword").innerHTML="";
            document.getElementById("password").style.border= '1px solid green';
            rePassword = true
        }else {
            document.getElementById("msgpassword").innerHTML="<font color='red'>Senha inválida </font>";
            document.getElementById("password").style.border= '1px solid tomato';
            document.getElementById("password").style.marginBottom= '-2px';
            rePassword = false
        }
    }

    function handleFirstName(){
        if(firstName !== null && firstName != "" && firstName != undefined){
            document.getElementById("msgFirstName").innerHTML="";
            document.getElementById("firstName").style.border= '1px solid green';
            reFirstName = true
        }else {
            document.getElementById("msgFirstName").innerHTML="<font color='red'>Campo obrigatório</font>";
            document.getElementById("firstName").style.border= '1px solid tomato';
            document.getElementById("firstName").style.marginBottom= '-2px';
            reFirstName = false
        }
    }

    function handleLastName(){
        if(lastName !== null && lastName != "" && lastName != undefined){
            document.getElementById("msgLastName").innerHTML="";
            document.getElementById("lastName").style.border= '1px solid green';
            reLastName = true
        }else {
            document.getElementById("msgLastName").innerHTML="<font color='red'>Campo obrigatório</font>";
            document.getElementById("lastName").style.border= '1px solid tomato';
            document.getElementById("lastName").style.marginBottom= '-2px';
            reLastName = false
        }
    }

    function handleUf(){
        if(uf !== null && uf != "" && uf != undefined){
            document.getElementById("msguf").innerHTML="";
            document.getElementById("uf").style.border= '1px solid green';
            reUf = true
        }else {
            document.getElementById("msguf").innerHTML="<font color='red'>Campo obrigatório</font>";
            document.getElementById("uf").style.border= '1px solid tomato';
            document.getElementById("uf").style.marginBottom= '-2px';
            reUf = false
        }
    }

    function handleCity(){
        if(city !== null && city != "" && city != undefined){
            document.getElementById("msgcity").innerHTML="";
            document.getElementById("cidade").style.border= '1px solid green';
            reCity = true
        }else {
            document.getElementById("msgcity").innerHTML="<font color='red'>Campo obrigatório</font>";
            document.getElementById("cidade").style.border= '1px solid tomato';
            document.getElementById("cidade").style.marginBottom= '-2px';
            reCity = false
        }
    }

    return (
            <div className="cadastrar-client-form">
                <form onSubmit={handleRegister}>
                    
                    <h2>Cadastre-se</h2>
                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> Nome</label><br/>
                        <input type="text" id="firstName" placeholder="Nome" value={firstName} onChange={e => validateFirstName(e.target.value)}/> 
                        <span className="validationError" id="msgFirstName"/>
                    </div>


                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> Sobrenome</label><br/>
                        <input type="text" id="lastName" placeholder="Sobrenome" value={lastName} onChange={e => validateLastName(e.target.value)}/>
                        <span className="validationError" id="msgLastName"/>    
                    </div>

                    
                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> E-mail</label><br/>
                        <input type="text"id="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                        <span className="validationError" id="msgemail"/>
                    </div>


                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> WhatsApp</label><br/>
                        <p className="form-sujest">Com código do país e área</p>
                        <input type="text" id="whatsapp" minlength="13" maxlength="13" placeholder="+00 (00) 00000-0000" value={whatsapp} onChange={e => validateWhatsapp(e.target.value)}/>
                        <span className="validationError" id="msgwhatsapp"/>
                    </div>

                    
                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> UF</label><br/>
                        <select id="uf" value={uf} onChange={e => setUF(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}><option defaultValue >Estado</option></select>
                        <span className="validationError" id="msguf"/>
                    </div>


                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> Cidade</label><br/>
                        <select id="cidade" value={city} onChange={e => setCity(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}> <option defaultValue >Cidade</option></select>
                        <span className="validationError" id="msgcity"/>
                    </div>


                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> Senha</label><br/>
                        <p className="form-sujest">Use no mínimo 6 caracteres</p>
                        <input  type="password" id="password" minlength="6" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                        <span className="validationError" id="msgpassword"/>
                    </div>

                    <div className="button-group-space">
                        <Link to="/"><button className="negative-purple">CANCELAR</button></Link>
                        <button className="purple" type="submit">CADASTRE-SE</button>
                    </div>
                </form>
            </div>
    )
}