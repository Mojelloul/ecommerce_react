import React from 'react'
import Layout from './Layout'
import {useSelector,useDispatch} from 'react-redux'
import ShowImage from './ShowImage'
import {incProductCount,decProductCount,deleteProduct} from './../actions/cartActions'

function Cart() {
    let products = useSelector(state => state.cart.products)
    let dispatch = useDispatch()
    return (
        <div>
            <Layout title="Cart" 
                    description="List of Products in Cart"
                    className="container-fluid"
            >
                <div className="row">
                    <div className="col-md-9">
                        <h4>Your Cart</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((pro,i)=>(
                                    <tr key={pro._id}>
                                        <td width="80px">
                                            <ShowImage className="card-img-top" item={pro} url="product/photo" />
                                        </td>
                                        <td>
                                            <h5>{pro.name}</h5>
                                            <p className="well">{pro.description}</p>
                                        </td>
                                        <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <h4>{pro.count}</h4>
                                            <button onClick={()=>dispatch(incProductCount(pro))} type="button" className="btn btn-success">
                                            <i className="material-icons">+</i>
                                            </button>
                                            {pro.count>1 && (
                                                <button onClick={()=>dispatch(decProductCount(pro))} type="button" className="btn btn-success">
                                                <i className="material-icons">-</i>
                                                </button>
                                            )}
                                            
                                        </div>
                                            
                                        </td>
                                        <td>${pro.price}</td>
                                        <td>${pro.price * pro.count}</td>
                                        <td className="text-right">
                                            <button onClick={()=>dispatch(deleteProduct(pro._id))} className="btn btn-sm btn-dark">
                                                <i className="material-icons">
                                                    delete
                                                </i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                
            </Layout>
        </div>
    )
}

export default Cart
