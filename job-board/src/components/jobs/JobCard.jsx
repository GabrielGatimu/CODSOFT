import '../../styles/custom.css'
import './JobCard.css'
import {useNavigate} from "react-router-dom";

function JobCard({job}) {
    const navigate = useNavigate()

    const viewJob = () => {
        navigate(`/jobs/view/${job.id}`)
    }

    return (
        <div
            className="job-card bg-slate-200 h-72 w-full px-6 py-2 border border-stone-900 md:border-none dark:border-white rounded-md overflow-hidden">
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
            ))}</p>

            {/* hidden to simplify the card, but useful when applying search filters */}
            <div className="hidden">
                <h4>Category: {job.category}</h4>
                <p>Location: {job.location}</p>
                <p>Type: {job.type}</p>
                <p>Experience: {job.experience}</p>
                <p>Description: {job.description}</p>
                <p>Posted on: {job.createdAt}</p>
            </div>

            <div className="action-btns">
                <button className="btn black-btn" onClick={viewJob}>View</button>
                <button className="btn green-btn">Apply</button>
            </div>
        </div>
    );
}

export default JobCard;