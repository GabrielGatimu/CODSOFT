import {useSelector} from "react-redux";

const useAuth = () => {
    const {userInfo} = useSelector((state) => state.auth)

    const getUserInfo = () => {
        if (userInfo && userInfo.user) {
            return userInfo.user;
        } else {
            return null;
        }
    }

    return {userInfo: getUserInfo()}
}

export default useAuth