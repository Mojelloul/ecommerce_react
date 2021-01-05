import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCAtegories,FilterProduct} from './ApiCore'
import FilterByCategorie from './FilterByCategorie'
import FilterByPrice from './FilterByPrice'

const Shop = () => {
    const[categories,setCategories] = useState([])
    const[limit,setLimit] = useState(3)
    const[skyp,setSkyp] = useState(0)
    const[size,setSize] = useState(0)
    const[productFiltred,setProductFiltred] = useState([])

    const[myFilters,setMyFilters] = useState({
        category:[],
        price:[]
    })

    useEffect(() => {
        getCAtegories().then(res => setCategories(res))
        
        FilterProduct(skyp,limit,myFilters)
        .then(res => 
            {
                setProductFiltred(res)
                setSkyp(0)
                setSize(res.length)
            })
    }, [myFilters])
    
    const handleFilters = (data,filterby) =>{
        setSkyp(0)
        setMyFilters({...myFilters,[filterby]:data})
    }
    const loadMore = () =>{
        const toSkyp = skyp + limit;
        FilterProduct(toSkyp,limit,myFilters)
        .then(res => 
            {
                setProductFiltred([...productFiltred,...res])
                setSize(res.length)
                setSkyp(toSkyp)
            }
            )
    }
    const buttonToLoadMore = () =>{
        return(
            size > 0 &&
            size >= limit &&
            (
            <div className="text-center mb-1">
                <button className="btn btn-outline-success" onClick={loadMore}>Load More</button>
            </div>
            )
        )
    }
    return (
        <div>
            <Layout title="Shop Page" 
                    description="Shop"
                    className="container"
            >
                <div className="row">
                <div className="col-md-3">
                    <FilterByCategorie
                        handleFilters={(data) => handleFilters(data,'category')}
                        categories={categories}
                    />
                    <FilterByPrice
                        handleFilters={(data) => handleFilters(data,'price')}
                    />
                </div>
                <div className="col-md-9">
                    <h1>Beast Sellers</h1>
                    <div className="row mt-3 mb-5">
                    {productFiltred.map((pro,i)=>(
                        <div key={pro._id} className="col-md-4">
                            <Card key={pro._id} product={pro}/>
                        </div>
                    ))
                    }
                </div>
                    {buttonToLoadMore()}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Shop
