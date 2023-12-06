import {useEffect, useState, useRef} from "react";
import {toast} from "react-toastify";
import {useGetUserMutation, useUpdateUserMutation} from "../state/slices/profile/profileApi.slice.js";

export default function Profile() {
    const dataFechedRef = useRef(false)
    const [getProfile, {isLoading: getProfileLoading, error: getProfileError}] = useGetUserMutation()
    const [updateProfile, {isLoading: updateProfileLoading, error: updateUserError}] = useUpdateUserMutation()
    const [userData, setUserData] = useState('')
    let newData

    const [formData, setFormData] = useState({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        role: userData.role,
        auth_source: userData.auth_source,
        verified: userData.verified,
        password: "",
        confirm_password: ""
    });

    useEffect(() => {
        if (dataFechedRef.current) return
        dataFechedRef.current = true
        const getUser = async () => {
            const response = await getProfile().unwrap()
            console.log(response)
            newData = response
            setUserData(newData)
            console.log(newData)
            console.log(userData)
        }
        getUser()
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit =  async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirm_password) {
            toast.error("Passwords do not match");
        } else {
            try {
                setUserData({...formData})
                console.log(userData)
                const dataToUpdate = {
                    first_name: userData.first_name
                }

                console.log(dataToUpdate)
                // const response = await updateProfile({
                //     // formData.first_name
                //     // formData.last_name,
                //     // formData.email,
                //     // formData.password
                // }).unwrap();
                // dispatch(setCredentials({ ...response }));
                toast.success("Profile Updated");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

    }


    return (
        <div>
            Profile
            <form onSubmit={handleSubmit} >
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
            <br/>
            <button type="submit" className="btn bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">Update</button>
            </form>
        </div>
    );
}

