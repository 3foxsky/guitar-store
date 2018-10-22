import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from './Button';

import { addToCart } from '../../actions/user';

class Card extends Component {

  renderCardImage(images){
    if(images.length > 0){
      return images[0].url;
    } else {
      return '/images/image_not_availble.png';
    }
  }


  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background:`url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        >  </div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="name">${props.price}</div>
          </div>
                    
          { props.grid ?
            <div className="description">
              <p>
                {props.description}
              </p>    
            </div>
            :null
          }
          <div className="actions items-center">
            <div className="button_wrapp w-full">
              <Button
                type="default"
                altClass="card_link w-full"
                title="View product"
                linkTo={`/product-detail/${props._id}`}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
            <div className="button_wrapp">
              <Button
                type="bag_link"
                runAction={()=>{
                  props.user.userData.isAuth ?
                    props.addToCart(props._id)
                    :
                    props.history.push('/login');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(
  ({user}) => ({
    user,
  }),
  {
    addToCart,
  }
)(withRouter(Card));