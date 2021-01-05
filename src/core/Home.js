import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Search from './Search'
import {getProducts} from '../core/ApiCore'
import Card from '../core/Card'

function Home() {
    const[productBS,setProductBS] = useState([])
    const[productA,setProductA] = useState([])

    const loadBS = () => {
        getProducts({sortBy: 'sold',order: 'desc',limit: 6})
        .then(res => setProductBS(res))
    }
    const loadA = () => {
        getProducts({sortBy: 'createdAt',order: 'desc',limit: 3})
        .then(res => setProductA(res))
    }
    useEffect(()=>{
        loadBS()
        loadA()
    },[])
    return (
        <div>
            <Layout title="Home Page" 
                    description="Node JS"
                    className="container"
            >

            <Search/>
            <hr/>
            <h1>beast Seller</h1>
                <div className="row ">
            {productA.map((pro,i)=>(
                <div key={i} className="col-md-4">
                <Card key={i} product={pro}/>
                </div>
            ))
            }
                </div>

            <h1>Last Arrival</h1>
            <div className="row ">
            {productBS.map((pro,i)=>(
                <div key={i} className="col-md-4">
                <Card key={i} product={pro}/>
                </div>
            ))
            }
                </div>
            </Layout>
        </div>
    )
}

export default Home
