import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadMore from './LoadMore';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

import { getProductsToShop ,getBrands, getWoods } from '../../actions/products';

import { frets, price } from './fixedCategories';

import CollapseCheckbox from './CollapseCheckbox';
import CollapseRadio from './CollapseRadio';



class Shop extends Component {

  state = {
    grid:'',
    limit:6,
    skip:0,
    filters:{
      brand:[],
      frets:[],
      wood:[],
      price:[]
    }
  }

  componentDidMount(){
    getBrands();
    getWoods();

    getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    );
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for(let key in data){
      if(data[key]._id === parseInt(value,10)){
        array = data[key].array;
      }
    }
    return array;
  }


  handleFilters = (filters,category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;

    if(category === 'price'){
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters
    });
  }

  
  showFilteredResults = (filters) =>{
    this.props.getProductsToShop(
      0,
      this.state.limit,
      filters,
    );
    this.setSkip(0);
  }
    
  LoadMore = () => {
    let skip = this.state.skip + this.state.limit;
    
    this.props.getProductsToShop(
      skip,
      this.state.limit,
      this.state.filters,
      this.props.products.toShop,
    );
    this.setSkip(skip);
  }
      
  handleGrid= () =>{
    this.setState({
      grid: !this.state.grid ? 'grid_bars':''
    });
  }

  setSkip = (skip) => {
    this.setState({
      skip: skip
    });
  }     
      
  render() {
    const products = this.props.products;
    return (
      <div>
        <div className="page_top">
          <div className="container">
            Browse Products
          </div>
        </div>
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters)=> this.handleFilters(filters,'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={(filters)=> this.handleFilters(filters,'frets')}
              />
              <CollapseCheckbox
                initState={false}
                title="Wood"
                list={products.woods}
                handleFilters={(filters)=> this.handleFilters(filters,'wood')}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters)=> this.handleFilters(filters,'price')}
              />
                          
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid?'':'active'}`}
                    onClick={()=> this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh}/>
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid?'':'active'}`}
                    onClick={()=> this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars}/>
                  </div>
                </div>
              </div>
              <div style={{clear:'both'}}>
                <LoadMore
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={()=> this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

export default connect(
  ({products}) => ({
    products,
  }),
  {
    getBrands,
    getWoods,
    getProductsToShop,
  }
)(Shop);