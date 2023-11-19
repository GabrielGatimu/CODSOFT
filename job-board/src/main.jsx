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
import JobListing from "./screens/jobLisiting/JobListing.jsx";
import Blog from "./screens/Blog.jsx";
import Contact from "./screens/Contact.jsx";
import Dashboard from "./screens/dashboards/Dashboard.jsx";
import Profile from "./screens/Profile.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            {/* public pages */}
            <Route index={true} path="/" element={<HomePage/>}/>
            <Route path="/jobs" element={<JobListing/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/contact" element={<Contact/>}/>

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard/>}/>

            {/* Profile Page */}
            <Route path="/profile" element={<Profile/>}/>

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
