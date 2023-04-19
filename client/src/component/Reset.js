import React, { useEffect } from 'react'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Reset() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  function handleFormSubmit(data) {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Doesn't Match", { duration: 1500 });
    } else {
      toast.success('Password Reset Successfully!', {
        position: 'top-center',
        duration: 2000
      });
      console.log(data);
      reset();
    }
    navigate('/')
  }

  // To Show Error Toast
  useEffect(() => {
    if (errors.password) toast.error(errors.password?.message, { duration: 1500 })
  }, [errors.password])

  useEffect(() => {
    if (errors.confirmPassword) toast.error(errors.confirmPassword?.message, { duration: 1500 })
  }, [errors.confirmPassword])

  return (
    <>
      <div className=" w-screen h-screen">
        <div className="flex justify-center items-center h-full">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Reset</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter new password</span>
            </div>
            <form className="py-10" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="textbox flex  flex-col items-center">
                <input type="text" placeholder='Password' className={`${styles.textbox} border-2 ${!errors.password ? 'border-white' : 'border-red-500'}`} {...register('password', { required: { value: true, message: 'Password is required.' }, minLength: { value: 3, message: 'Password length is min 3 characters' }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Password must have Minimum 8 characters, atleast 1 uppercase, 1 lowercase, 1 number and 1 special character' } })} />
                <input type="text" placeholder='Repeat Password' className={styles.textbox} {...register('confirmPassword', { required: { value: true, message: 'Confirm Password is required.' }, minLength: { value: 3, message: 'Confirm Password length is min 3 characters' }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Confirm Password must have Minimum 8 characters, atleast 1 uppercase, 1 lowercase, 1 number and 1 special character' } })} />
                <button type='submit' className={styles.btn}>Let's Go</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


