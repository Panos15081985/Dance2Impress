import { useEffect,useRef,useState } from "react";
import{db} from "../Database/firebase";
import {onValue ,ref,set} from "firebase/database";
import Adminplan from "../Pages/Adminplan";
import AdminKunde from "../Pages/AdminKunde";
import { useLocation } from "react-router-dom";


function Adminpage(){
    const location = useLocation();
    let[Plan,setPlan]=useState([]);
    let[Kunden,setKunden]=useState([]);
    let[Tagn,setTagn]=useState();
    let[Kursn,setKursn]=useState();
    let[dis2,setdis2]=useState("none");
    let[dis3,setdis3]=useState("none");
    let[dis4,setdis4]=useState("none");
    let[tablestyle,settablestyle]=useState({backgroundColor:"rgb(199, 229, 229)",cursor:"pointer"});
    const Name = location.state.Name;
    
    useEffect(()=>{
        const userRef1= ref(db,"/Plan");
        const userRef2=ref(db, "/Kunden");
        onValue(
            userRef1,
            (snapshot)=>{
            const dataobjt=snapshot.val();
         let newPlan={
            Montag:dataobjt.Montag,
            Dienstag:dataobjt.Dienstag,
            Mittwoch:dataobjt.Mittwoch,
            Donnerstag:dataobjt.Donnerstag,
            Freitag:dataobjt.Freitag
         }
         setPlan(newPlan);
        },
        (error) => {
            console.error("Fehler beim Abrufen der Daten:", error);
          }
        );
        onValue(
            userRef2,
            (snapshot)=>{
               const dataKunden=snapshot.val();
               setKunden(dataKunden);
            },
            (error) => {
                console.error("Fehler beim Abrufen der Daten:", error);
            }
        )
    },[]);
    
    let keys = Object.keys(Plan);
    let max=0;
    for(let i=0; i<keys.length; i++){
        if(max<Plan[keys[i]].length){
            max=Plan[keys[i]].length;
        }
    } 
    let Row=[];   
    for(let i=0; i<max; i++){
       let col=[];
       for(let j=0; j<keys.length; j++ ){
            if(i<Plan[keys[j]].length){
                if(Plan[keys[j]][i].Tag==="Samstag"|| Plan[keys[j]][i].Tag==="Sonntag" || Plan[keys[j]][i].Tag===" "){
                    col.push(<td style={tablestyle} key={j}>
                            {Plan[keys[j]][i].Tag}</td>)
                }
                else{
                    if(Plan[keys[j]][i].Urban==="true"){
                        col.push(<td style={tablestyle} key={j} onClick={(e)=>{kurs(e,j,i)}}>
                        {Plan[keys[j]][i].Zeit}<br/>
                        <p className='Kurstableparag'><img src='img/urban.png'alt='urban' style={{width:"20px"}}></img>{Plan[keys[j]][i].Gruppe}<br/>{Plan[keys[j]][i].comentar}</p>
                        </td>)
                    }
                    else{col.push(<td style={tablestyle} key={j} onClick={(e)=>{kurs(e,j,i)}}>
                                    {Plan[keys[j]][i].Zeit}<br/>
                                    {Plan[keys[j]][i].Gruppe}<br/>
                                    {Plan[keys[j]][i].comentar}
                                    
                                </td>)
                    }
                }
            }
       }
        Row.push(<tr key={i+1}>{col}</tr>);
    }
   
    let Plantemplate=()=>{
        setdis2("Block");
        setdis4("none");
    }

    let kurs=(e,j,i)=>{
        let tr=e.currentTarget.parentElement;
        let tb=tr.parentElement;
        for(let i=1; i<tb.children.length; i++){
        let Row=tb.children[i];
        for(let j=0; j<Row.children.length; j++ )
                Row.children[j].style.backgroundColor="rgb(199, 229, 229)";
        }
        e.currentTarget.style.backgroundColor="red"
        setdis3("Block")
        setKursn(i)
        setTagn(j)
    }
    let databasesave=()=>{
        const dataRef = ref(db, "/Plan");
        set(dataRef,Plan);
        alert("deine neu Daten sind gespeichert worden ,kontroliert das bitte");
    }
    let Kundenverwaltung=()=>{
        setdis4("Block");
        setdis2("none");
    }

    return(
        <div style={{marginTop:"20px"}}>
            <div className="AdminBtn">
                <h3>Was möchtest du verwalten;</h3>
                <button onClick={Plantemplate}>Plan</button>
                <button style={{marginLeft:"20px"}} onClick={Kundenverwaltung}>Kunden</button>
            </div>
            <div style={{display:dis2}}>
                <h4>Du kannst ein Kurs löschen oder ändern oder ein neue Kurs hinzufugen</h4>
                <div className="AdminPlan" >
                    <div className='table1'> 
                        <table >
                            <tbody>
                                <tr>
                                    {keys.map((Tag,idx)=>(
                                        <td key={idx} style={{padding:"20px"}}>{Tag}</td>
                                    ))}
                                </tr>
                                {Row}
                                <tr>
                                    <td  style={{width:"100px"}} colSpan="5"><p className='Kurs_urban'><img src='img/urban.png'alt='urban' style={{width:"20px"}}></img>offene Erwachsenenkurse, an denen auch URBANSPORTSCLUB Mitglieder teilnehmen können.
                                            M-Mitglieder können 8 Kurse pro Monat besuchen / L-, XL-Mitglieder können 1 Kurs pro Tag besuchen
                                            NUR NACH VORHERIGER ANMELDUNG!</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="regeln">
                        <Adminplan
                            dis3={dis3}
                            Tagn={Tagn}
                            Kursn={Kursn}
                            Plan={Plan}
                            setPlan={setPlan}
                            keys={keys}
                        />
                    </div>
                </div>
                <div  className="databasebtn">
                    <p>Vergiss nicht deine Änderungen zu speichern</p>
                    <button onClick={databasesave}> Dance2Impress speichern </button>
                </div>
            </div>
            <div style={{display:dis4}}>
                <AdminKunde
                    Kunden={Kunden}
                    setKunden={setKunden}
                />
            </div>
        </div>
    )
}
export default Adminpage;