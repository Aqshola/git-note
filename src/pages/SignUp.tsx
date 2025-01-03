import SketchButton from "@/components/base/button/SketchButton";
import SketchLink from "@/components/base/link/SketchLink";
export default function SignUp() {

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
            <h1 className="font-comic-neue text-purple-primary text-5xl font-semibold text-center">Sign Up</h1>
            <form className="flex md:flex-row  flex-col w-fit  items-center gap-2 mt-10" onSubmit={handleSubmit}>

                <input type="email" placeholder="Put your email here" className="border py-2 px-4 w-64 rounded text-sm placeholder:text-sm font-comic-neue" required />
                <SketchButton childrenClass="bg-purple-primary " className="text-white w-fit">Send Verification code</SketchButton>
            </form>
        </div>
    </div>
}