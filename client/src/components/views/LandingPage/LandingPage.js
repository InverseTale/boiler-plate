import React from 'react';
import {FaCode} from 'react-icons/fa';

function LandingPage() {

    return (
        <>
            <div className={"app"}>
                <FaCode style={{fontSize: '4rem'}}/>
                <br/>
                <span style={{fontSize: '2rem'}}> Coding Part</span>
            </div>
            <div style={{float: 'right'}}> boiler template </div>
        </>
    );
}

export default LandingPage;
