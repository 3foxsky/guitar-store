import React from 'react';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';


const Button = ({ className, linkTo, title, type, onClick, addStyles }) => {

  const renderButton = () => {
    switch(type){

    case 'default':
      return (
        <Link
          className={!className ? 'link_default': className }   
          to={linkTo}
          {...addStyles}
        >
          {title}
        </Link>
      );
    case 'bag_link':
      return (
        <div className="bag_link"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={faShoppingBag}
          />
        </div>
      );
    case 'add_to_cart_link':
      return (
        <div className="add_to_cart_link"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={faShoppingBag}
          />
            Add to cart
        </div>
      );
    default:
      return null;
    }
  };


  return (
    <div className="my_link w-full">
      {renderButton()}   
    </div>
  );
};

export default Button;