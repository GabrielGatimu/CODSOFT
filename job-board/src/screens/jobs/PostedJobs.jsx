import {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import JobCard from "../../components/jobs/JobCard.jsx";
import Loader from "../../components/Loader.jsx";
import {useGetEmployerJobsMutation} from "../../state/slices/jobs/jobApi.slice.js";
import {setEmployerJobs} from "../../state/slices/jobs/job.slice.js";

export default function PostedJobs() {
    const dataFetchedRef = useRef(false);
    const jobs = useSelector(state => state.jobs.employerJobs)
    const [filteredJobs, setFilteredJobs] = useState([])

    const [getJobsApiCall, {isLoading, error}] = useGetEmployerJobsMutation()
    const dispatch = useDispatch()

    const fetchJobs = async () => {
        try {
            const response = await getJobsApiCall().unwrap()
            dispatch(setEmployerJobs(response))
            setFilteredJobs(response)
        } catch (e) {
            console.error(e)
            console.error(error)
            toast.error(error)
        }
    }

    useEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        // -- check if jobs data is available in state
        if (jobs.length === 0) {
            fetchJobs();
        } else {
            // -- use data from state
            setFilteredJobs(jobs);
        }
    }, []);

    return (
        <div>
            <div
                className={`flex flex-col px-4 md:grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 mb-10 md:px-24`}>
                {isLoading && <><Loader/> <p>loading...</p></>}
                {(filteredJobs.length > 0) ?
                    filteredJobs.map((jobItem) => (
                        <JobCard key={jobItem.id} job={jobItem} employerJob={true}/>
                    ))
                    :
                    (<p>You have not posted any jobs</p>)
                }
            </div>
        </div>
    );
}

