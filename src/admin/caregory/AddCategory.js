import React,{useState} from 'react'
import Layout from '../../core/Layout'
import toastr from 'toastr'
import "toastr/build/toastr.css";
import {API_URL} from '../../config'
import { isAuthenticated } from "../../auth/helpers";

function AddCategory() {
    const [category, setCategory] = useState('') 

    const handleChange = (e) =>{
        setCategory(e.target.value)
    }

    const submitCategory = (e) =>{
        e.preventDefault()
        const {user,token} = isAuthenticated()
        fetch(`${API_URL}/category/create/${user._id}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({name:category})
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
                toastr.info(`category ${category} Created`,'New Category',
                    {
                        "positionClass": "toast-bottom-left"
                    }
                )
                setCategory('')
            }
        })
        .catch(err=>toastr.warning(err.error,'Server Error',
        {
            "positionClass": "toast-bottom-left"
        }
        ))
    }
    return (
        <div>
            <Layout title="Category" 
                    description="Add Category"
                    className="container"
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                <form onSubmit={submitCategory}>
                    <div className="form-group">
                        <label className="text-multed" htmlFor="form1Example1"></label>
                        <input value={category} required autoFocus onChange={handleChange} type="text" placeholder='New Category' id="NewCategory" className="form-control" />
                    </div>


                    <button type="submit" className="btn btn-primary btn-block">Add Category</button>
                </form>
                </div>
                </div>


            </Layout>
        </div>
    )
}

export default AddCategory
