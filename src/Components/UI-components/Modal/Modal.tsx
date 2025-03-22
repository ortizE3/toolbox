import { useEffect, useRef, useState } from 'react';
import { ModalProps } from '../../../Models/ComponentProps/ModalProps'
import './Modal.css'

function Modal(props: ModalProps) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                props.open(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="modal-background">
            <div className='modal-container' ref={ref}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal