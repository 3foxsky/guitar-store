import React from 'react';
import moment from 'moment';

import Button from '../../common/Button'; 


const Dashboard = ({user}) => {

  const renderBlocks = (products) => (
    products ?
      products.map((p, idx)=>(
        <tr key={idx}>
          <td>{moment(p.dateOfPurchase).format('MM-DD-YYYY')}</td>
          <td>{p.brand} {p.name}</td>
          <td>$ {p.price}</td>
          <td>{p.quantity}</td>
        </tr>
      ))
      :null
  );

  return (
    <div>           
      <div className="user_nfo_panel">
        <h1>User information</h1>
        <div>
          <span>{user.userData.name}</span>
          <span>{user.userData.lastname}</span>
          <span>{user.userData.email}</span>
        </div>
        <Button
          type="default"
          title="Edit account info"
          linkTo="/user/profile"
        />
      </div>
      {
        user.userData.history.length ?
          <div className="user_nfo_panel">
            <h1>History purchases</h1>
            <div className="user_product_block_wrapper">
              <div className="history_blocks">
                <table>
                  <thead>
                    <tr>
                      <th>Date of purchase</th>
                      <th>Product</th>
                      <th>Price paid</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderBlocks(user.userData.history)}
                  </tbody>
                </table>
              </div>
            </div>            
          </div>
          :null
      }        
    </div>
  );
};

export default Dashboard;
