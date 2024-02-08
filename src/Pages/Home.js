
function Home(){

  return(
    <div className="background" id="Home">
      <div className="logo">
        <img src="img/logoklein.png" alt="logo" className="logoimg"/>
      </div>
        <video autoPlay loop muted playsInline>
        <source src="video/Disco.mov" type="video/mp4" />
        {/* Fügen Sie hier weitere Videoformate hinzu, z.B. WebM oder Ogg. */}
        Your browser does not support the video tag.
      </video>
      <div className="logo1" >
        <h1>
          <span> Sichere </span>
          <span> dir </span>
          <span> jetzt </span>
          <span> eine </span>
          <span> kostenlose </span>
          <span> Probestunde </span>
          <span>!</span>
        </h1>
        <a href="#Kursplan" >Probestunde</a>
      </div>
    </div>
  )
}
export default Home;