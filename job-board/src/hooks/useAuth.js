import {useSelector} from "react-redux";

const useAuth = () => {
    const {userInfo} = useSelector((state) => state.auth)

    const getUserInfo = () => {
        return userInfo ? userInfo : null
    }

    return {userInfo: getUserInfo()}
}

export default useAuth