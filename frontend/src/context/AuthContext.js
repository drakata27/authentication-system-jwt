/* eslint-disable no-unused-vars */
import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'


const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        // return localStorage.getItem("authTokens") //check if return is used correct
        //     ? JSON.parse(localStorage.setItem('authTokens')) 
        //     : null 
        if(localStorage.getItem("authTokens")) {
            JSON.parse(localStorage.setItem('authTokens')) 
        }
    })

    const [user, setUser] = useState(()=> {
        // localStorage.getItem("authTokens")
        //     ? jwt_decode(localStorage.getItem("authTokens"))
        //     : null

        if (localStorage.getItem("authTokens")) {
            jwt_decode(localStorage.getItem("authTokens"))
        }
    })

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const loginUser = async (email, password) => {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({email, password})
        })

        const data = await response.json()
        console.log('data', data);

        if (response.status===200){
            console.log('Logged in');
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate('/')
        } else {
            console.log('Server issue: '+response.status);
            alert('Something went wrong: ' + response.status)
        }
    }

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method : 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({email, username, password, password2})
        })

        if (response.status===201){
            console.log('Account was created');
            navigate('/login')
        } else {
            console.log('Server issue: '+response.status);
            alert('Something went wrong: ' + response.status)
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate('/login')
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(()=> {
        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}