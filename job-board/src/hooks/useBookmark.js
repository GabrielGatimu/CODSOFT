// import {useState} from 'react';
// import {toast} from 'react-toastify';
// import {useDispatch, useSelector} from 'react-redux';
// import {useToggleBookmarkMutation} from '../state/slices/jobs/jobApi.slice';
// import {removeBookmark, setUserBookmarks} from '../state/slices/jobs/job.slice';
// import useAuth from '../hooks/useAuth';
//
// const useBookmark = async (job) => {
//     const dispatch = useDispatch();
//     const {userInfo} = useAuth();
//     const bookmarks = useSelector((state) => state.jobs.bookmarkedJobs);
//     const [isJobBookmarked, setIsJobBookmarked] = useState(
//         bookmarks.some((bookmarkedJob) => bookmarkedJob.id === job.id)
//     );
//
//     const [toggleBookmarkApiCall] = useToggleBookmarkMutation();
//
//     try {
//         if (!userInfo) {
//             alert('Login first in order to save your favorite jobs');
//             return;
//         }
//
//         const response = await toggleBookmarkApiCall(job.id).unwrap();
//
//         if (!isJobBookmarked) {
//             dispatch(setUserBookmarks([job]));
//         } else {
//             dispatch(removeBookmark(job.id));
//         }
//
//         setIsJobBookmarked(!isJobBookmarked);
//         toast.success(response.message);
//     } catch (error) {
//         console.error(error);
//         toast.error('An error occurred while bookmarking.');
//     }
// }
//
// export default useBookmark
//
//
//
