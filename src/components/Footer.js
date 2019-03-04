import React from 'react';
import { SocialIcon } from 'react-social-icons';

import './Footer.css';

const Footer = (props) => {
    return ( 
        <div id="footer-container">
            <div className="footer-section" id='connect'>
                <h1 className="footer-section-title">Connect</h1>
                <SocialIcon className="social-icon" url="https://twitter.com/thebestcloser" target="_blank" rel="noopener noreferrer" />
                <SocialIcon className="social-icon" url="https://facebook.com/thebestcloser" target="_blank" rel="noopener noreferrer" />
            </div>
            <div className="footer-section" id='contact'>
                <h1 className="footer-section-title">Contact</h1>
                <a id="email" href="mailto:indictmentclothing2019@gmail.com">indictmentclothing2019@gmail.com</a>
            </div>
        </div>
    );
}
 
export default Footer;