import React from 'react'
import {Link} from 'react-router-dom'
import Layout from './../core/Layout'
import {isAuthenticated} from '../auth/helpers'
function Dashboard() {
    const {user:{email, name, role}} = isAuthenticated()
    const Userlinks = () =>{
        return(
            <div className="card">
                        <div className="card-header">
                            User Links
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                                <Link className='nav-link' to='/cart'>My cart</Link>
                            </li>
                            <li className='list-group-item'>
                                <Link className='nav-link' to='/profile'>Profile</Link>
                            </li>
                        </ul>
                    </div>
        )
    }
    const History = () =>{
        return(
            <div className="card">
                        <div className="card-header">
                        History
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                                <h1>History</h1>
                            </li>
                        </ul>
                    </div>
        )
    }
    const UserInfo = () =>{
        return(
            <div className="card">
                        <div className="card-header">
                            User Information
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
                    {History()}
                    <br/>
                    {UserInfo()}
                </div>
            </div>
            </Layout>
        </>
    )
}

export default Dashboard
