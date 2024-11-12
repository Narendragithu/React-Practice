
import React from 'react';
import { Link } from 'react-router-dom';

function BackButton(props) {
    return (
        <div>
            <Link to='/products/home'>
            <button className='btn btn-info'>Go back</button>
            </Link>
            
        </div>
    );
}

export default BackButton;