import React, {useState, useEffect} from 'react';
import './styles.css';
import { MdInfo, MdFileUpload, MdClose } from "react-icons/md";
import {Link, useHistory, useParams} from 'react-router-dom';
import api from '../../services/api';
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
import Modal from '../../modal/AnnouncementAdopt'

export default function ContentNewAnnouncement(){
    const history = useHistory();
    const user = localStorage.getItem('user-id');
    const modalRef = React.useRef();

    let { id } = useParams();
    var reName, reDescription, reSpecial, reUf, reCity, rePhone

    const [items, setItems] = useState([]);
    const [itemsCpy, setItemsCpy] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [checked, setChecked] = useState(false);
    const [pic, setPic] = useState([])
    const [announcement, setAnnouncement] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [animalSize, setAnimalSize] = useState('');
    const [animalSex, setAnimalSex] = useState('');
    const [animalAge, setAnimalAge] = useState('');
    const [uf, setUF] = useState('');
    const [city, setCity] = useState('');
    const [castrated, setCastrated] = useState(false);
    const [vaccinated, setVaccinated] = useState(false);
    const [dewormed, setDewormed] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);
    const [specialDescription, setSpecialDescription] = useState('');
    const [temperamentList, setTemperamentList] = useState([]);
    const [changed, setChanged] = useState(false)

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
    },[]);

    useEffect(()=>{
        async function getPictures () {
            const response = await api.get(`/img/${id}`).then(response => response.data);
            if(response.length>0){  
              var data = [];
              for(var i=0; i < response.length; i++){
                data.push({
                  original: response[i].url,
                  thumbnail: response[i].url,
                  thumbnailClass: 'thumbnail'
                })
              }
              setPic(data)
            }
          }
          getPictures();
    },[])

    useEffect(()=>{
        async function getData(){
            const response = await api.get(`/announcement/${id}`);
            const announcementData = response.data;

            setName(announcementData.name);
            setDescription(announcementData.description);
            setCastrated(announcementData.castrated);
            setVaccinated(announcementData.vaccinated);
            setDewormed(announcementData.dewormed);
            setIsSpecial(announcementData.isSpecial);
            setChecked(announcementData.isSpecial)
            setSpecialDescription(announcementData.specialDescription);
            setUF(announcementData.uf);
            setCity(announcementData.city);

            var temperamento = [];
            var [result] = announcementData.temperament.split(/\s*;\s*/);
            var r = result.split(",")
            r.forEach((element, index, array) => { temperamento.push({ id: index, value: element.trimStart()})});
            setItems(temperamento);

            document.getElementById(`${announcementData.type}`).checked = true;
            document.getElementById(`${announcementData.sex}`).checked = true;
            document.getElementById(`${announcementData.size}`).checked = true;
            document.getElementById(`${announcementData.age}`).checked = true;

            if(announcementData === null){ history.push('/exception')}else{ handlePermission(announcementData.userId); setAnnouncement(response.data);}
        }
        getData();
    },[]);

    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            if(items.length < 9){    
                setItems([ ...items, {
                    id: Math.floor(Math.random()*1000+1),
                    value: event.target.value
                }])
                event.target.value = [];
            }else{
                setErrorMessages([...errorMessages, {
                    id: Math.floor(Math.random()*1000+1),
                    message: "?? poss??vel inserir at?? 9 itens de temperamento do bichinho",
                    tag: "temperamento"
                }])
            }
        }
    }

    function removeItem(id) {
        const _items = items;
        const index = _items.map((el) => el.id).indexOf(id);
        if (index > -1) {
            items.splice(index, 1);
            for(let cont=0; cont<9; cont++){
                setItemsCpy([ ...itemsCpy, items[cont]])
            }
        }
        setItems(items)
    }

    async function handleAnnouncementEdit(e){
        handleName();
        handleDescription();
        handleSpecial();

        /** PEGA OS DADOS DO STATE */
        const type = animalType;
        const size = animalSize;
        const sex = animalSex;
        const age = animalAge;
        var temperament = "";

        for (var i = 0; i < items.length; i++) {
            i <= items.length-1 ? temperament = temperament + items[i].value + ', ' : temperament = temperament + items[i].value;
        }
        
        if (reName && reDescription && reSpecial){
            const data = { name, description, sex, age, castrated, vaccinated, dewormed, isSpecial, temperament, type, size, uf, city, specialDescription, user};
            if(window.confirm("Tem certeza que deseja alterar esse an??ncio?")){
                try{
                    await api.put(`/announcements/settings/${id}/${user}`, data).then(async ()=>{
                        if(changed){
                            console.log("mudou!!")
                            const response = await api.get(`/img/${id}`).then(response => response.data);
                            if(response.length>0){
                                deletePicture()
                            }else{
                                handleUploadImg()
                            }
                        }else{
                            alert("Edi????es salvas :)");
                            history.push(`/announcement/${id}`);
                        }
                    });
                }catch(err){
                    alert("Algo deu errado na atualiza????o do an??ncio :(");
                    history.push(`/announcement/${id}`);
                    console.log(err)
                }
            }else{
                alert("Descartando altera????es");
                history.push(`/myannouncements`);
            }
        } else {
            alert("N??o foi poss??vel editar an??ncio :(");
        }
    }

    async function deletePicture() {
        await api.delete(`/img/${id}`).then(()=>{
            handleUploadImg()
        });
    }
    function handleUploadImg(){
        console.log("dentro da fun????oooo")
        for (var i=0; i<pic.length; i++){
            console.log("um aqui")
            const data = new FormData() 
            data.append('file', pic[i])
            insertPicture(id, data)
            console.log(pic[i])
        }
        history.push(`/announcement/${id}`);
    }
    async function insertPicture(id,data) {
        await api.post(`/img/${id}`, data);
    }

    function handleCancelEdit(){
        history.push(`/announcement/${id}`);
    }

    function handlePermission(id){
        if(id != user){
            history.push('/exception')
        }
    }

    function handleIsSpecial(e){
        setChecked(!checked);
        setIsSpecial(e.target.checked);
    }
    


    //VALIDA????ES
    function handleName(){
        if(name === undefined || name === null || name === ""){
            document.getElementById("msgname").innerHTML="<font color='red'>Esse campo ?? obrigat??rio</font>";
            document.getElementById("name").style.border= '1px solid tomato';
            document.getElementById("name").style.marginBottom= '5px';
            reName = false
        }else{
            document.getElementById("msgname").innerHTML="";
            document.getElementById("name").style.border= '1px solid green';
            reName = true
        }
    }
    function handleDescription(){
        if(description === undefined || description === null || description === ""){
            document.getElementById("msgdescription").innerHTML="<font color='red'>Esse campo ?? obrigat??rio</font>";
            document.getElementById("description").style.border= '1px solid tomato';
            document.getElementById("description").style.marginBottom= '5px';
            reDescription = false
        }else{
            document.getElementById("msgdescription").innerHTML="";
            document.getElementById("description").style.border= '1px solid green';
            reDescription = true
        }
    }
    function handleSpecial(){
        if(isSpecial){
            if (specialDescription === undefined || specialDescription === null || specialDescription === ""){
                document.getElementById("msgspecialdescription").innerHTML="<font color='red'>Esse campo ?? obrigat??rio</font>";
                document.getElementById("specialdescription").style.border= '1px solid tomato';
                document.getElementById("specialdescription").style.marginBottom= '5px';
                reSpecial = false;
            } else{
                document.getElementById("msgspecialdescription").innerHTML=null;
                document.getElementById("specialdescription").style.border= '1px solid green';
                reSpecial = true;
            }
        }else{
            reSpecial = true;
            setSpecialDescription(null)
        }
    }

    
    const openModal = () => { modalRef.current.openModal() }
    const closeModal = () => { modalRef.current.closeModal() }

    async function handleAdopter(){
        openModal();
    }

    const [adopterName, setAdopterName] = useState('');
    const [adopterPhone, setAdopterPhone] = useState('');
    const [adopterDescription, setAdopterDescription] = useState('');
    var reAdopterName, reAdopterPhone = false

    function validatePhone(value){
        const n = value.replace(/\D/g, '')
        setAdopterPhone(n)
    }
    function validateAdopterName(value){
        setAdopterName(value.replace(/[^A-Za-z???????????????????????????????????????????????????????????????? ]+/i, ''))
    }

    function handleAdopterPhone(){
        const patternPhone =  /\d{13,13}/;
        reAdopterPhone = patternPhone.test(String(adopterPhone).toLowerCase())
        if(reAdopterPhone && adopterPhone != null && adopterPhone != ''){
            document.getElementById("msgadopterphone").innerHTML="";
            document.getElementById("adopterphone").style.border= '1px solid green';
            reAdopterPhone = true
        }else{
            document.getElementById("msgadopterphone").innerHTML="<font color='red'>Telefone inv??lido</font>";
            document.getElementById("adopterphone").style.border= '1px solid tomato';
            document.getElementById("adopterphone").style.marginBottom= '5px';
            reAdopterPhone = false
        }
    }
    function handleAdopterName(){
        if(adopterName === undefined || adopterName === null || adopterName === ""){
            document.getElementById("msgadoptername").innerHTML="<font color='red'>Esse campo ?? obrigat??rio</font>";
            document.getElementById("adoptername").style.border= '1px solid tomato';
            document.getElementById("adoptername").style.marginBottom= '5px';
            reAdopterName = false
        }else{
            document.getElementById("msgadoptername").innerHTML="";
            document.getElementById("adoptername").style.border= '1px solid green';
            reAdopterName = true
        }
    }

    async function handleAnnouncementAdopter(){
        handleAdopterPhone();
        handleAdopterName();
        if(reAdopterName !="" && reAdopterPhone != ""){
            const data = {
                adopterName: adopterName,
                adopterPhone: adopterPhone,
                adopterDescription: adopterDescription,
                adopted: true,
                available: false
            }
            console.log(user)
            console.log(data)
            if(window.confirm("Tem certeza que deseja alterar esse an??ncio?")){
                await api.put(`/announcements/settings/${id}/${user}`, data).then(()=>{
                    alert("Edi????es salvas :)");
                    history.push(`/myannouncements`);
                })
            }else{
                alert("Descartando altera????es");
                setAdopterDescription(null);
                setAdopterName(null);
                setAdopterPhone(null);
                closeModal()
            }
        }
    }

    return (
        <div className="content-new-announcement">    
            <Modal ref={modalRef}>
                <div onClick={closeModal} className="x-icon"><Link><MdClose size={20}/></Link></div>
                    <div className="modal-adopt-not-grid">
                        <div className="modal-adopt-wrapper-not-grid">
                            <div className="modal-adopt-content-wrapper">
                                <p className="modal-adopt-title"><strong>Salvar dados do adotante</strong></p>
                                <p className="modal-adopt-subtitle">Salve os dados do adotante para registro</p>
                                <div>
                                    <div className="form-new-announcement-item">
                                        <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> Nome do adotante</label>
                                        <input id="adoptername" className="default-input-new-announcement" type="text" placeholder="Nome" value={adopterName} onChange={e => validateAdopterName(e.target.value)}/>
                                        <span className="validationError" id="msgadoptername"/>
                                    </div>

                                    <div className="form-new-announcement-item">
                                        <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> N??mero de telefone</label>
                                        <input id="adopterphone" className="default-input-new-announcement" type="text" minlength="13" maxlength="13" placeholder="+00 (00) 00000-0000" value={adopterPhone} onChange={e => validatePhone(e.target.value)}/>
                                        <span className="validationError" id="msgadopterphone"/>
                                    </div>

                                    <div className="form-new-announcement-item">
                                        <label className="form-label-new-announcement">Descri????o da ado????o</label>
                                        <textarea id="adopterdescription" value={adopterDescription} onChange={e => setAdopterDescription(e.target.value)}/>
                                    </div>
                                </div>
                                
                                <button className="negative-purple" onClick={closeModal}>CANCELAR</button>
                                <button type="button" onClick={handleAnnouncementAdopter} className="purple">SALVAR</button>
                            </div>
                        </div>
                    </div>
            </Modal>
            <div className="default-page-content-wrapper">
                <div className="form-new-announcement-item" id="form-new-announcement-item-name">
                    <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> Nome do an??ncio</label>
                    <input id="name" className="default-input-new-announcement" type="text" placeholder="Ex.: Pedrinho" value={name} onChange={e => setName(e.target.value)}/>
                    <span className="validationError" id="msgname"/>
                </div>
                <div className="form-new-announcement-item">
                    <label className="form-label-new-announcement"> <span className="span__obrigatory__item">*</span> Descri????o do an??ncio</label>
                    <p className="subtitle-seccion">Qual a hist??ria desse bichinho? quais s??o as suas caracter??sticas?</p>
                    <textarea id="description" placeholder="Ex.: Cachorro brincalh??o resgatado do antigo tutor por maus tratos..." value={description} onChange={e => setDescription(e.target.value)}/>
                    <span className="validationError" id="msgdescription"/>
                </div>
                <div className="form-new-announcement-item" id="form-new-announcement-item-type">
                    <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> Tipo</label>
                    <p className="subtitle-seccion">Que tipo de animal ?? esse?</p>

                    <div className="form-new-announcement-item-type-grid" onChange={e => {setAnimalType(e.target.id)}}>

                        <div className="form-new-announcement-item-type-content-item">
                            <input type="radio" id="dog" name="animal-type"/>
                            <label id="arredondar-first-radio" className="form-new-announcement-item-type-label" htmlFor="dog"><img alt="icon dog" src={cachorro}/> <p className="label-type-form-new-announcement">CACHORRO</p></label>
                        </div>
                        <div className="form-new-announcement-item-type-content-item">
                            <input type="radio" id="cat" name="animal-type"/>
                            <label className="form-new-announcement-item-type-label" htmlFor="cat"><img alt="icon cat" src={gato}/> <p className="label-type-form-new-announcement">GATO</p></label>
                        </div>
                        <div className="form-new-announcement-item-type-content-item">
                            <input type="radio" id="reptile" name="animal-type"/>
                            <label className="form-new-announcement-item-type-label" htmlFor="reptile"><img alt="icon reptile" src={reptil}/> <p className="label-type-form-new-announcement">R??PTIL</p></label>
                        </div>
                        <div className="form-new-announcement-item-type-content-item">
                            <input type="radio" id="rodent" name="animal-type"/>
                            <label className="form-new-announcement-item-type-label" htmlFor="rodent"><img alt="icon rodent" src={hamster}/> <p className="label-type-form-new-announcement">ROEDOR</p></label>
                        </div>
                        <div className="form-new-announcement-item-type-content-item">
                            <input type="radio" id="equino" name="animal-type"/>
                            <label className="form-new-announcement-item-type-label" htmlFor="equino"><img alt="icon equine" src={equino}/> <p className="label-type-form-new-announcement">EQUINO</p></label>
                        </div>
                        <div className="form-new-announcement-item-type-content-item">
                            <input type="radio" id="other" name="animal-type"/>
                            <label id="arredondar-last-radio" className="form-new-announcement-item-type-label" htmlFor="other"><img alt="icon other" src={outros}/> <p className="label-type-form-new-announcement">OUTRO</p></label>
                        </div>
                    </div>
                </div>
                <div className="form-new-announcement-item" id="form-new-announcement-item-size">
                    <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> Porte</label>
                    <p className="subtitle-seccion">Porte de acordo com o tipo de pet selecionado</p>
                    <div className="form-new-announcement-item-size-grid"  onChange={e => {setAnimalSize(e.target.id)}}>
                        <div className="form-new-announcement-item-size-content-item">
                            <input type="radio" id="mini" name="animal-size"/>
                            <label id="arredondar-first-radio" className="form-new-announcement-item-size-label" htmlFor="mini" ><p>MINI</p></label>
                        </div>
                        <div className="form-new-announcement-item-size-content-item">
                            <input type="radio" id="small" name="animal-size"/>
                            <label className="form-new-announcement-item-size-label" htmlFor="small" ><p>PEQUENO</p></label>
                        </div>
                        <div className="form-new-announcement-item-size-content-item">
                            <input type="radio" id="medium" name="animal-size"/>
                            <label className="form-new-announcement-item-size-label" htmlFor="medium"><p>M??DIO</p></label>
                        </div>
                        <div className="form-new-announcement-item-size-content-item">
                            <input type="radio" id="big" name="animal-size"/>
                            <label className="form-new-announcement-item-size-label" htmlFor="big"><p>GRANDE</p></label>
                        </div>
                        <div className="form-new-announcement-item-size-content-item">
                            <input type="radio" id="giant" name="animal-size"/>
                            <label id="arredondar-last-radio" className="form-new-announcement-item-size-label" htmlFor="giant"><p>GIGANTE</p></label>
                        </div>
                    </div>
                </div>
                <div className="content-item-sex-age-grid">
                    <div className="form-new-announcement-item" id="form-new-announcement-item-sex">
                        <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> Sexo</label>
                        <div className="form-new-announcement-item-sex-grid" onChange={e => {setAnimalSex(e.target.id)}}>
                            <div className="form-new-announcement-item-sex-content-item">
                                <input type="radio" id="fem" name="animal-sex"/>
                                <label id="arredondar-first-radio" className="form-new-announcement-item-sex-label" htmlFor="fem"><img alt="icon female" src={f}/> <p> F??MEA </p></label>
                            </div>
                            <div className="form-new-announcement-item-sex-content-item">
                                <input type="radio" id="mas" name="animal-sex"/>
                                <label className="form-new-announcement-item-sex-label" htmlFor="mas"><img alt="icon male" src={m}/> <p> MACHO </p></label>
                            </div>
                            <div className="form-new-announcement-item-sex-content-item">
                                <input type="radio" id="notDefined" name="animal-sex"/>
                                <label id="arredondar-last-radio" className="form-new-announcement-item-sex-label" htmlFor="notDefined"><img alt="icon undefined" src={u}/> <p> INDEFINIDO </p></label>
                            </div>
                        </div>
                    </div>
                    <div className="form-new-announcement-item" id="form-new-announcement-item-age">
                        <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> Idade</label>
                        <div className="form-new-announcement-item-age-grid" onChange={e => {setAnimalAge(e.target.id)}}>
                            <div className="form-new-announcement-item-age-content-item">
                                <input type="radio" id="puppy" name="animal-age"/>
                                <label id="arredondar-first-radio" className="form-new-announcement-item-age-label" htmlFor="puppy"><img alt="icon puppy" src={ninho}/><p>FILHOTE</p></label>
                            </div>
                            <div className="form-new-announcement-item-age-content-item">
                                <input type="radio" id="adult" name="animal-age"/>
                                <label className="form-new-announcement-item-age-label" htmlFor="adult"><img alt="icon adult" src={pintinho}/><p>ADULTO</p></label>
                            </div>
                            <div className="form-new-announcement-item-age-content-item">
                                <input type="radio" id="elderly" name="animal-age"/>
                                <label id="arredondar-last-radio" className="form-new-announcement-item-age-label" htmlFor="elderly"><img alt="icon elderly" src={galinha}/><p>IDOSO</p></label>
                            </div>
                        </div>
                    </div>
                </div>                
                <div className="form-new-announcement-item" id="form-new-announcement-item-health">
                    <label className="form-label-new-announcement">Hist??rico de sa??de</label>
                    <p className="subtitle-seccion">Qual o estado de sa??de do pet? descreva suas necessidades especiais na descri????o do an??ncio</p>
                    <div className="form-new-announcement-item-health-content-item">
                        <input type="checkbox" id="castrado" name="animal-health" checked={castrated} value={castrated} onChange={e => setCastrated(e.target.checked)} />
                        <label className="form-new-announcement-item-health-label" htmlFor="castrado"><p>Castrado</p></label>
                    </div>
                    <div className="form-new-announcement-item-health-content-item">
                        <input type="checkbox" id="vacinado" name="animal-health" checked={vaccinated} value={vaccinated} onChange={e => setVaccinated(e.target.checked)} />
                        <label className="form-new-announcement-item-health-label" htmlFor="vacinado"><p>Vacinado</p></label>
                    </div>
                    <div className="form-new-announcement-item-health-content-item">
                        <input type="checkbox" id="vermifugado" name="animal-health" checked={dewormed} value={dewormed} onChange={e => setDewormed(e.target.checked)} />
                        <label className="form-new-announcement-item-health-label" htmlFor="vermifugado"><p>Vermifugado </p></label>
                    </div>
                    <div className="form-new-announcement-item-health-content-item">
                        <input type="checkbox" id="especial" name="animal-health" checked={isSpecial} value={isSpecial} checked={checked} onChange={handleIsSpecial}/>
                        <label className="form-new-announcement-item-health-label" htmlFor="especial"><p>Possui necessidades especiais <MdInfo title="Doen??as como FIV, FELV, cinomose, hepatite, defici??ncias f??sicas, alergias e afins devem ser indicadas nesse campo" size={15} className="form-new-announcement-item-health-icon"/> </p></label>
                    </div>
                </div>         

                {checked && (
                    <div>
                        <label className="form-new-announcement-description-special-label">Descreva aqui as necessidades especiais apresentadas pelo bichinho</label>
                        <textarea id="specialdescription" className="form-new-announcement-description-special-textarea" value={specialDescription} onChange={e => setSpecialDescription(e.target.value)} />
                        <span className="validationError" id="msgspecialdescription"/>
                    </div>
                )}
                {!checked && (
                    <div>
                    </div>
                )}

                <div className="form-new-announcement-item" id="form-new-announcement-item-health">
                    <label className="form-label-new-announcement">Temperamento</label>
                    <p className="subtitle-seccion">Como esse bichinho costuma ser?</p>

                    <div>
                        <input onKeyPress={handleKeyPress} className="default-input-new-announcement" type="text" placeholder="Separe com Enter as caracter??sticas do seu pet"/>
                        <ul className="list-temperament">
                            {items.map( item => 
                                <li className="list-item-temperament" key={item.id}>
                                    {item.value}<MdClose onClick={()=> removeItem(item.id)}/>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>     
                <div className="form-new-announcement-item" id="form-new-announcement-item-address">
                    <label className="form-label-new-announcement"><span className="span__obrigatory__item">*</span> Endere??o</label>
                    <p className="subtitle-seccion">Onde o animal est?? alojado?</p>
                    <div className="form-new-announcement-item-address-grid">
                        <div>
                            <label className="form-label-new-announcement">UF</label>
                            <select id="uf" value={uf} onChange={e => setUF(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}><option defaultValue >{uf}</option></select>
                        </div>
                        <div id="second-item-address-grid">
                            <label className="form-label-new-announcement">Cidade</label>
                            <select id="cidade" value={city} onChange={e => setCity(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text)}> <option defaultValue >{city}</option></select>
                        </div>
                    </div>
                </div>
                <div className="form-new-announcement-item" id="form-new-announcement-item-pictures">
                    <label className="form-label-new-announcement">Fotos</label>
                    <p className="subtitle-seccion">Selecione as fotos do seu bichinho</p>
                    
                    <form encType="multipart/form-data">
                        <label htmlFor="input-file-animal" className="button-charge-files"> <p><MdFileUpload/> CARREGAR ARQUIVOS</p> </label>
                        <input type="file" name="file" accept="image/png, image/jpeg, image/pjpeg" multiple id="input-file-animal" onChange={ (e) => {
                            setPic(e.target.files)
                            setChanged(true)
                        }}/>
                    </form>
                    {pic.length>0 && (
                        <div className="files_message">
                            {pic.length} arquivos selecionados
                        </div>
                    )}
                </div>
                
                
                <div className="button-wrapper-insert-announcement">
                <button className="negative-purple" onClick={handleCancelEdit}>CANCELAR</button>
                    <button type="button" onClick={handleAdopter} className="tomato adopted-button">PET FOI ADOTADO</button>
                    <button type="button" onClick={handleAnnouncementEdit} className="purple">SALVAR</button>
                </div>

            </div>
            <div className="new-announcement-background-cat-wrapper">
                <div className="new-announcement-background-cat"/>
            </div>
        </div>
    )
}

