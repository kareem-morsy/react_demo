import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {

    let navigate = useNavigate();
    const notify = () => toast("Wow so easy !");

    const schema = yup.object().shape({
        email     : yup.string().email().required(),
        password  : yup.string().required()
    })
    
    const {register , handleSubmit , formState : {errors}} = useForm({
        resolver : yupResolver(schema)
    })

    const sendData = (formData) =>{
        // console.log(formData);
     
        fetch("https://reservation-system.sabeelan.com/reservation-system/api/login",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            console.log(data.data.token);
            // localStorage.setItem("token",data.data.token)
            sessionStorage.setItem("token",data.data.token)
           
            if (data.message === "success"){

                navigate('/home');
                <ToastContainer />
            }
        })
    }

   
  return (
    <>
        <div className='form-container'>
            <div className='form-div'>
                <form onSubmit={handleSubmit(sendData)}>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="email" placeholder='Your Email Is ....' {...register("email")}  className="form-control"/>
                    </div>

                    <div className='form-group'>
                        <label>password</label>
                        <input type="password" placeholder='Your Password Is ....' {...register("password")}  className="form-control"/>
                    </div>

                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login