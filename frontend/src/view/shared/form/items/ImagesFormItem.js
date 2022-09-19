import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImagesUploader from 'view/shared/uploaders/ImagesUploader';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class ImagesFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      path,
      schema,
      max,
      inputProps,
      required,
    } = this.props;

    return (
      <div className="form-group">
        {!!label && (
          <label
            className={`col-form-label ${
              required ? 'required' : null
            }`}
            htmlFor={name}
          >
            {label}
          </label>
        )}

        <br />

        <ImagesUploader
          path={path}
          schema={schema}
          value={form.values[name]}
          onChange={(value) => {
            form.setFieldValue(name, value);
            form.setFieldTouched(name);
          }}
          max={max}
          {...inputProps}
        />

        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name)}
        </div>
        {!!hint && (
          <small className="form-text text-muted">
            {hint}
          </small>
        )}
      </div>
    );
  }
}

ImagesFormItemNotFast.defaultProps = {
  max: undefined,
  required: false,
};

ImagesFormItemNotFast.propTypes = {
  path: PropTypes.string.isRequired,
  schema: PropTypes.object,

  required: PropTypes.bool,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class ImagesFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <ImagesFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default ImagesFormItem;
