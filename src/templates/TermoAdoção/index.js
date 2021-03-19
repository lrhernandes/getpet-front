import React from 'react';

import ContentTermoAdocao from '../../templates/ContentTermoAdocao';

export default function NewAnnouncement(){
    return (
        <div className="default-wrapper">
            <div>
                <p className="title-default-page">TERMO DE ADOÇÃO</p>
                <p className="subtitle-default-page">Ao adotar um pet na plataforma você <strong>concorda</strong> com os termos abaixo.</p>
                <div>
                    <ContentTermoAdocao/>
                </div>
            </div>
        </div>
    )
}