import {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import JobCard from '../../components/jobs/JobCard.jsx';
import Loader from '../../components/Loader.jsx';
import {useGetUserBookmarksMutation} from '../../state/slices/jobs/jobApi.slice.js';
import {setUserBookmarks} from '../../state/slices/jobs/job.slice.js';
import useAuth from '../../hooks/useAuth.js';

export default function Favourites() {
    const bookmarksFetchedRef = useRef(false);
    const bookmarks = useSelector((state) => state.jobs.bookmarkedJobs);
    const [filteredBookmarks, setFilteredBookmarks] = useState([]);

    const [getBookmarksApiCall, {isLoading, error}] = useGetUserBookmarksMutation();
    const dispatch = useDispatch();
    const {userInfo} = useAuth();
    const isEmployer = userInfo.role;

    const fetchJobs = async () => {
        try {
            const bookmarkResponse = await getBookmarksApiCall().unwrap();

            // update state & bookmark datasource list
            if (bookmarkResponse.length > 0) {
                const extractedJobs = bookmarkResponse.map((item) => item.job)
                console.log(extractedJobs)
                dispatch(setUserBookmarks(extractedJobs))
                setFilteredBookmarks(extractedJobs)
            } else {
                setFilteredBookmarks([]);
            }
        } catch (e) {
            console.error(e);
            console.error(error)
            toast.error(error)
        }
    };

    useEffect(() => {
        if (bookmarksFetchedRef.current) return;
        bookmarksFetchedRef.current = true;

        // -- check if bookmarks data is available in state
        if (bookmarks.length === 0) {
            fetchJobs();
        } else {
            // -- use data from state
            setFilteredBookmarks(bookmarks);
        }
    }, []);

    return (
        <div>
            <div
                className={`flex flex-col px-4 md:grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 mb-10 md:px-24`}
            >
                {isLoading && <><Loader/> <p>loading...</p></>}

                {filteredBookmarks.length > 0 ? (
                    filteredBookmarks.map((bookmark) => (
                        <JobCard key={bookmark.id} job={bookmark} employerJob={isEmployer}/>
                    ))
                ) : (
                    <p>You have not bookmarked any jobs</p>
                )}
            </div>
        </div>
    );
}
