import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProdInfo from './ProdInfo';
import ProdImg from './ProdImg';
import Loader from '../common/Loader';

import { addToCart } from '../../actions/user';
import { getProductDetail, clearProductDetail } from '../../actions/products';

class ProductPage extends Component {

  componentDidMount(){
    const { products, history, match } = this.props;
    const id = match.params.id;
    this.props.dispatch(getProductDetail(id, history));
  }

  componentWillUnmount(){
    this.props.dispatch(clearProductDetail());
  }


  addToCartHandler = (id) => {
    this.props.dispatch(addToCart(id));
  }
    
  render() {
    const { match, products, user, history } = this.props;
    return (
      <div className="px-5 lg:px-0">
        <div className="page_top">
          <div className="container">
            Product Detail
          </div>
        </div>
        <div className="container">
          {
            products.prodDetail ?
              <div className="product_detail_wrapper flex-col lg:flex-row">
                <div className="left w-full">
                  <ProdImg
                    detail={products.prodDetail}
                  />
                </div>
                <div className="right">
                  <ProdInfo
                    addToCart={ user.userData.isAuth ?
                      ()=> this.addToCartHandler(match.params.id)
                      :
                      () => { history.push('/login'); }
                    }
                    detail={products.prodDetail}
                  />
                </div>
              </div>
              : <Loader/>
          }

        </div>                
      </div>
    );
  }
}

export default connect(
  ({products, user}) => ({
    products,
    user,
  }),
)(ProductPage);