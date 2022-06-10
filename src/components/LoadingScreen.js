import React from 'react';
import "../styles/loading-screen.css";


const LoadingScreen = ({show, handleClose}) => {
    return (
        <div className='overlay'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;