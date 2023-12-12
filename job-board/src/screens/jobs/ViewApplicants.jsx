import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {pdfjs} from "react-pdf";

import Loader from '../../components/Loader.jsx';
import {useGetJobApplicationsMutation, useGetJobMutation} from '../../state/slices/jobs/jobApi.slice.js';
import {formatDate} from "../../utils/date.util.js";
import PdfComponent from "../../components/pdf/PdfComponent.jsx";

import pdf from '../../../../job-board-api/uploads/1702395893502-john-ben.pdf'

export default function ViewApplicants() {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    const dataFetchedRef = useRef(false);

    // job
    const {jobId} = useParams();
    const initialJob = useSelector((state) => state.jobs.employerJobs.find((j) => j.id === +jobId));
    const [job, setJob] = useState(initialJob);
    const [getJobApiCall, {isLoading: getJobLoading, error: getJobError}] = useGetJobMutation();

    // job Applications
    const [getJobApplications, {
        isLoading: getApplicationsLoading,
        error: getApplicationsError
    }] = useGetJobApplicationsMutation();
    const [applicants, setApplicants] = useState([]);

    const getJob = async () => {
        try {
            const jobData = await getJobApiCall(jobId).unwrap();
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
        <div className="px-2 md:px-8">
            {(getJobLoading || getApplicationsLoading) && <Loader/>}
            <header className="">
                <span className="font-semibold text-stone-950 mr-3 text-xl">Job:</span> <span className=" ml-20 text-stone-800 text-xl italic">{job?.title}</span>
                <br/>
                <span className="font-semibold text-stone-950 mr-3 text-xl">Applicants:</span> <span className="ml-2 text-green-600 text-xl">{applicants ? applicants.length : '0'}</span>
                <br/>
            </header>
            <section className="flex items-center justify-center gap-10 flex-wrap mt-20 ">
            {/* Applicants data */}
            {applicants && applicants.map((applicant) => (
                <div key={applicant.id} className="my-4 p-4">
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

                    <PdfComponent pdf={pdf} />
                </div>
            ))}
            {applicants.length === 0 &&
                <p className="text-xl md:text-2xl text-indigo-700">
                    Oops! No one has applied to this job. Check later.
                </p>
            }
            </section>
        </div>
    );
}
