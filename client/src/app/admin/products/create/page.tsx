'use client'

import DashBoardFormCreate from '@/components/dashboard/DashBoardFormCreate'
import InputField from '@/components/ui/InputField'
import React from 'react'
import style from '@/styles/CreateProduct.module.css'
import Form from 'next/form'
import { pinata } from "@/utils/config";
import adminsAPI from '@/apis/adminApi'

const CreateProduct = () => {
  const [uploading, setUploading] = React.useState(false)
  const [form, setForm] = React.useState({
    name: '',
    price: '',
    item_no: '',
    scale: '',
    marque: '',
    status: '',
    description: '',
  })
  const [file, setFile] = React.useState<File | null>(null)
  const [files, setFiles] = React.useState<File[]>([])
  const [url, setUrl] = React.useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Only handle file input changes
    if (e.target instanceof HTMLInputElement) {
      const inputName = e.target.getAttribute('name');
      if (inputName === 'img_more') {
        setFiles(e.target.files ? Array.from(e.target.files) : []);
      } else {
        setFile(e.target.files?.[0] || null);
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('No file selected')
      return
    }
    setUploading(true)
    try {
      // Upload ảnh chính
      const urlRequest = await fetch("/api/url")
      const urlResponse = await urlRequest.json()
      const upload = await pinata.upload.public.file(file).url(urlResponse.url)
      const imageUrl = await pinata.gateways.public.convert(upload.cid)

      // Upload nhiều ảnh (img_more)
      let imgMoreUrls: string[] = []
      for (const f of files) {
        const urlReq = await fetch("/api/url")
        const urlRes = await urlReq.json()
        const up = await pinata.upload.public.file(f).url(urlRes.url)
        const imgUrl = await pinata.gateways.public.convert(up.cid)
        imgMoreUrls.push(imgUrl)
      }

      setUrl(imageUrl)
      setUploading(false)

      // Gửi dữ liệu lên DB
      const res = await adminsAPI.handleAdmin('/products', {
        ...form,
        img: imageUrl,
        img_more: imgMoreUrls,
      }, 'post')
      console.log(res);

    } catch (error) {
      console.log(error);
    }
    setUploading(false)
  }

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

          handleSubmit(e)
          console.log({
            ...form,
            img: file,
            img_more: files,
          });
        }
        }
      >
        <div className={style['form-row']}>
          <div className={style['form-img']}>
            <InputField type='img' name="img" onChange={handleFileChange} />
            <div style={{ height: '55px' }} />
            <InputField type='img_more' name="img_more" onChange={handleFileChange} />
          </div>
          <div className={style['form-text']}>
            <InputField type='text' name='name' label='Name' onChange={handleChange} />
            <div style={{ height: '15px' }} />
            <InputField type='number' label='Price' name='price' onChange={handleChange} />
            <div style={{ height: '15px' }} />
            <InputField type='text' label='Item Number' name='item_no' onChange={handleChange} />
            <div style={{ height: '15px' }} />
            <InputField type='text' name='scale' label='Scale' onChange={handleChange} />
            <div style={{ height: '15px' }} />
            <InputField type='text' name='marque' label='Marque' onChange={handleChange} />
            <div style={{ height: '15px' }} />
            <InputField type='text' label='Status' name='status' onChange={handleChange} />
          </div>
        </div>
        <div style={{ height: '30px' }} />
        <div className={style['form-description']}>
          <InputField type='textarea' label='Description' name='description' onChange={handleChange} />
        </div>
        <div className={style['form-btn']}>
          <button className={style['btn-submit']} type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Create"}
          </button>
        </div>

      </Form>

    </div >
  )
}

export default CreateProduct