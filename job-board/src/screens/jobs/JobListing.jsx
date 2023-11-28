import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

import '../../styles/custom.css' // shared styles for btns, flex-containers etc
import './JobListing.css'
import JobCard from "../../components/jobs/JobCard.jsx";
import Loader from "../../components/Loader.jsx";

import {useGetJobsMutation} from "../../state/slices/jobs/jobApi.slice.js";
import {setStateJobs} from "../../state/slices/jobs/job.slice.js";

export default function JobListing() {
    const dispatch = useDispatch()
    const [jobs, setJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const [getJobsApiCall, {isLoading, error}] = useGetJobsMutation()
    const [page, setPage] = useState(0)

    async function fetchJobs(pageNumber) {
        try {
            const response = await getJobsApiCall({page: pageNumber}).unwrap()
            setJobs(prevJobs => [...prevJobs, ...response.data])
            setFilteredJobs(prevJobs => [...prevJobs, ...response.data])
            dispatch(setStateJobs({...response}))
        } catch (err) {
            console.log(err)
            toast.error('Failed to get jobs')
        }
    }

    useEffect(() => {
        fetchJobs(page)
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage(prevPage => prevPage + 1)
                }
            }, {
                threshold: 1.0
            }
        )

        const target = document.getElementById('load-more-trigger')
        if (target){
            observer.observe(target)
        }

        return () => {
            if (target){
                observer.unobserve(target)
            }
        }
    }, []);

    // search inputs
    const [searchItem, setSearchItem] = useState({
        title_input: '',
        location_input: '',
        skill_input: ''
    })
    const clearAllSearchInputs = () => {
        setSearchItem({
            title_input: '',
            location_input: '',
            skill_input: ''
        })
        setFilteredJobs(jobs)
    }

    //  filters search
    const [filters, setFilters] = useState({
        category_filter: '',
        company_filter: '',
        type_filter: '',
        location_filter: '',
        experience_filter: '',
    })

    const handleResetFilters = () => {
        clearAllSearchInputs()
        setSearchButtonClicked(false)
        setFilters({
            category_filter: '',
            company_filter: '',
            type_filter: '',
            location_filter: '',
            experience_filter: '',
        })
        setFilteredJobs(jobs)
    }

    const handleSearchItemChange = e => {
        const {name, value} = e.target
        setSearchItem({
            ...searchItem,
            [name]: value
        })

        // filter jobs
        const searchResults = jobs.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(searchItem.title_input.toLowerCase())
            const locationMatch = job.location.toLowerCase().includes(searchItem.location_input.toLowerCase())
            const skillMatch = job.skills.some(skill => skill.toLowerCase().includes(searchItem.skill_input.toLowerCase()))

            return titleMatch && locationMatch && skillMatch
        })
        setFilteredJobs(value ? searchResults : jobs)
    }

    const handleFilterChange = e => {
        const {name, value} = e.target
        setFilters({...filters, [name]: value})
    }

    const [searchButtonClicked, setSearchButtonClicked] = useState(false)
    const handleSearch = () => {
        setSearchButtonClicked(true)
        clearAllSearchInputs('')

        // filter jobs
        const searchResults = jobs.filter(job => {
            const categoryFilter = job.category.toLowerCase().includes(filters.category_filter.toLowerCase())
            const companyFilter = job.company.toLowerCase().includes(filters.company_filter.toLowerCase())
            const typeFilter = job.type.toLowerCase().includes(filters.type_filter.toLowerCase())
            const experienceFilter = job.experience.toLowerCase().includes(filters.experience_filter.toLowerCase())
            const locationFilter = job.location.toLowerCase().includes(filters.location_filter.toLowerCase())

            return categoryFilter && companyFilter && typeFilter && experienceFilter && locationFilter
        })

        setFilteredJobs(searchResults)
    }

    return (
        <div className="px-3.5">
            {/* Search & Filter Section */}
            <section className="my-2 md:px-20">
                <div className="bg-white shadow-md md:py-0 rounded">
                    {/*Search Inputs*/}
                    <div className="custom_flex-container">
                        <div className="search-container bg-white ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <input
                                type="text"
                                name="title_input"
                                value={searchItem.title_input}
                                onChange={handleSearchItemChange}
                                placeholder="search by keyword..."
                                className="search-input"
                            />
                        </div>
                        <div className="search-container bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                            </svg>
                            <input
                                type="text"
                                name="location_input"
                                value={searchItem.location_input}
                                onChange={handleSearchItemChange}
                                placeholder="search by location..."
                                className="search-input"
                            />
                        </div>
                        <div className="search-container bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
                            </svg>
                            <input
                                type="text"
                                name="skill_input"
                                value={searchItem.skill_input}
                                onChange={handleSearchItemChange}
                                placeholder="search by skill..."
                                className="search-input"
                            />
                        </div>
                    </div>
                    {/* Other Filters */}
                    <div className="custom_flex-container filter-container">
                        {/* filter inputs */}
                        <div>
                            <select name="category_filter" value={filters.category_filter}
                                    onChange={handleFilterChange}>
                                <option value="">Category</option>
                                <option value="Software Development">Software Development</option>
                                <option value="Data Science">Data Science</option>
                            </select>
                        </div>
                        <div>
                            <select name="company_filter" value={filters.company_filter} onChange={handleFilterChange}>
                                <option value="">Company</option>
                                <option value="Microsoft">Microsoft</option>
                                <option value="Google">Google</option>
                                <option value="IBM">IBM</option>
                            </select>
                        </div>
                        <div>
                            <select name="type_filter" value={filters.type_filter} onChange={handleFilterChange}>
                                <option value="">Type</option>
                                <option value="full-time">full-time</option>
                                <option value="part-time">part-time</option>
                                <option value="contract">contract</option>
                            </select>
                        </div>
                        <div>
                            <select name="location_filter" value={filters.location_filter}
                                    onChange={handleFilterChange}>
                                <option value="">location</option>
                                <option value="remote">remote</option>
                                <option value="New York">New York</option>
                                <option value="London">London</option>
                                <option value="Nairobi">Nairobi</option>
                            </select>
                        </div>
                        <div>
                            <select name="experience_filter" value={filters.experience_filter}
                                    onChange={handleFilterChange}>
                                <option value="">exp</option>
                                <option value="0-2 years">0-2 yrs</option>
                                <option value="2-5 years">2-5 yrs</option>
                                <option value="5-10 years"> 5-10 yrs</option>
                                <option value="10+ years">10+ yrs</option>
                            </select>
                        </div>

                        {/* filter buttons */}
                        <div className="flex items-center gap-x-4 border-b-2 border-stone-400 pb-1">
                            <button
                                className="btn bg-green-600 border border-green-600 "
                                onClick={handleSearch}>Search
                            </button>
                            <button
                                className="btn bg-stone-800 border border-stone-800"
                                onClick={handleResetFilters}>Reset
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* Jobs List */}
            {
                filteredJobs.length === 0
                    ?
                    (<h2 className="flex items-center justify-center w-full">No

                        <span className="mx-2 text-red-500 text-xl">
                            {(searchItem.title_input || searchItem.location_input || searchItem.skill_input) ?
                                `${(searchItem.title_input || searchItem.location_input || searchItem.skill_input)} `
                                : ''}

                            {(filters.category_filter || filters.company_filter || filters.type_filter || filters.experience_filter || filters.location_filter) ?
                                `${(filters.category_filter || filters.company_filter || filters.type_filter || filters.experience_filter || filters.location_filter)}`
                                : ''}
                        </span>
                        Jobs Found
                    </h2>)
                    :
                    (<div>
                        {/* text to display the searched jobs */}
                        {/*(filters ? `${{...filters}} jobs` : '')*/}
                        <h2 className="mx-20 px-2 text-slate-50 mb-8 w-fit bg-green-500">
                            {(searchItem.title_input || searchItem.location_input || searchItem.skill_input) ?
                                `${(searchItem.title_input || searchItem.location_input || searchItem.skill_input)} jobs`
                                : ''}

                            {searchButtonClicked ?
                                (filters.category_filter || filters.company_filter || filters.type_filter || filters.experience_filter || filters.location_filter) ?
                                    `${(filters.category_filter || filters.company_filter || filters.type_filter || filters.experience_filter || filters.location_filter)} jobs`
                                    : ''

                                : ''
                            }
                        </h2>
                        <section
                            className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 mb-10 md:px-24`}>
                            {
                                isLoading ? (<> <h2> Loading ... </h2><Loader/> </>)
                                    : (
                                        filteredJobs.length > 0 ?
                                            filteredJobs.map((job) => (
                                                <JobCard key={job.id} job={job}/>
                                            ))
                                            :
                                            <p> No Jobs Posted</p>
                                    )
                            }

                            {/* load more trigger */}
                            <div id="load-more-trigger" style={{height: '10px'}}></div>
                        </section>
                    </div>)
            }
        </div>
    )
}

