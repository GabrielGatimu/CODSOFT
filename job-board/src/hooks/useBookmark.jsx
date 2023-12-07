import {useState} from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {Bookmark} from 'lucide-react';
import {useToggleBookmarkMutation} from '../state/slices/jobs/jobApi.slice';
import {removeBookmark, setUserBookmarks} from '../state/slices/jobs/job.slice';
import useAuth from '../hooks/useAuth';

function useBookmark(job) {
    const dispatch = useDispatch();
    const {userInfo} = useAuth();
    const bookmarks = useSelector((state) => state.jobs.bookmarkedJobs);
    const [isJobBookmarked, setIsJobBookmarked] = useState(
        bookmarks.some((bookmarkedJob) => bookmarkedJob.id === job.id)
    );

    const [toggleBookmarkApiCall] = useToggleBookmarkMutation();

    const handleBookmark = async () => {
        try {
            if (!userInfo) {
                alert('Login first in order to save your favorite jobs');
                return;
            }

            const response = await toggleBookmarkApiCall(job.id).unwrap();

            if (!isJobBookmarked) {
                dispatch(setUserBookmarks([job]));
            } else {
                dispatch(removeBookmark(job.id));
            }

            setIsJobBookmarked(!isJobBookmarked);
            toast.success(response.message);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while bookmarking.');
        }
    };

    const BookmarkIcon = () => (
        <Bookmark
            className={`cursor-pointer ${
                isJobBookmarked ? '"fill-indigo-700 text-indigo-700"' : ''
            }`}
            onClick={handleBookmark}
        />
    )

    return {BookmarkIcon, isJobBookmarked}
}

export default useBookmark;
