import { Noto_Sans_Georgian } from "next/font/google"
import { AuthFormView } from "./_components/AuthFormView"
/*const georgia=Noto_Sans_Georgian({
    subsets:["georgian"],
    weight:["600"]
})*/
function AuthPage() {
    return(
        <div>
            <h2>snälla log in</h2>
            <AuthFormView/>
        </div>
    )
}
export default AuthPage