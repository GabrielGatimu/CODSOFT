import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../styles/custom.css'
export default function JobDetail() {
    const navigate = useNavigate();
    const { jobId } = useParams();

    // selecting job from state
    const job = useSelector((state) => state.jobs.find((j) => j.id === parseInt(jobId, 10)));

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleApplyClick = () => {
        alert('Apply to the job!');
    };

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div>
            {/* Back button */}
            <button className="btn bg-stone-900" onClick={handleBackClick}>Back</button>

            {/* Job details */}
            <h1>{job.title}</h1>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Type: {job.type}</p>
            <p>Experience: {job.experience}</p>
            <p>Salary: {job.salary}</p>
            <p>Description: {job.description}</p>

            {/* Apply button */}
            <button onClick={handleApplyClick}>Apply</button>
        </div>
    );
}

