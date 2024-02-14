/* eslint-disable no-unused-vars */
import {Route, Routes, Navigate} from 'react-router-dom'
import {Children, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return <Routes>
        <Route {...rest}>!user ? <Navigate to="/login" />:children</Route>
    </Routes>
}

