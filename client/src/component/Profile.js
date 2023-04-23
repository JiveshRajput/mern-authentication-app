import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import { convertToBase64 } from '../helper/convert'
import { errorToaster, successToaster } from "../helper/toasters";
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/axios';

export default function Profile() {
  const [{ apiData }] = useFetch();
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  let response = '';
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: response?.data?.userDetails.firstName || apiData?.user.firstName || '',
      lastName: response?.data?.userDetails.lastName || apiData?.user.lastName || '',
      email: response?.data?.userDetails.email || apiData?.user.email || '',
      mobileNo: response?.data?.userDetails.mobileNo || apiData?.user.mobileNo || '',
      address: response?.data?.userDetails.address || apiData?.user.address || '',
    },
    values: response?.data || apiData?.user,
  });

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

  async function handleFormSubmit(data) {
    const values = { ...data, profile: file || apiData?.user.profile || '' };
    response = await updateUser(values);
    if (response?.error) {
      errorToaster(response?.error.data.error)
    } else {
      successToaster('Details Changed Successfully!!!');
    }
  }

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
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
                  <img alt='avtar' className={styles.profile_img} src={file || apiData?.user.profile || avatar} />
                </label>
                <input type="file" id="profile" accept="image/png, image/jpeg" className='hidden' onChange={onImageUpload} />
              </div>
              <div className="textbox flex flex-col items-center">
                <div className='flex gap-4 mb-3 w-3/4'>
                  <input type="text" placeholder='First Name *' className={styles.textbox} {...register('firstName', { ...validations.username, value: apiData?.user.username || '' })} />
                  <input type="text" placeholder='Last Name' className={styles.textbox} {...register('lastName')} />
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
                <span className='text-gray-500'>Come back later? <button onClick={userLogout} className='text-red-500'>Logout </button></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


