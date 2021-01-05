import React,{useState,useEffect} from 'react'
import Layout from '../../core/Layout'
import toastr from 'toastr'
import "toastr/build/toastr.css";
import {API_URL} from '../../config'
import { isAuthenticated } from "../../auth/helpers";

function AddProduct() {
    const [Product, setProduct] = useState({
        photo:'',
        name:'',
        description:'',
        quantity:0,
        price:0,
        shipping:false,
        category:0
    }) 

    const [formData,setFormData] = useState(new FormData())
    const [categorie,setCategorie] = useState([])

    const getCAtegories = () => {
        fetch(`${API_URL}/category`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"appication/json"
            }
        })
        .then(res => res.json())
        .then(res => setCategorie(res.category))
        .catch(err => console.error(err))
    }

    useEffect(()=>{
        getCAtegories()
    },[])

    const handleChange = (e) =>{
        const value = e.target.id === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.id, value)
        setProduct({...Product,[e.target.id]: value})
    }

    const submitProduct = (e) =>{
        e.preventDefault()
        const {user,token} = isAuthenticated()
        fetch(`${API_URL}/product/create/${user._id}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: formData
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
                toastr.info(`Product ${Product.name} Created`,'New Product',
                    {
                        "positionClass": "toast-bottom-left"
                    }
                )
                setProduct({
                    photo:'',
                    name:'',
                    description:'',
                    quantity:0,
                    price:0,
                    shipping:false,
                    category:0
                })
                setFormData(new FormData())
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
            <Layout title="Product" 
                    description="Add Product"
                    className="container"
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                <form onSubmit={submitProduct}>

                    
                    <div className="input-group">
                        <div className="custom-file">
                            <label htmlFor="photo" className="custom-fole-label" >Product</label>
                            <input onChange={handleChange} id="photo" name="photo" type="file" className="custom-file-input"/>
                        </div>
                    </div>
                    

                    <div className="form-group">
                        <label className="text-muuted" htmlFor="">name</label>
                        <input value={Product.name} required autoFocus onChange={handleChange} type="text" placeholder='New Product' id="name" className="form-control" />
                    </div>

                    <div class="form-group">
                    <label htmlFor="description">description</label>
                    <textarea value={Product.description} onChange={handleChange} name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                    </div>

                    <div class="form-group">
                    <label htmlFor="quantity">quantity</label>
                    <input  value={Product.quantity} onChange={handleChange} type="number" id="quantity" className="form-control"/>
                    </div>

                    <div class="form-group">
                    <label htmlFor="price">price</label>
                    <input value={Product.price} onChange={handleChange} type="number" id="price" className="form-control"/>
                    </div>

                    <div class="form-group">
                    <label htmlFor="category">category</label>
                    <select value={Product.category} onChange={handleChange} name="category" id="category" className="form-control">
                        <option value="0">select a categorie</option>
                        { categorie && categorie.map((cat,i)=>(
                            <option key={i} value={cat._id}>{cat.name}</option>
                        ))

                        }
                    </select>
                    </div>
                    
                    <div class="form-group">
                    <label htmlFor="shipping">shipping</label>
                    <select value={Product.shipping} onChange={handleChange} name="shipping" id="shipping" className="form-control">
                        <option value="false">NO</option>
                        <option value="true">YES</option>
                    </select>
                    </div>
                    {JSON.stringify(Product)}
                    <button type="submit" className="my-4 btn btn-primary btn-block">Add Product</button>
                </form>
                </div>
                </div>


            </Layout>
        </div>
    )
}

export default AddProduct
