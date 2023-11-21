import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-stone-50">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex flex-col md:flex-row justify-between">
                    <Link to={"/"} className="flex items-center my-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="../../../public/vite.svg" className="h-8" alt="Job-Board Logo"/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Job Board</span>
                    </Link>
                    <div
                        className="flex flex-wrap items-center space-x-4 mb-6 font-medium text-stone-500 sm:mb-0">
                        <Link to={"/jobs"} className="hover:text-black">Jobs</Link>
                        <Link to={"/blog"} className="hover:text-black">Blog</Link>
                        <Link to={"/contact"} className="hover:text-black">Contact</Link>
                    </div>
                </div>
                <hr className="my-6 border-stone-400 sm:mx-auto lg:my-8"/>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to={"/"} className="hover:underline">Job-Board™</Link>. All Rights Reserved.</span>
            </div>
        </footer>

    );
}

