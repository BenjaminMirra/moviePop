import React from "react";
import "./Heading.css"
export const Heading=({children,title,className})=>
{
    return( title==="h1"?<h1 className={className} >{children}</h1>:title==="h2" ?
    <h2 className={className} >{children}</h2>:title==="h3"?
    <h3 className={className} >{children}</h3>:<h4 className={className} >{children}</h4>)
}