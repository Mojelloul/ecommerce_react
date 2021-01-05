import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import signin from './user/Signin'
import signup from './user/Signup'
import home from './core/Home'
import Shop from './core/Shop'
import Menu from './core/Menu'
import Cart from './core/Cart'
import Product from './core/Product'
import Dashboard from './user/Dashboard'
import AdminDashboard from './user/AdminDashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/caregory/AddCategory'
import AddProduct from './admin/product/AddProduct'

const Routes = () => {
    return (
        <BrowserRouter>
                <Menu/>
            <Switch>
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
                <PrivateRoute path='/Shop' exact component={Shop} />
                <Route path='/product/:id' exact component={Product} />
                <AdminRoute path='/Admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/category/create' exact component={AddCategory} />
                <AdminRoute path='/products/create' exact component={AddProduct} />
                <Route path='/signin' exact component={signin} />
                <Route path='/signup' exact component={signup} />
                <Route path='/cart' exact component={Cart} />
                <PrivateRoute path='/' exact component={home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
