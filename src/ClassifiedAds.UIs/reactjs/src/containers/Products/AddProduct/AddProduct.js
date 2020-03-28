import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class AddProduct extends Component {
  state = {
    title: "Add Product",
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    this.props.resetProduct();
    const id = this.props.match?.params?.id;
    if (id) {
      this.setState({ title: "Edit Product" });
      this.props.fetchProduct(id);
    }
  }

  fieldChanged = event => {
    const product = {
      ...this.props.product,
      [event.target.name]: event.target.value
    };
    this.props.updateProduct(product);
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    this.props.saveProduct(this.props.product);
  };

  render() {
    const form = (
      <div className="card">
        <div className="card-header">{this.state.title}</div>
        <div className="card-body">
          {this.state.errorMessage ? (
            <div
              className="row"
              hidden="!postError"
              className="alert alert-danger"
            >
              {this.state.errorMessage}
            </div>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  value={this.props.product?.name}
                  onChange={event => this.fieldChanged(event)}
                  required
                />
                <span className="invalid-feedback">Enter a name</span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="code" className="col-sm-2 col-form-label">
                Code
              </label>
              <div className="col-sm-10">
                <input
                  id="code"
                  name="code"
                  className="form-control"
                  value={this.props.product?.code}
                  onChange={event => this.fieldChanged(event)}
                  required
                />
                <span className="invalid-feedback">Enter a code</span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <input
                  id="description"
                  name="description"
                  className="form-control"
                  value={this.props.product?.description}
                  onChange={event => this.fieldChanged(event)}
                  required
                />
                <span className="invalid-feedback">Enter a description</span>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="description"
                className="col-sm-2 col-form-label"
              ></label>
              <div className="col-sm-10">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <NavLink
            className="btn btn-outline-secondary"
            to="/products"
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </NavLink>
        </div>
      </div>
    );

    return this.state.submitted && this.props.saved ? (
      <Redirect to={"/products/" + this.props.product.id} />
    ) : (
      form
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.product,
    saved: state.product.saved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: id => dispatch(actions.fetchProduct(id)),
    updateProduct: product => dispatch(actions.updateProduct(product)),
    resetProduct: () => dispatch(actions.resetProduct()),
    saveProduct: product => dispatch(actions.saveProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
