import Link from "next/link"

const NotFoundPage = () => {
    return (
        <div className="flex flex-col justify-center w-full h-screen align-center">
            <div className="flex flex-col gap-10 align-center py-10">
                <h1 className="text-8xl text-center font-medium">404 Not Found</h1>
                <p className="text-center">Your visited page not found. You may go home page.</p>
            </div>
            <Link href={"/"} className="px-12 py-4 text-white bg-secondary w-fit self-center">Back to homepage</Link>
        </div>
    )
}

export default NotFoundPage