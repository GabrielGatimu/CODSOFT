import {useSelector} from "react-redux";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
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

    return {userInfo: getUserInfo()}
}

export default useAuth