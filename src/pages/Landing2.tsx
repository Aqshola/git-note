export default function Landing2() {
    return (
        <div className="max-w-screen-2xl h-screen py-3 px-9 mx-auto">
            <nav className="flex justify-between items-center">
                <h5 className="font-comic-neue font-bold text-xl">Notebuk</h5>
                <div className="flex gap-5 font-comic-neue items-center">
                    <a href="">About</a>
                    <a href="">Help</a>
                    <button className="sketchy px-3 py-1">Login</button>

                </div>
            </nav>

            <div className="relative mt-36" >
                <div className="w-fit mx-auto relative">
                    <h1 className="text-8xl font-comic-neue font-bold text-purple-primary text-center">Notebuk</h1>
                    <img src="/assets/svg/new.svg" alt="New!" className="absolute -top-16 left-0" />
                    <img src="/assets/svg/bulb.svg" alt="Idea" className="absolute -top-5 -right-16" />
                </div>
                <div className="w-fit mx-auto mt-6">
                    <p className="font-comic-neue text-xl text-center">Capture ideas
                        <span className="font-bold relative sketchy-bottom mr-1"> anytime, anywhere
                            <img src="/assets/svg/underline.svg" className="absolute bottom-0 left-1" alt="" />
                        </span>
                        by writing, drawing, and <br />syncing notes seamlessly across all your devices</p>
                </div>
                <div className="justify-center flex gap-5 font-comic-neue mt-8 items-center">
                    <button className="font-comic-neue sketchy py-2 px-8 text-xl bg-orange-primary">Join</button>
                    <p>Or</p>
                    <button className="font-comic-neue text-2xl relative">
                        Just Write
                        <img src="/assets/svg/underline-yellow.svg" className="absolute bottom-0 left-0" alt="" />
                    </button>
                </div>
                <div className="flex justify-center gap-5 mt-24">
                    <img src="/assets/svg/phone.svg" alt="phone" />
                    <img src="/assets/svg/pc.svg" alt="phone" className="md:block hidden" />
                </div>
            </div>

        </div>
    )
}