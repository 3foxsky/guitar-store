import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Cart from './components/Cart';

const links = [
  {
    name: 'My account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User information',
    linkTo: '/user/profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  },
];

const admin = [
  {
    name: 'Site info',
    linkTo: '/admin/site_info'
  },
  {
    name: 'Add products',
    linkTo: '/admin/add_product'
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage_categories'
  }
];

const UserDashboard = ({ user, children, match }) => {
  const generateLinks = (links) => (
    links.map((i, idx)=>(
      <Link to={i.linkTo} key={idx}>
        {i.name}
      </Link>
    ))
  );
  
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">
            { generateLinks(links)}
          </div>
          { user.userData.isAdmin ?
            <div>
              <h2>Admin</h2>
              <div className="links">
                { generateLinks(admin)}
              </div>
            </div>
            :null
          }

        </div>
        <div className="user_right">
          {/*
          * CHILDREN START 
          */}
          <Route path={`${match.path}/dashboard`} render={() => <Dashboard user={user}/>} /> 
          <Route path={`${match.path}/profile`} component={Profile} /> 
          <Route path={`${match.path}/cart`} component={Cart} /> 
          {/* 
          * CHIDLREN END
           */}
        </div>
      </div>
    </div>     
  );
};

export default connect(
  ({user}) => ({
    user,
  })
)(UserDashboard);