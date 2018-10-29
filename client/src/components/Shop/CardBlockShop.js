import React from 'react';
import Card from '../common/Card';

const CardBlockShop = (props) => {

  const renderCards = () => (
    props.list ? 
      props.list.map(card=>(
        <Card
          {...card}
          key={card._id}
          grid={props.grid}
        />
      ))
      :null
  );

  return (
    <div className="card_block_shop flex flex-wrap justify-center pt-5 lg:pt-0">
      {props.list ?
        props.list.length === 0 ?
          <div className="no_result">
                Sorry, no results
          </div>
          :null
        :null}
      { renderCards(props.list)}
    </div>
  );
};

export default CardBlockShop;