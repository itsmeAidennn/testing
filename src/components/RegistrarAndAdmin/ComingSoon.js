import { React } from 'react';
import style from '../../styling/RegistrarAndAdmin/ComingSoon.module.css';

const ComingSoon = () => {
    return (
        <div className={`${style.container}`}>
            <h1 className={`${style.text}`}>Coming Soon</h1>
            <p>Please notify the devs about this.</p>
        </div>
        
    )
}

export default ComingSoon;