import {useDispatch, useSelector} from "react-redux";
import {removeCredentials} from "../state/slices/auth/auth.slice.js";

const useAuth = () => {
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state) => state.auth)

    const getUserInfo = () => {
        return userInfo ? userInfo : null
    }

    const signOut = () => {
        dispatch(removeCredentials())
    }

    return {userInfo: getUserInfo(), signOut}
}

export default useAuth