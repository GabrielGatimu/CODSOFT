import {Link, useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import '../../styles/custom.css'
import useAuth from "../../hooks/useAuth.js";
import {useGetJobMutation} from "../../state/slices/jobs/jobApi.slice.js";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import Loader from "../../components/Loader.jsx";

export default function JobDetail() {
    const fetchJobRef = useRef(false);
    const navigate = useNavigate();
    const {jobId} = useParams();
    const {userInfo} = useAuth()
    const [job, setJob] = useState(null)
    const jobs = useSelector((state) => state.jobs.jobList)

    const [getJobApiCall, {isLoading, error}] = useGetJobMutation()

    useEffect(() => {
        if (fetchJobRef.current) return
        fetchJobRef.current = true

        const stateJob = jobs.find(j => j.id === +(jobId));
        if (!stateJob) {
            getJob()
        } else {
            setJob(stateJob)
        }
    }, []);

    const getJob = async () => {
        try {
            const jobData = await getJobApiCall(jobId).unwrap()
            setJob(jobData)
        } catch (e) {
            // console.error(e)
            toast(e?.data?.message)
        }
    }

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleApplyClick = () => {
        alert('Apply to the job');
    };

    return (
        <div className="px-2 md:px-20 py-8">
            {/* Back button */}
            <button className="btn black-btn mb-4" onClick={handleBackClick}>Back</button>
            {userInfo &&
                <>
                    <Link to={'/dashboard'}
                          className="mx-4 text-white py-1 px-2 rounded-md w-fit bg-gradient-to-r hover:bg-gradient-to-l from-indigo-600 to-indigo-400  hover:from-indigo-600 hover:to-indigo-400">Dashboard</Link>
                </>
            }

            <div className="block w-full md:flex justify-center">
                {isLoading ?
                    <><Loader/> <p>loading...</p></>
                    :
                    ((job !== null) ?
                            (
                                <div
                                    className="bg-slate-200 h-auto w-auto px-6 py-2 border border-stone-900 md:border-none rounded-md shadow-md overflow-hidden">
                                    <div className="company-info">
                                        {/*<img src={job.companyLogo} alt="company-logo"/>*/}
                                        <h4 className="bg-stone-500 text-slate-50 px-1 h-6 rounded">{job.company}</h4>
                                    </div>
                                    <h3 className="text-2xl font-extrabold">{job.title}</h3>
                                    <p className="text-stone-600 my-2">{job.salary}</p>
                                    <p className="">{job.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="font-bold text-stone-800"
                                        > {skill} <span
                                            className="text-xl font-extrabold text-amber-600">| </span></span>
                                    ))}
                                    </p>

                                    <h4>Category: {job.category}</h4>
                                    <p>Location: {job.location}</p>
                                    <p>Type: {job.type}</p>
                                    <p>Experience: {job.experience}</p>
                                    <p>Description: {job.description}</p>
                                    <p>Posted on: {job.createdAt}</p>

                                    {/* Apply button */}
                                    {userInfo && (userInfo || userInfo.userId) === job.employer_id ? '' :
                                        <button className="btn green-btn" onClick={handleApplyClick}>Apply</button>
                                    }
                                </div>
                            )
                            : (
                                <p>Job not found or Employer might have removed it</p>
                            )
                    )
                }
            </div>
        </div>
    )
}

