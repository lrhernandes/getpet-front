import React, {useState, useEffect} from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom'
import api from "../../services/api"

export default function ContentClientSettings(){
    const [step, setStep] = useState(0);
    const [step2, setStep2] = useState(0);

    const [profile, setProfile] = useState([]);
    const [newProfile, setNewProfile] = useState([]);

    const [number, setNumber] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [uf, setUF] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');

    const user = localStorage.getItem('user-id');
    var reMail, reWhatsapp
    const history = useHistory();

    useEffect(() => {
        if(step === 1){
            loadSelect();
        }
    },[step]);

    useEffect(() => {
        async function handleProfileData(){
            const profile = await api.get(`/client/${user}`);
            const dataprofile = profile.data
            setProfile(dataprofile)

            setUF(dataprofile.uf)
            setCity(dataprofile.city)
            setEmail(dataprofile.email)
            setWhatsapp(dataprofile.whatsapp)
            setNumber(dataprofile.whatsapp.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, "+$1 ($2) $3-$4"))
        }
        handleProfileData()
    },[]);

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
            document.getElementById('city'),
            3469034
        );
    }

    function handleEmail(){
        const patternMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        reMail = patternMail.test(String(email).toLowerCase());
        if(reMail) {
            document.getElementById("emailmsg").innerHTML="";
            document.getElementById("mail").style.border= '1px solid green';
            reMail = true
        }
        else{
            document.getElementById("emailmsg").innerHTML="<font color='red'>E-mail inválido </font>";
            document.getElementById("mail").style.border= '1px solid tomato';
            document.getElementById("mail").style.marginBottom= '5px';
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

    function validateWhatsapp(value){
        const n = value.replace(/\D/g, '')
        setWhatsapp(n)
    }

    async function handleUpdateProfile(){
        handleEmail();
        handleWhatsapp();
        if (reMail && reWhatsapp){
            const data = {
                whatsapp: whatsapp,
                email: email,
                city: city,
                uf: uf
            }
            await api.put(`/client/settings/${user}/${user}`, data).then(()=>{
                alert("Perfil atualizado!");
                reloadProfile();
                setStep(0);
            })
        }else{
            alert("Oops, algo não está certo :(")
        }
    }

    async function reloadProfile(){
        const profile = await api.get(`/client/${user}`);
        const dataprofile = profile.data
        setProfile(dataprofile)
    } 

    return (
        <div className="content-client-settings">
            <div className="content-client-settings-left-wrapper" onMouseEnter={()=>{setStep2(1)}} onMouseLeave={()=>{setStep2(0)}}>
                {step === 1 && step2 === 1 && (
                    <div className="change-profile-pic-box" type="image">
                        <label for="change-profile-pic-label"><p>trocar foto de perfil</p></label>
                        <input type="file" id="change-profile-pic-label"/>
                    </div>
                )}
            </div>
            {step === 0 && (
                <div className="content-client-settings-right-wrapper">
                    <p className="name-client-settings">{profile.firstName} {profile.lastName}</p>
                    <div onClick={()=>{setStep(1)}} className="profile-edit">Editar perfil</div>
                    <p className="description-announcement-section">{profile.city} / {profile.uf}</p>

                    <p className="title-announcement-sections">Contato</p>
                    <p className="description-announcement-section">Whatsapp: {number}</p>
                    <p className="description-announcement-section">Email: {profile.email}</p>
                </div>
            )}
            
            {step === 1 && (
                <div className="content-client-settings-right-wrapper">
                    <div className="edit-client-settings-form">
                        <p className="name-client-settings">{profile.firstName} {profile.lastName}</p>
                        <p className="modal-adopt-subtitle">Endereço</p>
                        <div className="modal-client-settings-address-wrapper">
                            <div className="modal-client-settings-address-uf">
                                <label className="form-label-new-announcement">UF</label>
                                <select id="uf" onChange={e => setUF(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}><option defaultValue>{uf}</option></select>
                                <span className="validationError" id="ufmsg"/>
                            </div>
                            <div className="modal-client-settings-address-city">
                                <label className="form-label-new-announcement">Cidade</label>
                                <select id="city" onChange={e => setCity(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}><option defaultValue>{city}</option></select>
                                <span className="validationError" id="msgcity"/>
                            </div>
                        </div>

                        <p className="modal-adopt-subtitle">Contato</p>
                        <div className="modal-client-settings-contact-whatsapp">
                            <label className="form-label-new-announcement">WhatsApp</label>
                            <input type="text" id="whatsapp" maxlength="13" placeholder="+00 (00) 00000-0000" value={whatsapp} onChange={e => validateWhatsapp(e.target.value)}/>
                            <span className="validationError" id="msgwhatsapp"/>
                        </div>

                        <div className="modal-client-settings-contact-email">
                            <label className="form-label-new-announcement">E-mail</label>
                            <input type="text" id="mail" value={email} onChange={e => setEmail(e.target.value)}/>
                            <span className="validationError" id="emailmsg"/>
                        </div>
                        <div className="content-buttons-client-settings">
                            <button className="negative-purple" onClick={()=>{setStep(0)}}>DESCARTAR</button>
                            <button className="purple" onClick={handleUpdateProfile}>SALVAR</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}