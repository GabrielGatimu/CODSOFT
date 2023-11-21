import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import '../../styles/custom.css'
import {setCredentials} from "../../state/slices/auth/auth.slice.js";
import useAuth from "../../hooks/useAuth.js";

export default function SignIn() {
    const location = useLocation()
    const navigate  = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useAuth()
    const redirectPath = location.state ? location.state.path : "/dashboard"

    const handleSignin = e => {
        e.preventDefault()

        dispatch(setCredentials({accessToken : 'jwt-token', userName: 'John Doe'}))
        navigate(redirectPath)
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirectPath);
        }
    }, [userInfo, navigate, redirectPath]);

    return (
        <div>
           <button onClick={handleSignin} className="btn bg-green-600">Login</button>
        </div>
    );
}

