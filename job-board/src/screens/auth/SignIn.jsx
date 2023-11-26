import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";

import '../../styles/custom.css'
import useAuth from "../../hooks/useAuth.js";
import {useGoogleMutation, useSigninMutation} from "../../state/slices/auth/authApi.slice.js";
import {setCredentials} from "../../state/slices/auth/auth.slice.js";
import Loader from "../../components/Loader.jsx";

export default function SignIn() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useAuth()
    const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID
    const redirectPath = location.state ? location.state.path : "/dashboard"
    const [signinAPICall, {isLoading, error}] = useSigninMutation()
    const [googleAuthAPICall, {googleError}] = useGoogleMutation()

    const getGoogleUser = async (credentialResponse, redirectPath) => {
        try {
            // decoding credential
            const decoded = await jwtDecode(credentialResponse.credential)
            const userData = {
                first_name: decoded.family_name,
                last_name: decoded.given_name,
                email: decoded.email
            }

            // API call
            const response = await googleAuthAPICall(userData).unwrap()
            dispatch(setCredentials({...response}))
            navigate(redirectPath)
        }catch (e) {
            toast.error(e?.data?.message || e.error)
        }
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
                {isLoading && <Loader />}
                {(error || googleError) && <h3>{error} || {googleError} </h3>}
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

