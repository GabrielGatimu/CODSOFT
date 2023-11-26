import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";

import '../../styles/custom.css'
import {setCredentials} from "../../state/slices/auth/auth.slice.js";
import useAuth from "../../hooks/useAuth.js";

export default function SignIn() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useAuth()
    const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID
    const redirectPath = location.state ? location.state.path : "/dashboard"

   const getGoogleUser = (credentialResponse) => {

       console.log(credentialResponse)
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
            <div className="flex flex-col gap-y-4 ml-4">
                <button onClick={handleSignin} className="btn bg-green-600">Login</button>
                <GoogleOAuthProvider clientId={googleClientId}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            getGoogleUser(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Error occurred when signing in with Google');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>

        </div>
    );
}

