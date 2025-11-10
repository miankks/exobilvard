import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.exobil_logo} alt="logo" className='footer-logo'/>
                <p>Professionell bilservice och biltvätt. Snabb, 
                    prisvärd och pålitlig service för ditt fordon.
                </p>
                <div className="footer-social-icons">
                    <NavLink><img src={assets.facebook_icon} alt="" /></NavLink>
                    <NavLink to='https://www.instagram.com/exobilvardscenter/' target='_blank'><FaInstagram className='react-icon'/></NavLink>
                    <NavLink><img src={assets.twitter_icon} alt="" /></NavLink>
                    <NavLink><img src={assets.linkedin_icon} alt="" /></NavLink>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Exo Bilvårdcenter</h2>
                <ul>
                    <li>Hem</li>
                    <li>Om oss</li>
                </ul>
            </div>
             <div className="footer-content-center">
                <h2>Tjänster</h2>
                <ul>
                    <li>Motordiagnostik</li>
                    <li>Oljebyte</li>
                    <li>Bromstjänst</li>
                    <li>Invändig detaljering</li>
                    <li>Utvändig handtvätt</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Kontaktinfo</h2>
                <ul>
                    <li>076-028 34 40</li>
                    <li>info@exobilvardscenter.se</li>
                    <li>Söderbyvägen 14, 195 60 Arlandastad</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2025 Exo bilvårdcenter - Alla rättigheter förbehållna
        </p>
    </div>
  )
}

export default Footer