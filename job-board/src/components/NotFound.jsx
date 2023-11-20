import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center text-center my-52 md:m-52 ">
            <h1 className="text-4xl text-red-600 font-medium">Page Not Found</h1>
            <p className="text-xl text-stone-700 font-extralight m-6">
                Sorry, the page you&apos;re looking for cannot be found!
            </p>
            <Link to={"/"} className="bg-stone-900 text-white hover:bg-transparent hover:text-stone-900 py-2 px-4 rounded border border-stone-900">Go Home</Link>
        </div>
    );
}

export default NotFound;