import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";

import '../../styles/custom.css'
import './SignUpSignIn.css'
import useAuth from "../../hooks/useAuth.js";
import {useGoogleMutation, useSigninMutation, useSignupMutation} from "../../state/slices/auth/authApi.slice.js";
import {setCredentials} from "../../state/slices/auth/auth.slice.js";
import Loader from "../../components/Loader.jsx";

export default function SignUpSignIn() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useAuth()
    const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID
    const redirectPath = location.state ? location.state.path : "/dashboard"

    // -- API calls
    let [signupAPICall, {isLoading: signUpLoading, error: signUpError}] = useSignupMutation()
    const [signinAPICall, {isLoading: signInLoading, error: signInError}] = useSigninMutation()

    const [googleAuthAPICall, {googleError}] = useGoogleMutation()

    //  -- form state
    const [isSignUp, setIsSignUp] = useState(false);

    //  generic toggle function
    const toggleState = (state, setState) => {
        setSuccessMessage('') // clear success message -> avoids unambigous messages
        setState(prevState => !prevState);
    };
    const [successMessage, setSuccessMessage] = useState('')

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setSuccessMessage('')

        try {
            let response

            if (isSignUp) {
                signUpError = ''
                if (formData.password !== formData.confirm_password) {
                    toast.error("Passwords do not match. Please check and try again");
                    return;
                }
                response = await signupAPICall(formData).unwrap()
                setSuccessMessage(response.message)
                return
            }

            response = await signinAPICall({email: formData.email, password: formData.password}).unwrap()

            // -- set email verification message if user !verified
            if (response.emailVerificationMessage) {
                setSuccessMessage(response.emailVerificationMessage)
                toast.success(response.emailVerificationMessage)
            } else {
                dispatch(setCredentials({...response}))
                navigate(redirectPath)
            }
        } catch (err) {
            toast.error(err?.data?.message || err?.data?.errors[0]?.msg ||  err.error);
        }
    }

    const getGoogleUser = async (credentialResponse) => {
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
        } catch (e) {
            toast.error(e?.data?.message || e.error)
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirectPath);
        }
    }, [userInfo, navigate, redirectPath]);

    return (
        <div className="flex h-full items-center justify-center p-4">
            <form className="bg-white p-10 rounded shadow-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-6 font-bold text-stone-900">{isSignUp ? 'Create an Account' : 'Sign In'}</h2>
                {/* inputs */}
                {isSignUp && (
                    <div className="input-group">
                        <label htmlFor="first_name">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="first name..."
                            required
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                {isSignUp && (
                    <div className="input-group">
                        <label htmlFor="last_name">
                            Last name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="last name..."
                            required
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className="input-group">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">
                        Password
                    </label>
                    <div className="flex items-center space-x-1">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {showPassword ?
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  cursor-pointer "
                                     onClick={() => toggleState(showPassword, setShowPassword)}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                </svg>

                            ) :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6   cursor-pointer "
                                     onClick={() => toggleState(showPassword, setShowPassword)}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            )

                        }
                    </div>
                </div>
                {isSignUp && (
                    <div className="input-group">
                        <label htmlFor="confirm_password">
                            Confirm Password
                        </label>
                        <div className="flex items-center space-x-1">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirm_password"
                                placeholder="Confirm your password"
                                required
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                            />
                            {showPassword ?
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer "
                                         onClick={() => toggleState(showPassword, setShowPassword)}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                    </svg>

                                ) :
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6 cursor-pointer "
                                         onClick={() => toggleState(showPassword, setShowPassword)}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                )
                            }
                        </div>
                    </div>
                )}

                {/* Loading State*/}
                {(signUpLoading || signInLoading) && <div className="flex items-center"><Loader/> Please wait...</div>}
                {signUpError &&
                    <p className="flex items-center justify-center w-full p-4 rounded  text-red-500">
                        {signUpError.data.message}
                    </p>
                }

                {/* Action Buttons */}
                {(successMessage) ?
                    <p className="flex items-center justify-center w-full p-4 rounded   bg-green-500 text-white">
                        {successMessage}
                    </p>
                    :
                    <button
                        type="submit"
                        className={`w-full rounded-md h-10 bg-gradient-to-r from-indigo-800 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-800 text-white border border-indigo-800`}
                        disabled={signUpLoading || signInLoading}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>

                }

                {/* Reset Password Link */}
                {!isSignUp &&
                    <p className="my-2">
                        Forgot Password? <span className="ml-1 text-red-500 hover:text-red-600"><Link
                        to="/forgot-password"> Reset Here</Link></span>
                    </p>}

                {/* SignUp / SignIn toggle*/}
                <p className="text-sm mt-4">
                    {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                    <span className="text-blue-600 cursor-pointer ml-1"
                          onClick={() => toggleState(isSignUp, setIsSignUp)}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                    </span>
                </p>

                {/* Sign In with Google*/}
                <div className="mt-4 w-full">
                    {googleError && <h3>{googleError}</h3>}
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
            </form>
        </div>

    );
}

