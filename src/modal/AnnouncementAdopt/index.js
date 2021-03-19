import React, {forwardRef, useImperativeHandle} from 'react';
import './styles.css';
import ReactDOM from 'react-dom';

const Notify = forwardRef(
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
            <div onClick={close} className="modal-wrapper">
                <div className="modal-backdrop">
                    <div className="modal-box">
                        {props.children}
                    </div>
                </div>
            </div>, document.getElementById("modal-root"))
        }
    
        return null;
    }

)

export default Notify