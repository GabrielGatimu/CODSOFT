import {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import JobCard from "../../components/jobs/JobCard.jsx";
import Loader from "../../components/Loader.jsx";
import {useGetEmployerJobsMutation} from "../../state/slices/jobs/jobApi.slice.js";
import {setEmployerJobs} from "../../state/slices/jobs/job.slice.js";

export default function PostedJobs() {
    const userJobsFetchedRef = useRef(false);
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
        if (userJobsFetchedRef.current) return
        userJobsFetchedRef.current = true

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
            <h1 className="font-bold p-1 mb-2 md:mb-6 w-full text-stone-900 text-xl md:text-2xl leading-4 flex justify-center">My
                jobs</h1>

            <div
                className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 items-center
                 border-red-500 p-2 md:px-10 gap-4 md:gap-6
                `}>
                {isLoading && <><Loader/> <p>loading...</p></>}

                {(filteredJobs.length > 0) ?
                    filteredJobs.map((jobItem) => (
                        <JobCard key={jobItem.id} job={jobItem} userIsEmployer={true}/>
                    ))
                    :
                    (<p>You have not posted any jobs</p>)
                }
            </div>
        </div>
    );
}

