import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { 
  getCartItems,
  removeFromCart ,
  // onSuccessBuy
} from '../../../actions/user';
import { calculateTotal } from '../../../selectors';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import CartProducts from './CartProducts';

/// AfbA2-qjz92KhC5IDxvx2UpiIDBmSD7PdlKkZk1-OndNwg7Wc5wVAJKlPWQJcHwioMFz0kn4zOXnbqGW
// import Paypal from '../utils/paypal';

class UserCart extends Component {
    state = {
      showSuccess: false,
    }

    componentDidMount(){
      this.props.getCartItems();
    }

    // shouldComponentUpdate (nextProps) {
    //   if (nextProps.cartLength !== this.props.cartLength) {
    //     return true;
    //   }
    //   return false;
    // }

    removeFromCart = (id) => {
      this.props.removeFromCart(id);
    }

    showNoItemMessage = () =>(
      <div className="cart_no_items">
        <FontAwesomeIcon icon={faFrown}/>
        <div>
          You have no items
        </div>
      </div>
    )

    render() {
      const { cartDetail, isCartEmpty, total } = this.props;
      return (
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            <CartProducts
              cartDetail={cartDetail}
              type="cart"
              removeItem={this.removeFromCart}
            />
            { !isCartEmpty ?
              <div>
                <div className="user_cart_sum">
                  <div>
                    Total amount: {`$${total}`}
                  </div>
                </div>
              </div>
              : null
            }          
            {this.state.showSuccess ?
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile}/>
                <div>
                    THANK YOU
                </div>
                <div>
                    YOUR ORDER IS NOW COMPLETE
                </div>
              </div>
              : null
            }
            { isCartEmpty ? this.showNoItemMessage() : null}
          </div>
          {!isCartEmpty ?
            <div className="paypal_button_container">
              {/* <Paypal
                  toPay={this.state.total}
                  transactionError={(data)=> this.transactionError(data)}
                  transactionCanceled={(data)=> this.transactionCanceled(data)}
                  onSuccess={(data)=> this.transactionSuccess(data)}
                /> */}
            </div>
            :null
          }

        </div>           
      );
    }

    transactionError = (data) => {
      alert('Paypal error');
    }

    transactionCanceled = () => {
      alert('Transaction canceled');
    }

    transactionSuccess = (data) => {
      // ! REWRITE TO REDUX
      // this.props.onSuccessBuy({
      //   cartDetail: this.props.user.cartDetail,
      //   paymentData: data
      // ! show the success smile (success buy true)
      // })
      // });
    }
}

export default connect(
  (state) => ({
    isCartEmpty: R.isEmpty(state.user.userData.cart),
    cartLength: state.user.userData.cart.length,
    cartDetail: state.user.cartDetail,
    total: calculateTotal(state)
  }),
  {
    // onSuccessBuy,
    removeFromCart,
    getCartItems,    
  }
)(UserCart);