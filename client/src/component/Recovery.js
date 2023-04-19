import React, { useEffect } from 'react'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  function handleFormSubmit(data) {
    toast.success('Successfully Logged In', {
      position: 'top-center',
      duration: 2000
    });
    console.log(data);
    reset();
    navigate('/reset')
  }

  // To Show Error Toast
  useEffect(() => {
    if (errors.otp) {
      toast.error(errors.otp?.message, {duration: 1500});
    }
  }, [errors.otp])

  return (
    <>
      <div className=" w-screen h-screen">
        <div className="flex justify-center items-center h-full">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Recovery</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter OTP to recover your password</span>
            </div>
            <form className="py-1" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="textbox flex flex-col items-center pt-10">
                <span className="py-4 text-sm text-gray-500">Enter 6 digit OTP to verify your account.</span>
                <input type="text" placeholder='OTP' className={styles.textbox} {...register('otp', { required: {value:true, message: 'OTP is required.'}, minLength: { value: 6, message: 'Enter 6 Digits OTP Number' } })} />
                <button type='submit'  className={styles.btn}>Let's Go</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Can't get OTP? <button to='/register' className='text-red-500'> Resend</button></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


