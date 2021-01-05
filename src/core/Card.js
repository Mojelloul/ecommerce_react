import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addToCart} from './../actions/cartActions'
import ShowImage from './ShowImage'
import moment from 'moment'

const Card = ({product,showView=true}) => {
    let dispatch = useDispatch()
    const infStock = (quantity) =>{
        return( 
            quantity > 0 ? <span className="badge-pill badge-info">{quantity} in Stock</span> : <span className="badge-pill badge-danger">no stock</span>
            
        )
    }
    return (
        <div>
            <div className="card my-2">
                <div className="card-header">
                    <h4 className="display-6">{product.name}</h4>
                    <ShowImage className="card-img-top" item={product} url="product/photo" />
                    <div className="card-body pl-0">
                        <p>{product.description}</p>
                        <div>
                        <h4><span className="badge badge-info">${product.price}</span></h4><br/>
                        <span className="badge-pill badge-dark">{product.category.name}</span><br/>
                        <span className="badge-pill badge-dark">Added {moment(product.createdAt).fromNow()}</span><br/>
                        {infStock(product.quantity)}
                        </div>
                        {showView &&
                        <Link to={`/products/${product._id}`}>
                        <button className="btn btn-warning">View</button>
                        </Link>
                        }
                        {product.quantity > 0 &&
                        <Link to="">
                        <button onClick={() => dispatch(addToCart(product))} className="btn btn-success">Add to Card</button>
                        </Link>
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
