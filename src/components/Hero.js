import "./HeroStyles.css";


function Hero (props) {
    return (<>
        <div className={props.cName}>
            <img alt="Img" src={props.heroImg}> 
            </img>

            <div className="hero-text">
                <h1>{props.title}</h1>
                <a href={props.url} className={props.btnClass}>
                    {props.buttonText}
                </a>
            </div>
        </div>
        </>
    );
}



// Book for a event now
// Search now
// https://images.unsplash.com/photo-1487466365202-1afdb86c764e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80
export default Hero;