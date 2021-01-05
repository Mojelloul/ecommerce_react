import React,{useState,useEffect} from 'react'
import {getOneProduct,relatedProduct} from './ApiCore'
import Layout from './Layout'
import Card from './Card'

const Product = (props) => {
const [product, setProduct] = useState({})
const [related, setRelated] = useState([])

useEffect(() => {

    getOneProduct(props.match.params.id)
    .then(product => {
        setProduct(product.product)
        return relatedProduct(props.match.params.id)
    })
    .then(rel => setRelated(rel) )

}, [])
    return (
        <div>
            {product && product.name &&
            <Layout title={product.name} 
                    description={product.description}
                    className="container"
            >
                <div className="row">
                    <div className="col-md-9">
                        <Card product={product} showView={false} />
                    </div>
                    <div className="col-md-3">
                        {related.map((rel,i)=>(
                            <Card product={rel} />
                        ))}                        
                    </div>
                </div>
            </Layout>
            }
        </div>
    )
}

export default Product
