import React from "react";
import style from './Modal.module.css'

type ModalWithChildrenType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children: any
    onCancel: any
}

export const ModalWithChildren = (props: ModalWithChildrenType) => {

    return <div className={props.modalActive ? `${style.modal} ${style.active}` : style.modal}
                onClick={props.onCancel}>
        <div className={props.modalActive ? `${style.modalContent} ${style.active} ` : style.modalContent}
             onClick={e => e.stopPropagation()}>
            {props.children}

        </div>

    </div>
}