import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

export default function ContentareaCenteredException(){
    return (
        <div className="content-area-centered">
            <section>
                <div className="content-left-about">
                    <div className="sobrepor"/>
                </div>
            </section>
            <section>
                <div className="content-right-exception">
                    <div className="x-icon"><Link to="/"><MdClose size={20}/></Link></div>
                    <p id="purpleabout">ALGO DEU ERRADO</p>
                    <h1>Essa página não existe</h1>
                    <a href="javascript:history.back()" className="back-link"><MdArrowBack/>Voltar</a>
                </div>
            </section>
        </div>
    )
}