import React from 'react';
import Stile from '../Pages/Stile';
import Uber from '../Pages/Uber';
import Kursplan from '../Pages/Kursplan';
import Kontakt from '../Pages/Kontakt';
import DatenBAr from '../Pages/DatenBar';
import Home from '../Pages/Home';

function NavigationBar(){

    return(
        <div  >
            <div className='nav_center'>
                <div className='nav' >
                    <img src='img/btn.jpg' alt='Menu'></img>
                    <ul>
                        <li> 
                            <a href='#Home'>HOME</a>
                        </li>
                        <li> 
                            <a href="#Uber"> ÜBER UNS</a>
                        </li>
                        <li> 
                            <a href="#Stile">KURSE</a>
                        </li>
                        <li>
                            <a href="#Kursplan">KURSPLAN</a>
                        </li>
                        <li> 
                            <a href="#Kontakt">KONTAKT</a>
                        </li>
                    </ul>
                </div>
                <div className='sosial'>
                    <a href="https://www.instagram.com/tanzatelier_dance2impress/?utm_medium=copy_link" ><img src='img/instag.png' className='insta' alt='instagram'></img></a><br/>
                    <a href="https://www.facebook.com/people/Tanzatelier-Dance2Impress/100054606212213/?ref=embed_page"><img src='img/fs.png' alt='facebook'></img></a>
                </div>
            </div>
            <Home/>
            <Uber/>
            <Stile/>
            <Kursplan/>
            <Kontakt/>
            <DatenBAr/>
        </div>
    )
}
export default NavigationBar;