import Layout from './../core/Layout'
import React,{useState} from 'react'
import toastr from 'toastr'
import "toastr/build/toastr.css";
import {API_URL} from './../config'



const Signin = (props)=> {
    const [user, setUser] = useState({email:'',password:''})
    const handleChange = e =>{
        setUser({...user,[e.target.id]:e.target.value})
       }
    const submitSignin = e => {
        e.preventDefault();

        fetch(`${API_URL}/signin`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                toastr.warning(res.error,'Please check Form !',
                {
                    "positionClass": "toast-bottom-left"
                }
                )
            }
            else{
                toastr.info('User is authenticated Successfully !','Welcome',
                    {
                        "positionClass": "toast-bottom-left"
                    }
                )
                localStorage.setItem('jwt_info',JSON.stringify(res))
                props.history.push('/')
            }
        })
        .catch(err=>toastr.warning(err.error,'Server Error',
        {
            "positionClass": "toast-bottom-left"
        }
        ))
    }
       const form = () =>(
        <form onSubmit={submitSignin}>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">email</label>
                <input onChange={handleChange} type="text" className="form-control" id="email"/>
            </div>
            
            <div className="form-group">
                <label htmlFor="password" className="text-muted">password</label>
                <input onChange={handleChange} type="text" className="form-control" id="password"/>
            </div>
            <button className="btn btn-lg btn-block btn-outline-info">Sign In</button>
        </form>
    )
    return (
        <div>
             <Layout title="SignIn" 
                    description="SignIn Node JS"
                    className="container"
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                    {form()}
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default Signin
