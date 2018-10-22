import React from 'react';

import Loader from '../common/Loader';
import CardBlockShop from './CardBlockShop'; 

const LoadMore = (props) => {
  return (
    <React.Fragment>
      <div>
        <div>
          <CardBlockShop
            grid={props.grid}
            list={props.products}
          />
        </div>
        {
          props.size > 0 && props.size >= props.limit ?
            <div className="load_more_container">
              <span onClick={props.loadMore}>
              Load More
              </span>
            </div>
            :null
        }
      </div>
      {props.isLoading
        ?
        <Loader/>
        :
        null
      }
    </React.Fragment>
  );
};

export default LoadMore;