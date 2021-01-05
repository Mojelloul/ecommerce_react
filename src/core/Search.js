import React,{useEffect,useState} from 'react'
import {getCAtegories,getProducts} from './ApiCore'
import Card from './Card'


function Search() {
    const [categories,setCategories] = useState([])
    const [product,setProduct] = useState([])
    const [searchData,setSearchData] = useState({search:'',category:''})

    const handleChange = (e)=>{
        setSearchData({...searchData,[e.target.id]: e.target.value})
    }
    const countProducts = () =>{
        return( product && product.length >0 &&
            <h3>Found {product.length} Product(s)</h3>)
    }
    const searchSubmit = (e)=>{
        e.preventDefault()
        let {search, category} = searchData
        if(search || category){
        getProducts({search: search || undefined,category})
        .then(res => setProduct(res))}
        else{
            setProduct([])
        }
    }

    useEffect(() => {
        getCAtegories()
        .then(categories => setCategories(categories))
    }, [])
    useEffect(() => {
        getCAtegories()
        .then(res => setCategories(res))
    }, [])

    return (
        <div>
            <form onSubmit={searchSubmit}>
                <div className="input-group input-group-lg" >
                    <div className="input-group-prepend">
                        <select onChange={handleChange} id="category" className="btn">
                            <option value="">Select a Category</option>
                            {categories && categories.map(cat=>
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        )
                        }
                        </select>
                    </div>
                    <input onChange={handleChange} id="search" type="search" className="form-control mx-4"/>
                    <div className="input-group-apprend">
                        <button className="btn">Search</button>
                    </div>
                </div>
            </form>
            <hr/>
            {countProducts()}
            <div className="row">
                {product.map((product,i)=>(
                    <div key={product._id} className="col-md-4">
                        <Card product={product} />
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Search
