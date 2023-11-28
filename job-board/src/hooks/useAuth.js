import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {removeCredentials} from "../state/slices/auth/auth.slice.js";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector((state) => state.auth)

    const getUserInfo = () => {
        if (userInfo && userInfo.accessToken) {
            try {
                const decoded = jwtDecode(userInfo.accessToken);
                return decoded;
            } catch (err) {
                console.error("Error decoding the token", err);
            }
        } else {
            return null;
        }
    }

    const signOut = () => {
        dispatch(removeCredentials())
        navigate("/")
    }

    return {userInfo: getUserInfo(), signOut}
}

export default useAuth