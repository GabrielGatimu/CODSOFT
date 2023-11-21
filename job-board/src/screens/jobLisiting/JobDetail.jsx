import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import '../../styles/custom.css'

export default function JobDetail() {
    const navigate = useNavigate();
    const {jobId} = useParams();

    // selecting job from state
    const job = useSelector((state) => state.jobs.find((j) => j.id === parseInt(jobId, 10)));

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleApplyClick = () => {
        alert('Apply to the job');
    };

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div>
            {/* Back button */}
            <button className="btn bg-stone-900" onClick={handleBackClick}>Back</button>

            <div
                className="bg-slate-200 h-72 w-full px-6 py-2 border border-stone-900 dark:border-white rounded-md overflow-hidden">
                <div className="company-info">
                    <img src={job.companyLogo}/>
                    <h4 className="bg-stone-500 text-slate-50 px-1 h-6 rounded">{job.company}</h4>
                </div>
                <h3 className="text-2xl font-extrabold">{job.title}</h3>
                <p className="text-stone-600 my-2">{job.salary}</p>
                <p className="">{job.skills.map((skill) => (
                    <span
                        key={skill}
                        className="font-bold text-stone-800"
                    > {skill} <span className="text-xl font-extrabold text-amber-600">| </span></span>
                ))}
                </p>

                <h4>Category: {job.category}</h4>
                <p>Location: {job.location}</p>
                <p>Type: {job.type}</p>
                <p>Experience: {job.experience}</p>
                <p>Description: {job.description}</p>
                <p>Posted on: {job.createdAt}</p>

                {/* Apply button */}
                <button className="btn bg-green-600" onClick={handleApplyClick}>Apply</button>
            </div>
        </div>
    )
}

