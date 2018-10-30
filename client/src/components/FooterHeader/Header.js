import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/user';
import { getCartLenght } from '../../selectors';

class Header extends Component {
  constructor(props) {
    super(props);
  
    this.state = { 
      pageYOffset: 0,
      publicLinks:[
        {
          name: 'Shop',
          linkTo: '/shop',
          type: ''
        },
        {
          name:'Log in',
          linkTo:'/login',
          type: ''
        },
        {
          name:'Sing up',
          linkTo:'/register',
          type: ''
        },
      ],
      privateLinks:[
        {
          name:'My Cart',
          linkTo:'/user/cart',
          type: 'cartLink'
        },
        {
          name:'My Account',
          linkTo:'/user/dashboard',
          type: ''
        },
        {
          name: 'Shop',
          linkTo: '/shop',
          type: ''
        },
        {
          name:'Log out',
          linkTo:'/user/logout',
          type: 'logOut'
        },
      ]
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', () => {
      this.setState({
        pageYOffset: window.pageYOffset
      });
    }); 
  };

  handleLogout = () => {
    if (window.confirm('Are you sure, you want Logout?')) {
      this.props.logoutUser(this.props.history);
    }
  }

  renderPrivateLink = (i, idx) => {
    const { cartLength } = this.props;
    switch (i.type) {
    case 'cartLink':
      return (
        <div className="cart_link" key={idx}>
          <span>{cartLength || 0}</span>
          <Link to={i.linkTo}>
            {i.name}
          </Link>
        </div>
      );
    case 'logOut':
      return (
        <div className="log_out_link"
          key={idx}
          onClick={this.handleLogout}
        >
          {i.name}
        </div>
      );
    default:
      return (
        <Link to={i.linkTo} key={idx}>
          {i.name}
        </Link>
      );
    }
  }

  get renderLinks () {
    const { user } = this.props;
    const { privateLinks, publicLinks } = this.state;

    if (user.userData.isAuth) {
      return privateLinks.map((i, idx) => (
        this.renderPrivateLink(i, idx)
      ));
    } else {
      return publicLinks.map((i, idx) => (
        <Link to={i.linkTo} key={idx}>
          {i.name}
        </Link>
      ));
    }
  }

  render() {
    const { pageYOffset, user } = this.state;
    return (
      <header className={'bck_b_dark'}
        style={
          pageYOffset > 110 ? {
            background: 'black',
            position: 'fixed',  
          } : {
            position: 'static'
          }
        }
      >
        <div className="container justify-between px-4">
          <Link to="/">
            <div className="logo">
              Guitar Store
            </div>
          </Link>
          <div className="top flex items-center text-grey-darker">
            {this.renderLinks}
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    cartLength: getCartLenght(state),
  }),
  {
    logoutUser
  }
)(withRouter(Header));