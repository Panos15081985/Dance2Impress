function Kontakt(){
    const meineEmail = 'info@dance2impress.de';
    return(
        <div id="Kontakt">
            <div className="Kontakt_Daten">
                <div>
                    <img src="img/haus.png" alt="haus"></img>
                    <ul>
                        <li>Tanzatelier Dance2Impress</li>
                        <li>Adolf-Silverberg-Str. 36</li>
                        <li>50181 Bedburg</li>
                    </ul>
                </div>
                <div>
                    <img src="img/spr.png" alt="sprechen"></img>
                    <ul>
                        <li><a href={`mailto:${meineEmail}`}>✉ info@dance2impress.de</a></li>
                        <li>☎ 02272-8080580</li>
                    </ul>
                </div>
            </div>
            <div className="map">
            <iframe title="Karte" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.613045268178!2d6.570534500000002!3d50.9863427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf45f1babc3827%3A0x28d8d3302291550f!2sAdolf-Silverberg-Stra%C3%9Fe%2036%2C%2050181%20Bedburg!5e0!3m2!1sel!2sde!4v1695198784573!5m2!1sel!2sde" width="99%" height="500" allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    ) 
}
export default Kontakt;