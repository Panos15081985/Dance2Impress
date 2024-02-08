import Slideshow from '../Components/Slideshow';

function Uber() {
    const images = [
        "img/foto (1).JPG", 
        "img/foto (2).JPG" ,
        "img/foto (3).JPG",
        "img/foto (4).JPG",
        "img/foto (5).JPG",
        "img/foto (6).JPG",
        "img/foto (7).JPG",
        "img/foto (8).JPG",
        "img/foto (9).JPG",
        "img/foto (10).JPG",
    ];
    return (
        <div id="Uber">
            <div className="Uber_main">
                <h3 className="mainh3">tanzen</h3>
                <p className="mainP2">[tan|zen], Verb</p>
                <p className="mainP3">
                    Tanzen ist die Poesie des Fußes, bei der wir mit den Füßen unsere Seele auf den Boden malen.
                </p>
                <p className="mainP3">
                    Wer tanzt, schüttelt die Probleme des Alltages einfach ab. Es ist ein Ausdruck von Freude,
                    Disziplin und Körperbeherrschung.
                </p>
                <p className="mainP3">
                    Tanzen wirkt sich positiv auf die Gesundheit aus und fördert
                    das Körperselbstbewusstsein. Es bringt Menschen aus aller Welt und jeden Alters zusammen.
                </p>
                <p className="mainP3">
                    Tanzen macht glücklich – also tanz, wenn dir die Welt zu viel wird.
                </p>

                <p className="aboutus_p">
                    <span className="uber_span">Wir</span>, das Tanzatelier Dance 2 Impress, begeistern bereits seit 2008 viele Tänzer *innen,
                    egal ob jung oder alt, groß oder klein. Wir sind die Adresse für Kindertanzen, Hip Hop,
                    Zumba und Yoga in Bedburg und Umgebung.
                </p>
                <p className="aboutus">
                    Du möchtest dir erste Grundkenntnisse aneignen
                    oder deine Fähigkeiten vertiefen? Wir helfen dir dabei, den richtigen Kurs für dich zu finden
                    - den Kurs der zu dir und deinen Zielen passt.
                </p>
                <p className="aboutus">
                    In diesem heißt es dann: dem Alltag entfliehen,
                    dich der Musik hingeben und gleichzeitig Disziplin, Beweglichkeit, Körpergefühl und
                    Selbstbewusstsein stärken.
                </p>
                <p className="aboutus">Auf zahlreichen Auftritten und Meisterschaften konnten unsere
                    Tanzgruppen seit vielen Jahren immer wieder Familie begeistern und die Wertungsrichter
                    überzeugen. Darauf sind wir sehr stolz!
                </p>

                <p className="aboutus">Gemeinsam stecken wir viel Freude und Leidenschaft
                    in unsere Tanzstunden. Wir schaffen einen Ort, an dem Trainer und Schüler immer wieder gerne
                    zusammenkommen.
                </p>
                <p className="aboutus" style={{ marginBottom: "0%", paddingBottom: "20px" }}>Das zeichnet uns aus.</p>
            </div>
            <div className="slide">
           <Slideshow images={images} />
         </div>
        </div>
    )
}
export default Uber;