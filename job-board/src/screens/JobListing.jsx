import {useState} from "react";
import JobCard from "../components/JobCard.jsx";
import {useSelector} from "react-redux";

export default function JobListing() {
    const jobs = useSelector((state) => state.jobs)

    const [filters, setFilters] = useState({
        title: '',
        category: '',
        experience: '',
        location: '',
        salary: ''
    })

    // -- list of all jobs (includes filters if any) -- //
    const filteredJobs = jobs.filter((job) => {
        return (
            job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
            job.category.toLowerCase().includes(filters.category.toLowerCase()) &&
            job.experience.toLowerCase().includes(filters.experience.toLowerCase()) &&
            job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
            job.salary.toLowerCase().includes(filters.salary.toLowerCase())
        )
    })

    const handleFilterChange = e => {
        const {name, value} = e.target
        setFilters({...filters, [name]: value})
    }

    const handleResetFilters = e => {
        setFilters({
            title: '',
            category: '',
            experience: '',
            location: '',
            salary: ''
        })
    }

    const handleSearch = () => {

    }

    return (
        <div>
            <h1>Available Jobs</h1>
            <div>
                <label>Title: </label>
                <input type="text" name="title" value={filters.title} onChange={handleFilterChange}/>
            </div>
            <div>
                <label>Category: </label>
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">Select Category</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Data Science">Data Science</option>
                </select>
            </div>
            <div>
                <label>Experience: </label>
                <select name="experience" value={filters.experience} onChange={handleFilterChange}>
                    <option value="">Select Experience</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                </select>
            </div>
            <div>
                <label>Salary Range: </label>
                <select name="salary" value={filters.salary} onChange={handleFilterChange}>
                    <option value="">Select Salary Range</option>
                    <option value="$0 - $50,000">$0 - $50,000</option>
                    <option value="$50,000 - $80,000">$50,000 - $80,000</option>
                </select>
            </div>

            <div>
                {/*<button onClick={handleSearch}>Search</button>*/}
                <button onClick={handleResetFilters}>Reset Filters</button>
            </div>

            <div>
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job}/>
                ))}
            </div>
        </div>
    )
}

