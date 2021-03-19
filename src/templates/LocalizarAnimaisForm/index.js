import React, {useEffect, useState} from 'react';
import './styles.css';

export default function LocalizarAnimaisForm (){
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
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
    function findAnnouncements(){
        if(uf && city){
            localStorage.setItem('ufSearch', uf)
            localStorage.setItem('citySearch', city)

            window.open(`/home?uf=${uf}?city=${city}`, "_blank")
        }
    }
    return (
        <div className="inicial__form">
            <div className="inicial__form__select-group">
                <div className="inicial__form__select-item">
                    <label>Seu estado vai aqui</label><br/>
                    <select id="uf" onChange={e => setUf(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}><option defaultValue >Selecionar</option></select>
                </div>
                <div className="inicial__form__select-item">
                    <label>E a cidade aqui :)</label><br/>
                    <select id="cidade" onChange={e => setCity(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}> <option defaultValue >Selecionar</option></select>
                </div>
            </div>  
            <div id="inicial__form__button">
                <button className="purple" onClick={findAnnouncements}>LOCALIZAR PETS</button>
            </div>
        </div>
    )
}