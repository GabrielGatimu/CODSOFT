function NotFound() {
    return (
        <div>
            <h1 className="text-4xl text-red-600 font-medium">Not Found</h1>
            <p className="text-xl font-medium m-6">
                Sorry, the page you&apos;re looking for cannot be found!
            </p>
            <a href="/" className="text-black hover:text-white bg-blue-500 hover:bg-amber-500 py-2 px-4 rounded" > Go Home</a>
        </div>
    );
}

export default NotFound;