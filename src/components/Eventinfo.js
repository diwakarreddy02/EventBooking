import React from "react"
import "./Eventinfo.module.css"
import Eventinfodata from "./Eventinfodata";


 


const Eventinfo = () => {
    return (
        <div className="event">
            <h1>Popular events</h1>
                <Eventinfodata
                    heading="Football Tournament"

                    text="Are you ready for some heart-pumping, adrenaline-fueled soccer action? 
                    Then don't miss out on our upcoming soccer tournament! This tournament 
                    is the ultimate showcase of skill and athleticism, bringing together 
                    the best teams from all around to compete for glory. With multiple 
                    fields and non-stop matches, you'll be able to witness the excitement 
                    and intensity of soccer at its finest. Location: 1601 E Law Ln, Bloomington, IN 47408.
                    Registration starts from 10 April!"
                
                    img1={"https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vdGJhbGwlMjB0b3VybmFtZW50fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60"}
                    img2={"https://images.unsplash.com/photo-1509077613385-f89402467146?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb3RiYWxsJTIwdG91cm5hbWVudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60"}
                /> 
        </div>
    );
};


export default Eventinfo;