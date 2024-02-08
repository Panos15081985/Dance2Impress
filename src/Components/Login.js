import {useEffect, useState} from 'react';
function Login(props){
    let[extraform, setextraform] = useState({display:"none"});
    let[berechtigung, setberechtigung] = useState({visibility:"hidden"});
    let[form,setform]=useState({displa:"block"});
    let setDatenbestätigen=props.setDatenbestätigen;
    let settablestyle=props.settablestyle;
    let setDanser=props.setDanser;
    let setinfop=props.setinfop;
    let jahr=props.jahr;
    let setAlter=props.setAlter;
    let setinfostyle=props.setinfostyle;
    let[Kundedaten, setkundedaten]= useState({
        Name:"",
        Nachname:"",
        Geburtsdatum:"",
        Tel:"",
        Email:"",
        Ername:"",
        Ernachname:""
    });

    let set = (e) => {
        let { name, value } = e.target;
        setkundedaten((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

    useEffect(()=>{
        if(Kundedaten.Geburtsdatum!==""){
            if(Kundedaten.Name!=="" && Kundedaten.Nachname!==""){
                let Gejahr= Kundedaten.Geburtsdatum.split("-");
                let Alter=jahr-Gejahr[0];
                setAlter(Alter);
                if(Alter<18){
                    setberechtigung({visibility:"visible"});
                    setextraform({display:"none"});
                }
                else{
                    setextraform({display:"block"});
                    setberechtigung({visibility:"hidden"});
                }
            }
            else
                setinfop("Bitte alle Felder ausfüllen");
        }
    },[Kundedaten.Geburtsdatum,Kundedaten.Name,Kundedaten.Nachname,jahr,setAlter,setinfop]);
    
    
    let Bestätigen=(idx)=>{
        if(idx===1 && (Kundedaten.Ernachname==="" || Kundedaten.Ername==="" || Kundedaten.Email==="" || Kundedaten.Tel==="")){
            setinfop("Bitte alle Felder ausfüllen");
            setinfostyle({color: "red"});
            
        }
        else if(idx===0 &&(Kundedaten.Email==="" || Kundedaten.Tel==="")){
            setinfop("Bitte alle Felder ausfüllen");
            setinfostyle({color: "red"});
        }
        else{
            setextraform({display:"none"});
            setberechtigung({display:"none"});
            setform({display:"none"});
            setDatenbestätigen({display:"block",visibility:"hidden"})
            setDanser(Kundedaten);
            setinfop("Wähle dir einen passenden Kurs aus");
            settablestyle({cursor:"pointer"});
            setinfostyle({color: "red"});
        }
    }
 
    return(
        <div>
            <div className='Probe_login'>
                <div style={form} className='Probe_form'>
                    <p><img className='arrowred' src='img/downred.png' alt='arrow'></img>Teilnehmer/-in</p>
                    <input placeholder='Vorname'  name='Name'  value={Kundedaten.Alter} onChange={set}></input>
                    <input placeholder='Nachname'  name='Nachname'  value={Kundedaten.Nachname} onChange={set}></input>
                    <div className='p_geburt'>Geburtsdatum:</div><input type='date' name='Geburtsdatum' value={Kundedaten.geburtsdatum} onChange={set}></input>
                </div>
                <div style={extraform} className='extra_form'>
                    <h4>Bitte füge deine Telefonnumer und E-Mail-Adresse hinzu</h4>
                    <input placeholder='Telefonnummer' name='Tel' value={Kundedaten.Tel} onChange={set}></input>
                    <input placeholder='E-Mail'  name='Email'  value={Kundedaten.Email} onChange={set}></input><br/>
                    <button style={{marginBottom:"10px"}} onClick={()=>{Bestätigen(0)}}>Bestätigen</button>
                </div>
                <div style={berechtigung} className='berechtigung'>
                    <h4>Erziehungsberechtigte/-r bei Minderjährigen</h4>
                    <input placeholder='Vorname' name='Ername'  value={Kundedaten.Ername} onChange={set}></input>
                    <input placeholder='Nachname'  name='Ernachname'  value={Kundedaten.Ernachname} onChange={set}></input>
                    <input placeholder='Telefonummer' name='Tel'  value={Kundedaten.Tel} onChange={set}></input>
                    <input placeholder='E-Mail' name='Email'  value={Kundedaten.Email} onChange={set}></input><br/>
                    <button style={{marginBottom:"10px"}}  onClick={()=>{Bestätigen(1)}}>Bestätigen</button>
                </div>
            </div>
        </div>
    )
}
export default Login;