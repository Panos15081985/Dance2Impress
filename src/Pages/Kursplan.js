import {useState, useEffect} from 'react';
import Login from '../Components/Login';
import {db} from "../Database/firebase";
import firedb from '../Database/firemail';
import {ref,set, onValue} from "firebase/database"
import { collection ,addDoc} from "firebase/firestore";

function Kursplan(){
    let[Plan,setPlan]=useState([]);
    let[bankDaten ,setbankDaten]=useState({});
    let[infop,setinfop]=useState("MELDE DICH JETZT FÜR EINE KOSTENLOSE PROBESTUNDE AN");
    let[Danser,setDanser]=useState("");
    let aktuellesDatum = new Date();
    let jahr = aktuellesDatum.getFullYear();
    let monat = aktuellesDatum.getMonth() + 1; // Monate sind nullbasiert, daher +1
    let tag = aktuellesDatum.getDate();
    let options = { weekday: 'long' };
    let wochentag = aktuellesDatum.toLocaleDateString('de-DE', options);
    let [Alter, setAlter]=useState("");
    let [infostyle,setinfostyle]=useState({animation:" colorChange 2s infinite alternate"});
    let[tablestyle,settablestyle]=useState({backgroundColor:"rgb(199, 229, 229)"});
    let[Datenbestätigen,setDatenbestätigen]=useState({visibility:"hidden",display:"none"});
    let[Datumk,setDatumk]=useState("");
    let[Nextdatumk,setnextdatumk]=useState("");
    let[selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{
        const userRef= ref(db,"/Plan");
        onValue(
            userRef,
            (snapshot)=>{
                const dataobjt=snapshot.val();
                let newPlan={
                    Montag:dataobjt.Montag,
                    Dienstag:dataobjt.Dienstag,
                    Mittwoch:dataobjt.Mittwoch,
                    Donnerstag:dataobjt.Donnerstag,
                    Freitag:dataobjt.Freitag
                }
                setPlan(newPlan)
            },
        (error) => {
            console.error("Fehler beim Abrufen der Daten:", error);
          }
        );
    },[]);

    let keys = Object.keys(Plan);
    let max=0;
    for(let i=0; i<keys.length; i++){
        if(max<Plan[keys[i]].length)
            max=Plan[keys[i]].length;
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
                        col.push(<td style={tablestyle} key={j} onClick={(e)=>{kurs(e,j)}}>
                        {Plan[keys[j]][i].Zeit}<br/>
                        <p className='Kurstableparag'><img src='img/urban.png'alt='urban' style={{width:"20px"}}></img>{Plan[keys[j]][i].Gruppe}<br/>{Plan[keys[j]][i].comentar}</p>
                        </td>)
                    }
                    else{col.push(<td style={tablestyle} key={j} onClick={(e)=>{kurs(e,j)}}>
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
    
    let kurs=(e,j)=>{
        if(Danser!==""){
            let tr=e.currentTarget.parentElement;
            let tb=tr.parentElement;
            for(let i=1; i<tb.children.length; i++){
            let Row=tb.children[i];
            for(let j=0; j<Row.children.length; j++ )
                    Row.children[j].style.backgroundColor="rgb(199, 229, 229)";
            }
            let Daten=e.currentTarget.innerHTML.split("<br>");
            if(Daten[1].includes("urban")){
              let a1=Daten[1].split(">");
              let a2=Daten[2].split("</p>");
              let Uhr=Daten[0];
              let Gruppe=a1[2];
              let kom=a2[0];
              Daten=[];
              Daten.push(Uhr,Gruppe,kom);
            }
            if(Daten[2]==="geschl. Gruppe"){
                e.currentTarget.style.backgroundColor="red";
                setinfop("Eine Probestunde ist in einer geschlossenen Gruppe nicht möglich");
                setinfostyle({color:"red"});
                setDatenbestätigen({visibility:"hidden"});
            }
            else if(Daten[2].includes("ca.")){
                let alter0=Daten[2].split(".");
                let alter1=alter0[1].split("Jahre");
                let alter2=alter1[0].split("-");
                let param1=parseFloat(alter2[0]);
                let param2=parseFloat(alter2[1]);
                if(Alter>=param1 && Alter<=param2)
                    Datenlesson(Daten,e,j);
                else{
                    setinfop("Der ausgesuchte Kurs passt nicht zum angegebenen Alter");
                    setinfostyle({color: "red"});
                    e.currentTarget.style.backgroundColor="red";
                    setDatenbestätigen({visibility:"hidden"});
                }
            }
            else if(Daten[2].includes("ab")){
                let alter01=Daten[2].split("Jahren");
                let alter02=alter01[0].split("ab");
                let param=parseFloat(alter02[1]);
                if(Alter<param){
                    setinfop("Der ausgesuchte Kurs passt nicht zum angegebenen Alter");
                    setinfostyle({color: "red"});
                    e.currentTarget.style.backgroundColor="red";
                    setDatenbestätigen({visibility:"hidden"});
                }
                else
                Datenlesson(Daten,e,j);
            }
            else if(Daten[1]==="Zumba" || Daten[1]==="Yoga"){
                if(Alter < 18){
                    setinfop("Zumba und Yoga ist erst ab 18 Jahren");
                    setinfostyle({color: "red"});
                    e.currentTarget.style.backgroundColor="red";
                    setDatenbestätigen({visibility:"hidden"});
                }
                else
                Datenlesson(Daten,e,j);
            }
            else
                Datenlesson(Daten,e,j);
        }
    }

    let Datenlesson=(Daten,e,j)=>{
        e.currentTarget.style.backgroundColor="rgb(6, 246, 38)";
        setinfostyle({color: "black"}); 
        let lessonDaten="Du hast dir folgenden Kurs ausgesucht: "+Daten[0]+" "+Daten[1]+" "+Daten[2];
        setinfop(lessonDaten);
        setDatenbestätigen({visibility:"visible"});
        let WahlTag="";
        let wochentagNumber="";
        let WahlTagNumber="";
        let apotelesma="";
        let Nmonat=monat;
        let Njahr=jahr;
        let Dmonat=monat;
        let Djahr=jahr;
        let Tags=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
        for(let i=0; i<Tags.length; i++){
           if(j===i){
                WahlTag=Tags[i];
                WahlTagNumber=i+1;
            }
            if(Tags[i]===wochentag)
                wochentagNumber=i+1;
        }
        if(WahlTagNumber<wochentagNumber){
            let korekt=WahlTagNumber-wochentagNumber;
            apotelesma =Tags.length+korekt;
        }
        else
            apotelesma=WahlTagNumber-wochentagNumber;
        let Datum=tag+apotelesma;
        let nextDatum=Datum+7;
        let TagevonMonat=new Date(jahr, monat, 0).getDate();
        if(Datum>TagevonMonat){
             Datum=Datum-TagevonMonat;
            if(Dmonat===12){
                Dmonat=1;
                Djahr=jahr+1;
            }
            else
                Dmonat=monat+1;
        }
        if(nextDatum>TagevonMonat){
            nextDatum=nextDatum-TagevonMonat;
            if(Nmonat===12){
                 Nmonat=1;
                 Njahr=jahr+1;
            }
            else
                 Nmonat=monat+1;
        }
       let kurs1=Datum+"-"+Dmonat+"-"+Djahr
       let nextkurs2=nextDatum+"-"+Nmonat+"-"+Njahr
       setDatumk(kurs1)
       setnextdatumk(nextkurs2)
       setbankDaten(prevDaten=>({
            ...prevDaten,
            Name:Danser.Name,
            Nachname:Danser.Nachname,
            Geburt:Danser.Geburtsdatum,
            AlterTeilnehmer:Alter,
            Tel:Danser.Tel,
            Email:Danser.Email,
            Uhr:Daten[0],
            Gruppe:Daten[1],
            comentar:Daten[2],
        }))
        if(Danser.Ername!==""){
            setbankDaten(prevbankDaten=>({
                ...prevbankDaten,
                Ername:Danser.Ername,
                Ernachname:Danser.Ernachname
            }))
        }
    }

    let check=(event)=>{
        setSelectedOption(event.target.value)
        setbankDaten(prevbankDaten=>({
            ...prevbankDaten,
            Kursdatum:event.target.value
        }))
    }

    let ende= async ()=>{
        if(selectedOption===null)
            setinfop("Wähle ein Datum aus");
        else{
            setinfop("Vielen Dank. Deine Anfrage wird überprüft und per E-Mail bestätigt. Die Bestätigung bitte vor Kursbeginn vorzeigen.")
            setDatenbestätigen({visibility:"hidden"});
            setDanser("");
            const dataRef = ref(db, '/Kunden/'+ bankDaten.Nachname);
            set(dataRef,bankDaten);
            try{
                const collectionRef = collection(firedb,"mail");
                const RefDocument =await addDoc(collectionRef, { 
                    to: ["info@dance2impress.de"],
                    message:{
                        subject:"neue Kunde",
                        text:bankDaten
                    }
                });
                }
            catch(error){
                    console.log(error)
            }
        }
    }

   
 return(
        <div id='Kursplan'>
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
            <div className='Probe_p'>
                <p style={infostyle}>{infop}</p> 
            </div>
            <div className='Probe_datums' style={Datenbestätigen} >
                <p>Wähle ein Datum aus</p>
                    <label >{Datumk}
                        <input type="radio" checked={selectedOption === Datumk} onChange={check} value={Datumk}></input>
                    </label>
                    <label >{Nextdatumk}
                        <input type="radio"  checked={selectedOption === Nextdatumk} onChange={check} value={Nextdatumk}></input>
                    </label><br/>
                <button onClick={ende} className='Probe_p'>Anfrage abschicken</button>
            </div>
            <Login 
                setinfop={setinfop}
                setDanser={setDanser}
                jahr={jahr}
                setAlter={setAlter}
                setinfostyle={setinfostyle}
                settablestyle={settablestyle}
                setDatenbestätigen={setDatenbestätigen}
            />
        </div>
    )
}
export default Kursplan;
       
            
                       
                    