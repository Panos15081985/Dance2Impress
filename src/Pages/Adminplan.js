import { useState } from "react";

function Adminplan(props) {
    let dis3 = props.dis3;
    let Kursn = props.Kursn;
    let Tagn = props.Tagn;
    let Plan = props.Plan;
    let setPlan = props.setPlan;
    let keys = props.keys;
    let [dis1, setdis1] = useState("none");
    let [positionkurs, setpositionkurs] = useState(0);
    let [newkursjson, setnewkursjson] = useState({
        Zeit: "",
        Gruppe: "",
        comentar: "",
        Urban: false
    })

    let deletekurs = () => {
        let newliste = [];
        let newPlan = { ...Plan };
        for (let t = 0; t < newPlan[keys[Tagn]].length; t++) {
            if (t !== Kursn) {
                newliste.push(newPlan[keys[Tagn]][t])
            }
        }
        newPlan[keys[Tagn]] = newliste;
        korektur(newPlan);
    }

    let pluskurs = () => {
        let newPlan = { ...Plan };
        let newTag = newPlan[keys[Tagn]].filter((item) => { return item.Tag !== "" });
        newPlan[keys[Tagn]] = newTag;
        newPlan[keys[Tagn]].splice(positionkurs, 0, newkursjson);
        korektur(newPlan);
        setdis1("none");
    }

    let newkursdaten = () => {
        setdis1("grid");
    }

    let korektur = (newPlan) => {
        let max = 0;
        for (let i = 0; i < keys.length; i++) {
            if (max < newPlan[keys[i]].length)
                max = newPlan[keys[i]].length;
        }
        for (let j = 0; j < keys.length; j++) {
            if (newPlan[keys[j]].length < max)
                newPlan[keys[j]].push({ Tag: "" })
        }
        let Tagsemptys = Object.values(newPlan).every(liste => liste[liste.length - 1].Tag === "")
        if (Tagsemptys) {
            for (let s = 0; s < keys.length; s++)
                newPlan[keys[s]].pop()
        }
        setPlan(newPlan)
    }


    return (
        <div className="AdminPlanregeln" style={{ display: dis3 }}>
            <div className="AdminPlanbtn">
                <p>Möchtest du dieses Kurs Löschen ? oder An diesem Tag ein Kurs hinzufügen? </p>
                <div className="BtnVerw">
                    <button onClick={deletekurs} style={{ backgroundColor: "red" }}>löschen</button>
                    <button onClick={newkursdaten} style={{ backgroundColor: "green" }}>Kurs hinzufugen</button>
                </div>
            </div>
            <div>
            <div style={{ display: dis1 }} className="AdminPlanipt">
                <p>Zeit: Genau wie bei den anderen Kursen schreiben</p>
                <input placeholder="Zeit" onChange={(e) => { setnewkursjson(prevDaten => ({ ...prevDaten, Zeit: e.target.value })) }} />
                <p> Gruppe: bei Zumba gibt es das Filter: Kunde über 18 Jahre kann sich teilnehmen</p>
                <input placeholder="Gruppe" onChange={(e) => { setnewkursjson(prevDaten => ({ ...prevDaten, Gruppe: e.target.value })) }} />
                <p>comentar: Alter im Kommentar hinzufügen, so wie bei anderen Kursen (mit Leerzeichen, Bindestrichen und Wörtern wie "Jahre", "ab" oder "ca.").
                    Wenn du "geschl. Gruppe" angibst, sind keine Probetstunde für diesen Kurs möglich.</p>
                <input placeholder="comentar" onChange={(e) => { setnewkursjson(prevDaten => ({ ...prevDaten, comentar: e.target.value })) }} />
                <p>Urban: wenn das Kurs Urban ist einfach "true" schreiben sonst leer lassen  </p>
                <input placeholder="Urban" onChange={(e) => { setnewkursjson(prevDaten => ({ ...prevDaten, Urban: e.target.value })) }} />
                <p>Position: An diesem Tag, an welcher Position möchtest du diesen Kurs haben? Die erste Position ist Position 0, danach folgen Position 1, 2, 3 usw.</p>
                <input placeholder="position" onChange={(e) => { setpositionkurs(e.target.value) }} />
                <button onClick={pluskurs}>Hinzufügen</button>
            </div>
            </div>
        </div>
    )
}
export default Adminplan;