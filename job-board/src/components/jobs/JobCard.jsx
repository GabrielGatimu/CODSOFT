import './JobCard.css'

function JobCard({job}) {
    return (
        <div className="job-card bg-slate-50 h-[calc(50rem-22rem)] px-6 py-2 border border-stone-900 dark:border-white rounded-md overflow-hidden">
           <img src={job.companyLogo}/>
            <h3>Title: {job.title}</h3>
            <h4>Category: {job.category}</h4>
            <h4>Company: {job.company}</h4>
            <p>Location: {job.location}</p>
            <p>Type: {job.type}</p>
            <p>Experience: {job.experience}</p>
            <p>Description: {job.description}</p>
            <p>Salary Range:{job.salary}</p>
            <p>Skills Required: {job.skills.map((skill) => (
                <span
                    key={skill}
                > {skill} | </span>
            ))}</p>
            <p>Posted on: {job.createdAt}</p>
        </div>
    );
}

export default JobCard;