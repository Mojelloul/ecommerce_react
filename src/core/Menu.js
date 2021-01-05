import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import toastr from 'toastr'
import {useSelector} from 'react-redux'
import {isAuthenticated} from '../auth/helpers'
import "toastr/build/toastr.css";
import {API_URL} from './../config'

const isActive = (history,path)=>{
    if(history.location.pathname === path){
        return {color:'#000'}
    }else{
        return{color:'#fff'}
    }
}
const Menu = (props) => {
let countItem = useSelector(state => state.cart.count)
const signOut = () => {
    fetch(`${API_URL}/signout`)
    .then(()=>{
        toastr.warning('User SignOut','Next time',
                {
                    "positionClass": "toast-bottom-left"
                }
                )
        localStorage.removeItem('jwt_info')
        props.history.push('/signin')
    })
    .catch()
}
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-success">
            
                <Link className="navbar-brand" to="/">Ecommerce</Link>
            
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            
                    <li className="nav-item active">
                    <Link style={isActive(props.history,'/')} className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item active">
                    <Link style={isActive(props.history,'/Shop')} className="nav-link" to="/Shop">Shop <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item active">
                    <Link 
                        style={isActive(props.history,'/dashboard')} 
                        className="nav-link" 
                        to={`${isAuthenticated() && isAuthenticated().user.role ? '/Admin' : ''}/dashboard`}
                        >
                        Dashboard <span className="sr-only">(current)</span></Link>
                    </li>
             
                    
                </ul>
                <ul className="navbar-nav ml-auto">
                {!isAuthenticated() &&  
                    (
                    <Fragment>
                        <li className="nav-item">
                        <Link style={isActive(props.history,'/signin')} className="nav-link" to="/signin">CONNEXION</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link style={isActive(props.history,'/signup')} className="nav-link" to="/signup">Register</Link>
                        </li>
                    </Fragment>
                    )
                }
                <li className="nav-item">
                    <Link style={isActive(props.history,'/cart')} className="nav-link" to="/cart">
                        Cart <span className="badge badge-warning">{countItem}</span>
                    </Link>
                </li>
                    {isAuthenticated() && 
                        (
                            <li className="nav-item">
                            <span style={{cursor:'pointer'}} className="nav-link" onClick={signOut}>signOut</span>
                            </li>
                        )
                    }
                    
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default withRouter(Menu)
