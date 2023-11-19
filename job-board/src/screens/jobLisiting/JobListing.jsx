import {useState} from "react";
import {useSelector} from "react-redux";

import './jobListing.css'
import JobCard from "../../components/JobCard.jsx";

export default function JobListing() {
    const jobs = useSelector((state) => state.jobs)

    const [filters, setFilters] = useState({
        title: '',
        category: '',
        experience: '',
        location: '',
        salary: ''
    })

    const [searchItem, setSearchItem] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(jobs)


    const handleInputChange = e => {
        const searchTerm = e.target.value
        setSearchItem(searchTerm)

        const filteredItems = jobs.filter((job) => {
            return job.title.toLowerCase().includes(searchTerm.toLowerCase())
        })

        setFilteredJobs(filteredItems)
    }

    const handleFilterChange = e => {
        const {name, value} = e.target
        setFilters({...filters, [name]: value})
    }

    const handleResetFilters = () => {
        setFilters({
            title: '',
            category: '',
            experience: '',
            location: '',
            salary: ''
        })
        setSearchItem('')
        setFilteredJobs(jobs)
    }

    const handleSearch = () => {
        setSearchItem('') // clear search input first

        const advancedFilter = jobs.filter(job => {
            return (
                job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
                job.category.toLowerCase().includes(filters.category.toLowerCase()) &&
                job.experience.toLowerCase().includes(filters.experience.toLowerCase()) &&
                job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
                job.salary.toLowerCase().includes(filters.salary.toLowerCase())
            )
        })

        // Applying search filter
        const searchFilteredJobs = advancedFilter.filter((job) => {
            return job.title.toLowerCase().includes(searchItem.toLowerCase());
        });

        setFilteredJobs(searchFilteredJobs);
    }

    return (
        <div className="px-3.5">
            <h1>Available Jobs</h1>

            {/* Search & Filter Section */}
            <section className="my-4 p-4 text-center">
                {/*Search Input*/}
                <div>
                    <input
                        type="text"
                        value={searchItem}
                        onChange={handleInputChange}
                        placeholder="search a job..."
                        className="border border-stone-800 p-2 rounded-md mb-2 w-full md:w-72"
                    />
                </div>

                {/* Filters Container */}
                <h4> Advanced filter</h4>
                <div className="filter-container bg-blue-100 px-2 rounded block md:flex space-x-3 items-center">
                    <div>
                        <label>Title: </label>
                        <select name="title" value={filters.title} onChange={handleFilterChange}>
                            <option value="">Select Title</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="Backend Developer">Backend Developer</option>
                        </select>
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

                    <div className="flex items-center">
                        <button
                            className="btn bg-green-500"
                            onClick={handleSearch}>Search
                        </button>
                        <button
                            className="btn bg-stone-900"
                            onClick={handleResetFilters}>Reset
                        </button>
                    </div>
                </div>
            </section>

            {/* Jobs List */}
            {
                filteredJobs.length === 0
                    ?
                    <h2 className="flex items-center justify-center">No Jobs Found</h2>
                    :

                    <div>
                    <h2 className="px-20 mb-8 w-fit bg-green-500">{searchItem ? `${searchItem} jobs` : ''}</h2>
                    <section
                        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 mb-10 md:px-24`}>
                        {
                            filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job}/>
                            ))
                        }
                    </section>
                    </div>
            }
        </div>
    )
}

