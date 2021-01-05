import React from 'react'
import {Link} from 'react-router-dom'
import Layout from './../core/Layout'
import {isAuthenticated} from '../auth/helpers'
function AdminDashboard() {
    const {user:{email, name, role}} = isAuthenticated()
    const Userlinks = () =>{
        return(
            <div className="card">
                        <div className="card-header">
                            User Links
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                                <Link className='nav-link' to='/category/create'>create category</Link>
                            </li>
                            <li className='list-group-item'>
                                <Link className='nav-link' to='/products/create'>create product</Link>
                            </li>
                        </ul>
                    </div>
        )
    }
    const AdminInfo = () =>{
        return(
            <div className="card">
                        <div className="card-header">
                            Admin Information
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{email}</li>
                            <li className="list-group-item">{name}</li>
                            <li className="list-group-item">{role?'Admin':'User'}</li>
                        </ul>
                    </div>
        )
    }
    return (
        <>
            <Layout
                title={`Bonjour ${name}`}
                description="Dashboard user"
                className="container"
            >
            <div className="row">
                <div className="col-md-3">
                    {Userlinks()}
                </div>
                <div className="col-md-9">
                    {AdminInfo()}
                </div>
            </div>
            </Layout>
        </>
    )
}

export default AdminDashboard
