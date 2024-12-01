import SketchButton from "@/components/base/button/SketchButton";
import SketchLink from "@/components/base/link/SketchLink";
import { RoughNotation } from "react-rough-notation";
export default function SignIn() {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return <div className="max-w-screen-2xl mx-auto h-screen">
        <div className="m-3">
            <SketchLink to="/">
                <span className="text-sm font-comic-neue">Back</span>
            </SketchLink>
        </div>
        <div className="mx-auto w-fit mt-32">
            <RoughNotation type="circle" show>
                <h1 className="font-comic-neue text-purple-primary text-5xl font-semibold text-center">Sign in</h1>
            </RoughNotation>

            <form className="flex md:flex-row  flex-col w-fit  items-center gap-2 mt-10" onSubmit={handleSubmit}>
                <input type="email" placeholder="Put your email here" className="border-2 py-2 px-4 w-64 rounded text-sm placeholder:text-sm font-comic-neue border-sketch border-black" required />
                <SketchButton childrenClass="bg-purple-primary " className="text-white w-fit" size="sm">Send code</SketchButton>
            </form>
            <p className="text-xs font-comic-neue font-light text-center mt-2">Dont have account? just <SketchLink to="/sign-up" ><span className="text-xs text-purple-primary">join here</span></SketchLink></p>
        </div>
    </div>
}