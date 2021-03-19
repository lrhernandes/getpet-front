import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function LoginClientForm(){
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    var reMail, rePassword = false

    async function handleLogin(e){
        e.preventDefault();
        const data = {email, password}

        handleEmail();
        handlePassword()

        if(reMail && rePassword){try{
            const response = await api.post('/auth/login', data);
            if(response){
                localStorage.setItem('app-token', response.data.token);
                localStorage.setItem('user-id', response.data.user.id);
                console.log(email, password)
                history.push('/home');
            }else{
                alert("E-mail ou senha incorretos")
            }
        }catch(err){
            alert("Não foi possível fazer login");
        }}
    }

    function handleEmail(e){
        const patternMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        reMail = patternMail.test(String(email).toLowerCase());
        if(reMail) {
            document.getElementById("msgemail").innerHTML="";
            document.getElementById("email").style.border= '1px solid green';
            return true;
        }
        else{
            document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
            document.getElementById("email").style.border= '1px solid tomato';
            document.getElementById("email").style.marginBottom= '-2px';
            return false;
        }
    }

    function handlePassword(){
        if(password !== null && password != "" ){
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

    return (
        <div className="login-clients-form">
            <form id="form-login" onSubmit={handleLogin}>
                <div>
                    <h2 id="h2">Entrar</h2>
                    <h4 className="h4">Bem-vindo de volta</h4>
                </div>
                <div>
                    <div className="login-item-wrapper">
                        <label><span className="span__obrigatory__item">*</span> E-mail</label><br/>
                        <input type="text" id="email" placeholder="nome@email.com" value={email} onChange={e => setEmail(e.target.value)}/> 
                        <span className="validationError" id="msgemail"/>
                    </div>
                    <div className="login-item-wrapper">
                        <label id="space-label"><span className="span__obrigatory__item">*</span> Senha</label><br/>
                        <input type="password" id="password" placeholder="••••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                        <span className="validationError" id="msgpassword"/>
                    </div>
                </div>
                <div className="button-group-space">
                    <button className="purple" type="submit">ENTRAR</button>
                </div>
            </form>
            <div className="bottom-register">
                <p className="register-link"> <Link to="/redefine-password">Esqueci minha senha</Link></p>
                <p className="register-link"> <Link to="/register">Ainda não tenho cadastro</Link></p> 
            </div>
        </div>
    )
    
}

