import React, {forwardRef, useImperativeHandle} from 'react';
import './styles.css';
import ReactDOM from 'react-dom';

const AnnouncementAdopt = forwardRef(
    (props, ref) => {
        const [display, setDisplay] = React.useState(false);

        useImperativeHandle(ref, ()=>{
            return{
                openModal: () => open(),
                closeModal: () => close() 
            }
        })

        const open = () => {
            setDisplay(true);
        }
        const close = () => {
            setDisplay(false);
        }
    
        if (display){
            return ReactDOM.createPortal(
            <div onClick={close} className="modal-wrapper-ntf">
                <div className="modal-backdrop-ntf">
                    <div className="modal-box-ntf">
                        {props.children}
                    </div>
                </div>
            </div>, document.getElementById("modal-root"))
        }
    
        return null;
    }

)

export default AnnouncementAdopt