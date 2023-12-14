import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {pdfjs} from "react-pdf";

import './ViewApplicant.css'
import Loader from '../../components/Loader.jsx';
import {useGetJobApplicationsMutation, useGetJobMutation} from '../../state/slices/jobs/jobApi.slice.js';
import {formatDate} from "../../utils/date.util.js";
import PdfComponent from "../../components/pdf/PdfComponent.jsx";

import pdfFile from '../../../../job-board-api/uploads/1702395893502-john-ben.pdf'
import {useGetUserResumeMutation} from "../../state/slices/profile/profileApi.slice.js";

export default function ViewApplicants() {
    const dataFetchedRef = useRef(false);

    // react-pdf config
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

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

    // pdf
    const [pdf, setPdf] = useState(pdfFile);
    const [viewingPdf, setViewingPdf] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [getResume, {isLoading, error}] = useGetUserResumeMutation()

    const fetchResume = async (resumeName) => {
        try {
            const response = await getResume(resumeName)
            console.log(response) // buffer stream
            // setPdf(response)

        } catch (e) {
            console.error(e)
        }
    }
    const handleViewResume = async (resumePath) => {
        // setPdf(`http://localhost:8080/api/v1/jobs/resume/${resumePath}`)
        await fetchResume(resumePath)

        setSelectedPdf(resumePath);
        setViewingPdf(true);
    };

    const handleClosePdf = () => {
        setViewingPdf(false);
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


    return (
        <div className="px-2 md:px-8">
            {(getJobLoading || getApplicationsLoading) && <Loader/>}
            <header className="">
                <span className="font-semibold text-stone-950 mr-3 text-xl">Job:</span> <span
                className=" ml-20 text-stone-800 text-xl italic">{job?.title}</span>
                <br/>
                <span className="font-semibold text-stone-950 mr-3 text-xl">Applicants:</span> <span
                className="ml-2 text-green-600 text-xl">{applicants ? applicants.length : '0'}</span>
                <br/>
            </header>
            <section
                className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 border-t-2 border-t-stone-950 ">
                {/* Applicants data */}
                {applicants && applicants.map((applicant) => (
                    <div key={applicant.id} className="applicant my-4 mt-2 p-4 rounded w-fit md:w-full">
                        <h3 className="font-semibold text-stone-800">
                            {applicant.user?.first_name} {applicant.user?.last_name}
                        </h3>
                        <p className="text-stone-600">
                            Applied on: {formatDate(applicant.createdAt)}
                        </p>
                        <button
                            onClick={() => handleViewResume(applicant.resumePath)}
                            className="w-fit rounded py-1 px-2 text-white border border-indigo-500 bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-500 hover:to-indigo-700 mt-4"
                        >
                            View Resume
                        </button>

                        {viewingPdf && selectedPdf === applicant.resumePath && (
                            <>
                                {isLoading && <Loader/>}
                                {/*{error && <p>{error}</p>}*/}
                                <PdfComponent pdf={pdf} onClose={handleClosePdf}/>
                            </>
                        )}

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
