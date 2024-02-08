import { useState } from "react";
import { db } from "../Database/firebase";
import { set, ref } from "firebase/database";

function AdminKunde(props){
    let Kunden=props.Kunden;
    let setKunden=props.setKunden;
    let keys=Object.keys(Kunden);
    let[datenkunde,setdatenkunde]=useState(0);

    let kundedaten=(name)=>{
       setdatenkunde(Kunden[name]);
    }
    
    let deletekunde=(name,event)=>{
        event.stopPropagation();
        if(keys.length > 1){
            const sicher=window.confirm("Möchten Sie fortfahren?");
            if(sicher){
                let newKunde={...Kunden};
                delete newKunde[name];
                setKunden(newKunde);
            } 
        }
        else 
            alert("die Database kann nicht leer sein");
    }

    let databasesave=()=>{
        const dataRef = ref(db, "/Kunden");
        set(dataRef,Kunden);
        alert("deine neu Daten sind gespeichert worden");
    }

    return(
        <div>
            <div className="AdminKunde">
                <div className="AdminKundeliste">
                    <h3>Kunden</h3>
                    <table>
                        <tbody>
                            {keys.map((name,nidx)=>{
                                return(
                                    <tr key={nidx}>
                                        <td className="tablename" onClick={()=>{kundedaten(name)}}>{name}</td>
                                        <td>{Kunden[name].Kursdatum}</td>
                                        <td className="tabledelete"><img alt="delete" onClick={(e)=>{deletekunde(name,e)}} src="img/delete.png"/></td>
                                    </tr>   
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="AdminkundeDaten">
                        {datenkunde!==0 &&<ul>
                            <li>{datenkunde.Name}</li>
                            <li>{datenkunde.Nachname}</li>
                            <li>{datenkunde.Email}</li>
                            <li>Alter : {datenkunde.AlterTeilnehmer}</li>
                            <li>{datenkunde.Geburt}</li>
                            <li>Tel : {datenkunde.Tel}</li>
                            {datenkunde.Ername!==undefined && <li>{datenkunde.Ername}</li>}
                            {datenkunde.Ernachname!==undefined && <li>{datenkunde.Ernachname}</li>}
                            <li>Kursdatum : {datenkunde.Kursdatum}</li>
                            <li>{datenkunde.Uhr}</li>
                            <li>{datenkunde.Gruppe}</li>
                            <li>{datenkunde.comentar}</li>
                        </ul>}
                    </div>
                </div>
            </div>
            <div  className="databasebtn">
                <p>vergiss nicht deine Änderungen zu speichern</p>
                <button onClick={databasesave}>In database speichern </button>
            </div>
        </div>
    )
}
export default AdminKunde;