import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import { MdClose } from "react-icons/md";

export default function ContentareaCenteredAbout(){
    return (
        <div className="content-area-centered">
            <section>
                <div className="content-left-about">
                    <div className="sobrepor"/>
                </div>
            </section>
            <section>
                <div className="content-right-about">
                    <div className="x-icon"><Link to="/"><MdClose size={20}/></Link></div>
                    <p id="purpleabout">SOBRE O PROJETO</p>
                    <h1>GetPet</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lorem euismod, convallis lectus in, sollicitudin libero. Aliquam pulvinar convallis nunc non aliquet. Vestibulum turpis ex, sodales ut purus sit amet, hendrerit finibus metus. Etiam sodales sit amet urna vitae vestibulum. Cras volutpat lectus risus, ac porttitor lectus euismod at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. Cras volutpat lectus risus, ac porttitor lectus euismod at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p>
                </div>
            </section>
        </div>
    )
}