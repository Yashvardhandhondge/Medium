import { Avatar } from "./BlogCard"

export const Appbar=()=>{
    return <div className="border-b flex px-10 py-4 justify-between px-10">
        <div className="flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar size={"big"} name ="Yashvardhan"/>
        </div>
    </div>
}