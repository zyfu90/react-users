import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {addUser} from '../actions';
class AddUser extends React.Component {
  renderInput = ({input, label, meta}) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  renderError({error, touched}) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onSubmit = (formValues) => {
    const userId = require('crypto').randomBytes(10).toString('hex');
    this.props.addUser({...formValues, id: userId});
  };

  render() {
    return (
      <div className="ui segment">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="name" label="Name" component={this.renderInput} />
          <Field
            name="location"
            label="Location"
            component={this.renderInput}
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) errors.name = 'Name cannot be empty';
  if (!formValues.location) errors.location = 'Location cannot be empty';
  return errors;
};

const formWrapped = reduxForm({
  form: 'AddUser',
  validate: validate,
})(AddUser);

export default connect(null, {addUser})(formWrapped);