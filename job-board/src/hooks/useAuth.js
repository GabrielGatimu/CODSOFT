import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {removeCredentials} from "../state/slices/auth/auth.slice.js";

const useAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector((state) => state.auth)

    const getUserInfo = () => {
        return userInfo ? userInfo : null
    }

    const signOut = () => {
        dispatch(removeCredentials())
        navigate("/")
    }

    return {userInfo: getUserInfo(), signOut}
}

export default useAuth