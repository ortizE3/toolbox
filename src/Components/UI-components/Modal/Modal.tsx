import { useEffect, useRef, useState } from 'react';
import { ModalProps } from '../../../Models/ComponentProps/ModalProps'
import './Modal.css'

function Modal(props: ModalProps) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const element = event.target as HTMLElement;

            if (ref.current && event?.target && ref.current.id === element.id) {
                props.open(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="modal-background" id="modal-container" ref={ref}>
            <div className='modal-container' >
                {props.children}
            </div>
        </div>
    )
}

export default Modal