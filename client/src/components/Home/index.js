import React, { Component } from 'react';

import Slider from './Slider';
import Promotion from './Promotion';
import CardBlock from '../common/CardBlock';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../actions/products';

class Home extends Component {
  componentDidMount(){
    this.props.getProductsByArrival();
    this.props.getProductsBySell();
  }

  render() {
    const { bySell, byArrival } = this.props;
    return (
      <React.Fragment>
        <Slider/>
        <CardBlock
          list={bySell}
          title="Best Selling guitars"
        />
        <Promotion/>
        <CardBlock
          list={byArrival}
          title="New arrivals"
        />
      </React.Fragment>
    );
  }
}


export default connect(
  ({products}) => ({
    bySell: products.bySell,
    byArrival: products.byArrival,
  }),
  {
    getProductsByArrival,
    getProductsBySell,
  }
)(Home);