import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useCreateJobMutation} from '../../state/slices/jobs/jobApi.slice.js';
import {setEmployerJobs} from '../../state/slices/jobs/job.slice.js';
import {toast} from 'react-toastify';
import Loader from '../../components/Loader.jsx';
import {PlusIcon} from 'lucide-react';

export default function CreateJob() {
    const dispatch = useDispatch();
    const [createJobApiCall, {isLoading, error}] = useCreateJobMutation();

    const [jobData, setJobData] = useState({
        title: '',
        category: '',
        company: '',
        companyLogo: '',
        location: '',
        type: '',
        experience: '',
        description: '',
        skills: '',
        salaryType: 'fixed',
        salary: '',
        lowerLimit: '',
        upperLimit: '',
        fixedSalary: '',
    });

    const [salaryError, setSalaryError] = useState('')

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        // --- input formats --- //
        if (name === 'skills') {
            const skillsArray = value.split(',').map((skill) => skill.trim());
            setJobData({...jobData, [name]: skillsArray});
        } else if (name === 'salaryType') {
            setJobData({
                ...jobData,
                salaryType: value,
                salary: ''
            })
        } else {
            setJobData({...jobData, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(jobData)
        setSalaryError('')

        let formattedSalary = ''
        if (jobData.salaryType === 'range') {
            if (+(jobData.lowerLimit) >= +(jobData.upperLimit)) {
                setSalaryError('Salary Upper limit value should not be less than or equal to the Lower Limit')
                return
            }
            formattedSalary = `$${jobData.lowerLimit}-$${jobData.upperLimit}`
        } else {
            formattedSalary = `$${jobData.fixedSalary}`
        }

        const dataToSend = {...jobData, salary: formattedSalary}
        try {
            console.log(dataToSend)
            const response = await createJobApiCall(dataToSend).unwrap();
            console.log(response);
            // dispatch(setEmployerJobs([response]));
        } catch (err) {
            console.error(err);
            console.error(error)
            toast.error('Failed to add job. Please try again later');
        }
    };

    return (
        <div>
            <h2>Add Job</h2>
            {isLoading && <Loader/>}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {/* Input fields */}
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={jobData.title}
                        placeholder="Job Title*"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={jobData.category}
                        placeholder="Job Category*"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="company"
                        value={jobData.company}
                        placeholder="Company*"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="companyLogo"
                        value={jobData.companyLogo}
                        placeholder="Company Logo URL"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        placeholder="Location*"
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="type">Job Type:</label>
                    <select name="type" id="type" value={jobData.type} onChange={handleInputChange} required>
                        <option value="Full-time">Full-Time</option>
                        <option value="Part-time">Part-Time</option>
                        <option value="Contract">Contract</option>
                    </select>
                    <input
                        type="text"
                        name="experience"
                        value={jobData.experience}
                        placeholder="Experience (e.g., 3 for 3+ years)*"
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        value={jobData.description}
                        placeholder="Job Description*"
                        onChange={handleInputChange}
                        rows="4"
                        required
                    />
                    <input
                        type="text"
                        name="skills"
                        value={jobData.skills}
                        placeholder="Skills (comma-separated)*"
                        onChange={handleInputChange}
                        required
                    />

                    {/* salary type select */}
                    <div>
                        <label className="flex items-center space-x-2">
                            <span className="text-stone-600">Salary Type: </span>
                            <select className="bg-indigo-700 outline-0 rounded p-1 text-stone-50" name="salaryType"
                                    value={jobData.salaryType}
                                    onChange={handleInputChange}>
                                <option value="range">Range</option>
                                <option value="fixed">Fixed</option>
                            </select>
                        </label>

                        {/* range salary */}
                        {jobData.salaryType === 'range' && (
                            <>
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center">
                                        <span>$</span>
                                        <input
                                            type="number"
                                            name="lowerLimit"
                                            value={jobData.lowerLimit}
                                            placeholder="from"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <span className="font-extrabold text-2xl">-</span>

                                    <div className="flex items-center">
                                        <span>$</span>
                                        <input
                                            type="number"
                                            name="upperLimit"
                                            value={jobData.upperLimit}
                                            placeholder="to"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                {salaryError && (
                                    <p className="text-red-500">{salaryError}</p>
                                )}
                            </>
                        )}

                        {/* fixed salary */}
                        {jobData.salaryType === 'fixed' && (
                            <div className="flex items-center">
                                <span>$</span>
                                <input
                                    type="number"
                                    name="fixedSalary"
                                    value={jobData.fixedSalary}
                                    placeholder="Fixed Salary"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}
                    </div>
                </div>
                <button type="submit" className="btn green-btn flex items-center space-x-1 mt-4">
                    <PlusIcon/> Add Job
                </button>
            </form>
        </div>
    );
}
