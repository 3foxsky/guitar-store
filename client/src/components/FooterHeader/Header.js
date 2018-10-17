import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { userLogout } from '../../actions/user';

class Header extends Component {
  constructor(props) {
    super(props);
  
    this.state = { 
      pageYOffset: 0,
      page:[
        {
          name:'Home',
          linkTo:'/',
          public: true
        },
        {
          name:'Guitars',
          linkTo:'/shop',
          public: true
        }
      ],
      user:[
        {
          name:'My Cart',
          linkTo:'/user/cart',
          public: false
        },
        {
          name:'My Account',
          linkTo:'/user/dashboard',
          public: false
        },
        {
          name:'Log in',
          linkTo:'/register_login',
          public: true
        },
        {
          name:'Log out',
          linkTo:'/user/logout',
          public: false
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
    this.props.dispatch(userLogout()).then(response =>{
      if(response.payload.success){
        this.props.history.push('/');
      }
    });
  }


  cartLink = (item,i) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length:0}</span>
        <Link to={item.linkTo}>
          {item.name}
        </Link>
      </div>
    );
  }

  

  defaultLink = (item,i) => (
    item.name === 'Log out' ?
      <div className="log_out_link"
        key={i}
        onClick={()=> this.userLogout()}
      >
        {item.name}
      </div>
      :
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
  )


  showLinks = (type) =>{
    let list = [];

    if(this.props.user.userData){
      type.forEach((item)=>{
        if(!this.props.user.userData.isAuth){
          if(item.public === true){
            list.push(item);
          }
        } else{
          if(item.name !== 'Log in'){
            list.push(item);
          }
        }
      });
    }

    return list.map((item,i)=>{
      if(item.name !== 'My Cart'){
        return this.defaultLink(item,i);
      } else {
        return this.cartLink(item,i);
      }
          
    });
  }


  render() {
    const { pageYOffset, user } = this.state;
    return (
      <header className={'bck_b_light'}
        style={
          pageYOffset > 110 ? {
            background: 'black',
            position: 'fixed',  
          } : {
            position: 'static'
          }
        }
      >
        <div className="container justify-between">
          <Link to="/">
            <div className="logo">
              WAVES
            </div>
          </Link>
          <div className="top">
            {this.showLinks(user)}
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  ({user}) => ({
    user,
  })
)(withRouter(Header));