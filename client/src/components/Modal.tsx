import React from 'react';
import Form from 'next/form';
import style from '@/styles/Modal.module.css'
import { useRouter } from 'next/navigation';

const Modal = ({ typeModal, error, onSubmit, setVerification }:
  {
    error?: string,
    typeModal: string,
    onSubmit?: () => void;
    setVerification?: React.Dispatch<React.SetStateAction<{ state: string; error: string; code: string }>>

  }) => {

  const router = useRouter()

  return (
    <>
      {
        typeModal === 'input' ? (
          <div className={style["container"]}>
            <div className={style["modal-content"]}>
              <Form onSubmit={(e) => {
                e.preventDefault()
                if (error) {
                  console.log("Form có lỗi, không thể gửi.");
                  return;
                }
                onSubmit && onSubmit()
              }} action="">
                <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Verification email</p>
                <input type="number" onChange={(e) => {
                  setVerification && setVerification(prev => ({ ...prev, code: e.target.value }))
                }} />
                {error && <div className={style['error']}>{error}</div>}
                <button type='submit' className={style["btn"]} >
                  Confirm
                </button>
              </Form>
            </div>
          </div>
        ) : (
          <div className={style["container"]}>
            <div className={style["modal-content"]}>
              <Form action="">
                <p>
                You're all set! Thanks for registering!</p>
                <button onClick={() => {

                  setVerification && setVerification(prev => ({
                    ...prev,
                    state: 'default'
                  }))
                  router.replace('/')
                }} type='submit' className={style["btn"]} >
                 Start Shopping
                </button>
              </Form>
            </div>
          </div>
        )
      }
    </>

  );
};

export default Modal;