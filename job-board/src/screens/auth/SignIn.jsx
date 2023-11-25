import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import '../../styles/custom.css'
import {setCredentials} from "../../state/slices/auth/auth.slice.js";
import useAuth from "../../hooks/useAuth.js";

import googleButton from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'

export default function SignIn() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID
    const {userInfo} = useAuth()
    const redirectPath = location.state ? location.state.path : "/dashboard"

    const googleLogin = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/v1/request/', {method: 'post'});

        const data = await response.json();
        console.log(data);
        window.location.href = data.url
    }
    const handleSignin = e => {
        e.preventDefault()

        dispatch(setCredentials({accessToken: 'jwt-token', userName: 'John Doe', userRole: 'admin'}))
        navigate(redirectPath)
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirectPath);
        }
    }, [userInfo, navigate, redirectPath]);

    return (
        <div>
            <button className="btn" onClick={googleLogin}>
                <img src={googleButton} alt='google sign in'/>
            </button>
            <button onClick={handleSignin} className="btn bg-green-600">Login</button>
        </div>
    );
}

