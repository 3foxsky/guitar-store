import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from './common/Loader';

import { uploadImage } from '../actions/products';

class Uplaod extends Component {
  state ={
    file: '',
  }

  handleSubmit = () => {
    this.props.uploadImage(this.state.file);
  }

  handleChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="container">
        <h2 className="text-teal-light">Add an image</h2>
        <input
          onChange={this.handleChange} 
          className="border-teal-light"
          type="file" 
          accept="image/*" 
        />
        <button 
          onClick={this.handleSubmit}
          className="bg-grey-dark hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow">
            upload
        </button>
        {isLoading
          ? <Loader />
          : null 
        }
      </div>
    );
  }
}

export default connect(
  ({products: {upload}}) => ({
    isLoading: upload.isLoading,

  }),
  {
    uploadImage
  }
)(Uplaod);
