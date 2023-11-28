import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";

// ---- state --- //
import {Provider} from "react-redux";
import store from "./state/store.js";

import App from './App.jsx'
import './styles/tailwind.css'

import HomePage from "./screens/HomePage.jsx";
import JobListing from "./screens/jobs/JobListing.jsx";
import JobDetail from "./screens/jobs/JobDetail.jsx";
import Blog from "./screens/Blog.jsx";
import Contact from "./screens/Contact.jsx";
import Account from "./components/layout/Account.jsx";
import Profile from "./screens/Profile.jsx";
import NotFound from "./components/NotFound.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import SignUpSignIn from "./screens/auth/SignUpSignIn.jsx";
import Sidebar from "./components/navigation/sidebar/Sidebar.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            {/* public pages */}
            <Route index={true} path="/" element={<HomePage/>}/>
            <Route path="/jobs" element={<JobListing/>}/>
            <Route path="/jobs/view/:jobId" element={<JobDetail/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/contact" element={<Contact/>}/>

            <Route path="/signin" element={<SignUpSignIn />} />
            {/* private pages*/}
            <Route path="" element={<PrivateRoute/>}>
                 Account
                <Route path="" element={<Account/>}>
                    {/* Profile Page */}
                    <Route path="/dashboard" element={<Profile/>}/>
                    {/*<Route path="/my-jobs" element={<Profile/>}/>*/}
                    {/*<Route path="/applications" element={<Profile/>}/>*/}
                </Route>
            </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFound/>}/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </Provider>
)
