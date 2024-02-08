import { useState } from "react";
import {db} from "../Database/firebase";
import {ref, onValue} from "firebase/database"
import { useNavigate } from "react-router-dom";

function Admin(){
    let[Username,setUsername]=useState("");
    let[Password,setPassword]=useState("");
    const navigate = useNavigate();

    let Login=()=>{
        const userRef= ref(db,"/Login");
        onValue(
            userRef,
            (snapshot)=>{
                const data=snapshot.val();
                if(data.username===Username && data.Pass===Password){
                    navigate("/Adminpage",{state: {Name: Username}})
                }
            },
            (error) => {
                console.error("Fehler beim Abrufen der Daten:", error);
              }
            )
    }
    return(
        <div className="Admin">
            <div className="AdminLogin">
                <h2>Dance2Impress</h2>
                <input placeholder="Username" type="text"  onChange={(e)=>setUsername(e.target.value)}/>
                <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={Login}>Admin</button>
            </div>
        </div>
    )
}
export default Admin;