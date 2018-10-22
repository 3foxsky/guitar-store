import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProdInfo from './ProdInfo';
import ProdImg from './ProdImg';

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


  addToCartHandler(id){
    this.props.dispatch(addToCart(id));
  }
    
  render() {
    return (
      <div>
        <div className="page_top">
          <div className="container">
            Product Detail
          </div>
        </div>
        <div className="container">
          {
            this.props.products.prodDetail ?
              <div className="product_detail_wrapper">
                <div className="left">
                  <div style={{width:'500px'}}>
                    <ProdImg
                      detail={this.props.products.prodDetail}
                    />
                  </div>
                </div>
                <div className="right">
                  <ProdInfo
                    addToCart={(id)=> this.addToCartHandler(id)}
                    detail={this.props.products.prodDetail}
                  />
                </div>
              </div>
              : 'Loading'
          }

        </div>                
      </div>
    );
  }
}

export default connect(
  ({products}) => ({
    products,
  })
)(ProductPage);