import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='heading-section'>
        {/* <h1>Utforsta meny</h1> */}
        <h1>EXO Bilvårdscenter din trygga <br /> bilverkstad sedan 2020</h1>
        <p className='explore-menu-text'>Välkommen till EXO Bilvårdscenter – en modern och professionell bilverkstad där kvalitet, trygghet och personligt bemötande står i fokus. Vi hjälper dig med allt från löpande service och reparationer till däckservice, bilvård och avancerad felsökning.
            Oavsett bilmodell eller behov kan du lita på att ditt fordon tas om hand av erfarna tekniker med bred kompetens.
        </p>
        <p className='explore-menu-text'>Varför välja oss?</p>
        <ul>
          <li>Snabb och pålitlig service</li>
          <li>Erfaren personal och noggrant utförda arbeten</li>
          <li>Konkurrenskraftiga priser</li>
          <li>Helhetslösningar</li>
          <li>allt din bil behöver på ett och samma ställe</li>
        </ul>
        <p className='explore-menu-text'>Boka tid redan idag och låt oss ta hand om din bil med högsta precision och omsorg!</p>
        <h3>Säsongsservice året runt</h3>
        <p className='explore-menu-text'>Vi erbjuder ett komplett utbud av tjänster för att hålla din bil i bästa möjliga skick:</p>
      </div>
         <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return (
                    <div onClick={() => setCategory(prev => prev===item.menu_name? 'All' : item.menu_name)} className="explore-menu-list-item" key={index}>
                        <img className={category=== item.menu_name ? 'active' : ''} src={item.menu_image} alt="menu image" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
         </div>
         <hr />
    </div>
  )
}

export default ExploreMenu