import React, {useState, useEffect} from 'react';
import './styles.css';
import api from '../../services/api';
import { FaFilter } from "react-icons/fa";
import {Link, useLocation} from 'react-router-dom';
import Announcement from '../../templates/AnnouncementItemFromList'
import { parse } from "query-string"

var data = new Date();
var day = data.getDate();
var month = data.getMonth();
var monthString = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function ContentFindAnnouncement(){
    const [step, setStep] = useState(0);
    const [announcements, setAnnouncements] = useState([]);
    const [city, setCity] = useState([]);
    const [uf, setUF] = useState([]);

    const [animalType, setAnimalType] = useState(null);
    const [animalSex, setAnimalSex] = useState(null);
    const [animalAge, setAnimalAge] = useState(null);
    const [animalHealth, setAnimalHealth] = useState(null);
    
    const userId = localStorage.getItem('user-id');
    const location = useLocation()
    const searchParams = parse(location.search)

    const queryString = require('query-string');

    useEffect(()=>{
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
          }
          init()
        })(
          document.getElementById('uf'),
          document.getElementById('cidade'),
          3469034
        );
        }
        loadSelect();
    })

    useEffect(()=>{
        async function fetchData() {
            const user = await api.get(`/client/${userId}`);
            
            const parsed = queryString.parse(location.search);

            const searchuf = localStorage.getItem('ufSearch');
            const searchcity = localStorage.getItem('citySearch');

            if(user.data != null){
                const userdata = user.data
                const resp = await api.get(`/availableannouncementsbyaddress/${userId}/${userdata.city}/${userdata.uf}`)
                const respdata = resp.data;
                var filtered = respdata;
                setAnnouncements(respdata)
            } else{
                if(searchuf && searchcity){
                    const resp = await api.get(`/announcementsbyaddress/${searchcity}/${searchuf}`)
                    setAnnouncements(resp.data)
                }
            }


            if(parsed.sex){
                filtered = filtered.filter(announcement => announcement.sex == parsed.sex);
            } if(parsed.type){
                filtered = filtered.filter(announcement => announcement.type == parsed.type);
            } if(parsed.age){
                filtered = filtered.filter(announcement => announcement.age == parsed.age);
            } if(parsed.castrated){
                alert("filtarrr")
                filtered = filtered.filter(announcement => announcement.castrated == true);
            } if(parsed.vaccinated){
                filtered = filtered.filter(announcement => announcement.vaccinated == true);
            } if(parsed.dewormed){
                filtered = filtered.filter(announcement => announcement.dewormed == true);
            } if(parsed.isSpecial){
                filtered = filtered.filter(announcement => announcement.isSpecial == true);
            }
            if(parsed.sex || parsed.type || parsed.age || parsed.castrated || parsed.vaccinated || parsed.dewormed || parsed.isSpecial){
                setAnnouncements(filtered)
            }
        }
        fetchData();
    }, []);
        
    async function handleFindAnnouncements(){
        if(userId){
            const resp = await api.get(`/availableannouncementsbyaddress/${userId}/${city}/${uf}`);
            const respdata = resp.data;
            setAnnouncements(respdata);
        }else{
            const resp = await api.get(`/announcementsbyaddress/${city}/${uf}`)
            setAnnouncements(resp.data)
        }
    }

    return (
        <div className="content-right">
            <div className="content-find-announcement">
                <div className="date-title">
                    <p className="title-default-page" id="title-from-title-date">ENCONTRE SEU NOVO AMIGO</p>
                    <p className="current-day">{day} de {monthString[month]}</p>
                </div>
                <div className="home-form-locate-animals">
                    <div className="gambiarra">
                        <div className="localizar-animais-home-form">
                        <div>
                            <label>Em qual estado?</label><br/>
                            <select id="uf" onChange={e => setUF(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}><option defaultValue >Selecionar</option></select>
                        </div>
                        <div>
                            <label>E cidade?</label><br/>
                            <select id="cidade" onChange={e => setCity(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}> <option defaultValue >Selecionar</option></select>
                        </div> 
                        <div id="filtrar-button-box">
                            <button onClick={handleFindAnnouncements} className="purple">LOCALIZAR</button>
                        </div>
                        </div>
                    </div>
                </div>
                
                {step === 0 && (
                    <div className="step0-filter">
                        <div className="content-bichinhos-filtrar">
                            <p className="bichinhos-regiao">BICHINHOS NA SUA REGIÃO</p>
                            <p className="filtrar-announcements"> <Link className="content-find-announcement-filtrar" onClick={() => {setStep(1)}} > <FaFilter size={10}/> FILTRAR</Link></p>
                        </div>
                    
                    <div className="box-home-announcements-animals">
                        <ul className="home-announcements-animals">
                            {announcements.map( announce => 
                                <li title={announce.name} key={announce.id}>
                                    <Announcement ann={announce}/>
                                </li>
                            )}
                        </ul>
                        {announcements.length === 0 && (
                            <p className="empty-text">Ops, parece que não existem anúncios disponpiveis :(</p>
                        )}
                    </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="step1-filter">
                        <div className="content-bichinhos-filtrar">
                            <p className="bichinhos-regiao">BICHINHOS NA SUA REGIÃO</p>
                            <p className="filtrar-announcements"> <Link className="content-find-announcement-filtrar" onClick={() => {setStep(0)}} > <FaFilter size={10}/> FILTRAR</Link></p>
                        </div>
                        <form>
                            <div className="animal-options">
                                <div className="animal-types">
                                    <p className="form-subtitle">Quais bichinhos deseja encontrar?</p>
                                    <div onChange={e => {setAnimalType(e.target.id)}}>
                                        <div>
                                            <input type="checkbox" name="type" value="dog" id="dog" />
                                            <label htmlFor="dog" className="exception">Cachorros</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="type" value="cat" id="cat" />
                                            <label htmlFor="cat" className="exception">Gatos</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="type" value="rodent" id="rodent" />
                                            <label htmlFor="rodent" className="exception">Roedores</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="type" value="reptile" id="reptile" />
                                            <label htmlFor="reptile" className="exception">Répteis</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="type" value="equino" id="equino" />
                                            <label htmlFor="equino" className="exception">Equinos</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="type" value="other" id="other" />
                                            <label htmlFor="other" className="exception">Outros</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="type" value="indiferentetype" id="indiferentetype" />
                                            <label htmlFor="indiferentetype" className="exception">Tanto faz</label>
                                        </div>
                                    </div>
                                </div>
                                    
                                <div className="animal-sex" onChange={e => {setAnimalSex(e.target.id)}}>
                                    <p className="form-subtitle">De qual sexo?</p>
                                    <div>
                                        <div>
                                            <input type="checkbox" name="sex" value="mas" id="mas" />
                                            <label htmlFor="mas" className="exception">Macho</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="sex" value="fem" id="fem" />
                                            <label htmlFor="fem" className="exception">Fêmea</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="sex" value="indiferentesex" id="indiferentesex" />
                                            <label htmlFor="indiferentesex" className="exception">Tanto faz</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="animal-age" onChange={e => {setAnimalAge(e.target.id)}}>
                                    <p className="form-subtitle">Alguma preferência de idade?</p>
                                    <div>
                                        <div>
                                            <input type="checkbox" name="age" value="puppy" id="puppy" />
                                            <label htmlFor="puppy" className="exception">Filhote</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="age" value="adult" id="adult" />
                                            <label htmlFor="adult" className="exception">Adulto</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="age" value="elderly" id="elderly" />
                                            <label htmlFor="elderly" className="exception">Idoso</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="age" value="indiferenteage" id="indiferenteage" />
                                            <label htmlFor="indiferenteage" className="exception">Tanto faz</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="animal-health">
                                    <p className="form-subtitle">Estado de saúde</p>
                                    <div onChange={e => {setAnimalHealth(e.target.value)}}>
                                        <div>
                                            <input type="checkbox" name="castrated" value="true" id="castrated" />
                                            <label htmlFor="castrated" className="exception">Castrado</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="vaccinated" value="true" id="vaccinated" />
                                            <label htmlFor="vaccinated" className="exception">Vacinado</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="dewormed" value="true" id="dewormed" />
                                            <label htmlFor="dewormed" className="exception">Vermifugado</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="isSpecial" value="true" id="isSpecial" />
                                            <label htmlFor="isSpecial" className="exception">Especial</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="indiferentehealth" value="true" id="indiferentehealth" />
                                            <label htmlFor="indiferentehealth" className="exception">Tanto faz</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="button-group-filter">
                                <button className="negative-purple" onClick={()=>{setStep(0)}}>CANCELAR</button>
                                <button className="purple">APLICAR FILTROS</button>
                            </div>
                        </form>
                    </div> 
                )}
            </div>
        </div>
        
    )
}