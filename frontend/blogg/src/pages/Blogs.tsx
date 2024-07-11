import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../Hooks"
export const Blogs = () => {
    const {loading,blogs} =useBlogs()
    if(loading){
        return <div>
            loading ...
        </div>
    }
    return (
        <div>
        <Appbar/>
        <div className="flex flex-col items-center space-y-6">
            <div className="max-w-xl">
                
                <BlogCard
                id={"2bc50957-9737-4fe3-81c2-c1af5075cc99"}
                    authorname={"Yashvardhan"}
                    title={"How an ugly single page website makes $500k month by affiliate marketing"}
                    content={"How an ugly single page website makes $500k month by affiliate marketing"}
                    publishedDate={"10th July 2024"}
                />
            </div>
            <div className="max-w-xl">
                <BlogCard
                id={"2bc50957-9737-4fe3-81c2-c1af5075cc99"}
                    authorname={"Yashvardhan"}
                    title={"How an ugly single page website makes $500k month by affiliate marketing"}
                    content={"How an ugly single page website makes $500k month by affiliate marketing"}
                    publishedDate={"10th July 2024"}
                />
            </div>
            <div className="max-w-xl">
                <BlogCard
                id={"2bc50957-9737-4fe3-81c2-c1af5075cc99"}
                    authorname={"Yashvardhan"}
                    title={"How an ugly single page website makes $500k month by affiliate marketing"}
                    content={"How an ugly single page website makes $500k month by affiliate marketing"}
                    publishedDate={"10th July 2024"}
                />
            </div>
            </div>        </div>
    )
}
