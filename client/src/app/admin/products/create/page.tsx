'use client'

import DashBoardFormCreate from '@/components/dashboard/DashBoardFormCreate'
import InputField from '@/components/ui/InputField'
import React from 'react'
import style from '@/styles/CreateProduct.module.css'
import Form from 'next/form'

const CreateProduct = () => {
  return (
    <div className={style['container']}>
      <div style={{ height: '30px' }} />
      <div className={style['form-title']}>
        <h1>Create Product</h1>
      </div>
      <div style={{ height: '30px' }} />
      <Form
        action=""
        onSubmit={(e) => {
          console.log('e');
          e.preventDefault();
        }}
      >
        <div className={style['form-row']}>
          <div className={style['form-img']}>
            <InputField type='img' />
            <div style={{ height: '55px' }} />
            <InputField type='img_more' />
          </div>
          <div className={style['form-text']}>
            <InputField type='text' name='Name' />
            <div style={{ height: '15px' }} />
            <InputField type='number' name='Price' />
            <div style={{ height: '15px' }} />
            <InputField type='text' name='Item Number' />
            <div style={{ height: '15px' }} />
            <InputField type='text' name='Scale' />
            <div style={{ height: '15px' }} />
            <InputField type='text' name='Marque' />
            <div style={{ height: '15px' }} />
            <InputField type='text' name='Status' />
          </div>
        </div>
        <div style={{ height: '30px' }} />
        <div className={style['form-description']}>
          <InputField type='textarea' name='Description' />
        </div>
        <div className={style['form-btn']}>
          <button className={style['btn-submit']} type='submit'>Create</button>
        </div>

      </Form>
     
    </div >
  )
}

export default CreateProduct