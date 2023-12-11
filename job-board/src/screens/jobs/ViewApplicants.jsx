import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader.jsx';
import { useGetJobApplicationsMutation, useGetJobMutation } from '../../state/slices/jobs/jobApi.slice.js';
import {formatDate} from "../../utils/date.util.js";

export default function ViewApplicants() {
    const dataFetchedRef = useRef(false);

    // job
    const { jobId } = useParams();
    const initialJob = useSelector((state) => state.jobs.employerJobs.find((j) => j.id === +jobId));
    const [job, setJob] = useState(initialJob);
    const [getJobApiCall, { isLoading: getJobLoading, error: getJobError }] = useGetJobMutation();

    // job Applications
    const [getJobApplications, { isLoading: getApplicationsLoading, error: getApplicationsError }] = useGetJobApplicationsMutation();
    const [applicants, setApplicants] = useState([]);

    const getJob = async () => {
        try {
            const jobData = await getJobApiCall(jobId).unwrap();
            console.log(jobData);
            setJob(jobData);
        } catch (e) {
            console.error(e);
            toast(e?.data?.message);
        }
    };

    const fetchApplicants = async () => {
        try {
            const response = await getJobApplications(jobId).unwrap();
            setApplicants(response);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        if (!job) {
            getJob();
            fetchApplicants();
        } else {
            fetchApplicants();
        }
    }, []);



    const handleViewResume = (resumePath) => {
        // window.open(`http://localhost:8080/api/v1/jobs/${resumePath}`, '_blank');
        console.log(resumePath)
    };

    return (
        <div className="border border-red-500 px-2 md:px-8">
            {(getJobLoading || getApplicationsLoading) && <Loader />}
            <header className="">
                <span className="font-semibold text-stone-950 mr-3">Job:</span> {job?.title}
                <br />
                <span className="font-semibold text-stone-950 mr-3">Applicants:</span> {applicants && applicants.length}
                <br />
            </header>
            {/* Applicants data */}
            {applicants && applicants.map((applicant) => (
                <div key={applicant.id} className="my-4 border p-4">
                    <h3 className="font-semibold text-stone-800">
                        {applicant.user?.first_name} {applicant.user?.last_name}
                    </h3>
                    <p className="text-stone-600">
                        Applied on: {formatDate(applicant.createdAt)}
                    </p>
                    <button
                        onClick={() => handleViewResume(applicant.resumePath)}
                        className="btn black-btn mt-4"
                    >
                        View Resume
                    </button>
                </div>
            ))}
        </div>
    );
}
