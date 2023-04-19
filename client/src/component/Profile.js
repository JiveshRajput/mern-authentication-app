import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { convertToBase64 } from '../helper/convert'

export default function Profile() {
  const [file, setFile] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const validations = {
    username: {
      required: { value: true, message: 'Username is Required!' },
      minLength: { value: 3, message: 'Enter min 3 characters in Username' }
    },
    email: {
      required: { value: true, message: 'Email is Required!' }
    },
    password: {
      required: { value: true, message: 'Password is required.' },
      pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Password must have Minimum 8 characters, atleast 1 uppercase, 1 lowercase, 1 number and 1 special character' }
    },
    mobileNo: {
      minLength: { value: 10, message: 'Enter valid Number' }
    }
  }

  async function onImageUpload(e) {
    let base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  function handleFormSubmit(data) {
    toast.success('Details Changed Successfully!!!', { position: 'top-center', duration: 2000 });
    console.log({ ...data, profile: file || '' });
    reset();
  }


  return (
    <>
      <div className="w-screen h-screen">
        <div className="flex justify-center items-center h-full">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Profile</h4>
              <span className="py-4 text-lg text-center text-gray-500">You can update the details.</span>
            </div>
            <form className="py-1" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="profile flex justify-center py-4">
                <label htmlFor='profile'>
                  <img alt='avtar' className={styles.profile_img} src={file || avatar} />
                </label>
                <input type="file" id="profile" accept="image/png, image/jpeg" className='hidden' onChange={onImageUpload} />
              </div>
              <div className="textbox flex flex-col items-center">
                <div className='flex gap-4 mb-3 w-3/4'>
                  <input type="text" placeholder='First Name *' className={styles.textbox} {...register('firstname', { ...validations.username })} />
                  <input type="text" placeholder='Last Name' className={styles.textbox} {...register('lastname')} />
                </div>
                <div className='flex gap-4 mb-3 w-3/4'>
                  <input type="email" placeholder='Email *' className={styles.textbox} {...register('email', { ...validations.email })} />
                  <input type="number" placeholder='Mobile No.' className={styles.textbox} {...register('mobileNo', { ...validations.mobileNo })} />
                </div>
                <div className='flex w-full justify-center mb-3'>
                  <input type="text" placeholder='Address' className={`${styles.textbox} w-full`} {...register('address')} />
                </div>
                <button type='submit' className={styles.btn}>Update Details</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Come back later? <Link to='/' className='text-red-500'>Logout </Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


