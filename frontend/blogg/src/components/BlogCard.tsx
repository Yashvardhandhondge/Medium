import { Link } from "react-router-dom";

interface BlogCardProps{
        id:string;
    authorname:string;
    title:string;
    content:string;
    publishedDate:string;
  
}

export const BlogCard=({
    id,
  authorname,
  title,
  content,
  publishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="border-b p-4  pb-4">
       <div className="flex">
        
       <Avatar size={"small"} name={authorname}/>
        <div className="font-light  pl-2 text-sm flex justify-center flex-col" > {authorname} </div>
      <div className="flex justify-center flex-col PL-2 flex justify-center flex-col">
          <Circle/>
      
      </div>
       <div className="pl-2 font-thin text-sm text-slate-500">{publishedDate}</div>
       </div>
       <div className="text-sl pt-2 font-semibold">
        {title}
       </div>
       <div className="text-md font-thin">
        {content.slice(0,100)+"...."}
       </div>
      
       <div className="text-sm font-thin h-1 w-full text-slate-500"></div>
        {`${Math.ceil(content.length/100)} minutes` }
    </div> 
    </Link>
}

function Circle (){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}

export function Avatar ({name,size="small"}:{name:string,size:"small"|"big"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size === "small"?"text-xs":"text-md"} font-small text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>
}