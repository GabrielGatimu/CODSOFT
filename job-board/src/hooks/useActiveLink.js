import {useLocation} from "react-router-dom";

const useActiveLink = () => {
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter((segment) => segment !== '')

    if (pathSegments.length === 0) {
        // user is at root domain
        return '/'
    } else {
        return `/${pathSegments[0]}`
    }
}

export default useActiveLink;
