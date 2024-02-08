import Datenschutz from "../Components/Datenschutz";
import Impressum from "../Components/Impresum";
import {useState ,useEffect} from 'react';
import React, { useRef } from 'react';
function DatenBAr(){
    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);
    let[display1,setdisplay1]=useState("none");
    let[display2,setdisplay2]=useState("none");
   
    useEffect(()=>{
        if(display1==="Block")
            scrollRef1.current.scrollIntoView({ behavior: 'smooth' });
        else if(display2==="Block")
            scrollRef2.current.scrollIntoView({ behavior: 'smooth' });
    },[display1,display2])

    const Daten = () => {
        if(display1==="none"){
            setdisplay1("Block");
            setdisplay2("none");
        }
        else{
            setdisplay1("none");
        }
    }
    const impress = () => {
        if(display2==="none"){
            setdisplay2("Block");
            setdisplay1("none");
        }
        else
            setdisplay2("none");
    };
    
    return(
        <div>
            <div className="datenbar">
                <div className="daten1">
                    <button onClick={Daten} >Datenschutz</button>
                    <button onClick={impress}>Impressum</button>
                </div>
                <div className="daten2">
                    <p>© Tanzatelier Dance2Impress 2023</p>
                    <p>Create by: Damianakis Panagiotis</p>
                </div>
            </div>
            <Datenschutz
              display1={display1}
              scrollRef={scrollRef1}  
            />
            <Impressum
            display2={display2}
            scrollRef2={scrollRef2} />
        </div>
    )
}
export default DatenBAr;