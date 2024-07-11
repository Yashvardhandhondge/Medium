import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"
export const Signin = ()=>{
    return <div>
        <div className="grid lg:grid-cols-2">
        
        <div>
            <Auth type="signin"/>
        </div>
        <div className="hiddden lg:block">
        <Quote/>
        </div>
    </div>
    </div>
}