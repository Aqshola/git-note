import SketchButton from "@/components/base/button/SketchButton";
import SketchLink from "@/components/base/link/SketchLink";
import { RoughNotation } from "react-rough-notation";

export default function Landing2() {
    return (
        <div className="max-w-screen-2xl h-screen py-3 px-9 mx-auto">
            <nav className="flex justify-between items-center">
                <h5 className="font-comic-neue font-bold text-xl">Notebuk</h5>
                <div className="flex gap-5 font-comic-neue items-center">
                    <SketchLink to="/about">About</SketchLink>
                    <SketchLink to="/help">Help</SketchLink>
                    <SketchButton size="sm">Login</SketchButton>

                </div>
            </nav>


            <div className="relative mt-36" >
                <div className="w-fit mx-auto relative">
                    <h1 className="text-8xl font-comic-neue font-bold text-purple-primary text-center">Notebuk</h1>
                    <img src="/assets/svg/new.svg" alt="New!" className="absolute -top-16 left-0" />
                    <img src="/assets/svg/bulb.svg" alt="Idea" className="absolute -top-5 -right-16" />
                </div>
                <div className="w-fit mx-auto mt-6">
                    <p className="font-comic-neue text-base md:text-xl text-center">Capture ideas
                        <span className="font-bold relative sketchy-bottom mx-1">
                            <RoughNotation type="underline" show padding={0} multiline={false} strokeWidth={2}>
                                anytime, anywhere
                            </RoughNotation>


                        </span>
                        by writing, drawing, and syncing notes seamlessly across all your devices</p>
                </div>
                <div className="justify-center flex gap-5 font-comic-neue mt-8 items-center">
                    <SketchButton>Join</SketchButton>
                    <p>Or</p>
                    <SketchLink size="lg" to="/" sketchColor="#FFC04F">
                        Just Write
                    </SketchLink>
                </div>
                <div className="flex justify-center gap-5 mt-24">
                    <img src="/assets/svg/phone.svg" alt="phone" />
                    <img src="/assets/svg/pc.svg" alt="phone" className="md:block hidden" />
                </div>
            </div>

        </div>
    )
}