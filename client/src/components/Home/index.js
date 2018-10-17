import React, { Component } from 'react';

class HomeContainer extends Component {
  render() {
    return (
      <div>
        {Array(15).fill(1).map((i, idx)=> (
          <div
            key={idx}
            style={{
              height: '200px',
              background: 'lightgrey'
            }}
          >DIV</div>
        ))}
      </div>
    );
  }
}

export default HomeContainer;
