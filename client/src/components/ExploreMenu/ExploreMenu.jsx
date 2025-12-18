import { useEffect, useRef } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import MobileOnlyText from '../MobileOnlyText/MobileOnlyText'

const ExploreMenu = ({ category, setCategory }) => {

  const textPointRef = useRef(null)
  let lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!textPointRef.current) return

      if (window.scrollY > lastScrollY.current) {
        // scrolling down → hide
        textPointRef.current.classList.remove('scroll-show')
        textPointRef.current.classList.add('scroll-hide')
      } else {
        // scrolling up → show
        textPointRef.current.classList.remove('scroll-hide')
        textPointRef.current.classList.add('scroll-show')
      }

      lastScrollY.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='heading-section'>

        <h1>
          EXO Bilvårdscenter din trygga <br /> bilverkstad sedan 2020
        </h1>

        <p className='explore-menu-text'>
          Välkommen till EXO Bilvårdscenter – en modern och professionell bilverkstad där kvalitet, trygghet och personligt bemötande står i fokus.
        </p>

        {/* 👇 THIS is the animated block */}
        <div ref={textPointRef} className='text-point scroll-show'>
          <p className='explore-menu-text'>Varför välja oss?</p>
          <ul>
            <li>Snabb och pålitlig service</li>
            <li>Erfaren personal och noggrant utförda arbeten</li>
            <li>Konkurrenskraftiga priser</li>
            <li>Helhetslösningar</li>
            <li>Allt din bil behöver på ett och samma ställe</li>
          </ul>
          <p className='explore-menu-text'>
            Boka tid redan idag och låt oss ta hand om din bil med högsta precision och omsorg!
          </p>
        </div>

        <h3>Säsongsservice året runt</h3>
        <p className='explore-menu-text'>
          Vi erbjuder ett komplett utbud av tjänster för att hålla din bil i bästa möjliga skick:
        </p>
      </div>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? 'active' : ''}
              src={item.menu_image}
              alt="menu"
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
      <MobileOnlyText />
    </div>
  )
}

export default ExploreMenu
