import React from 'react';
import dog from './imgs/dog.png';

const NotFound = () => {
    return (
        <div className="container">
            <h1 className="mt-4">404 Page: Not Found</h1>
            <p>Either you can't type or we broke something.</p>
            <img src={dog} alt="Lost Dog" height="350"/>
            <span className="ms-2">
        <a className="btn btn-primary" href="/" role="button">
          Take me back Home
        </a>
      </span>
        </div>
    );
}
export default NotFound;