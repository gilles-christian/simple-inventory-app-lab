import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';
import Select from 'react-select';
import { i18n } from 'i18n';

class SelectFormItemNotFast extends Component {
  value = () => {
    const { mode } = this.props;
    if (mode === 'multiple') {
      return this.valueMultiple();
    } else {
      return this.valueOne();
    }
  };

  valueMultiple = () => {
    const { form, name, options } = this.props;

    if (form.values[name]) {
      return form.values[name].map((value) =>
        options.find((option) => option.value === value),
      );
    }

    return [];
  };

  valueOne = () => {
    const { form, name, options } = this.props;

    if (form.values[name]) {
      return options.find(
        (option) => option.value === form.values[name],
      );
    }

    return '';
  };

  handleSelect = (data) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);

    const { mode } = this.props;
    if (mode === 'multiple') {
      return this.handleSelectMultiple(data);
    } else {
      return this.handleSelectOne(data);
    }
  };

  handleSelectMultiple = (values) => {
    const { form, name } = this.props;

    if (!values) {
      form.setFieldValue(name, []);
      return;
    }

    form.setFieldValue(
      name,
      values
        .map((data) => (data ? data.value : undefined))
        .filter(Boolean),
    );
  };

  handleSelectOne = (data) => {
    const { form, name } = this.props;

    if (!data) {
      form.setFieldValue(name, undefined);
      return;
    }

    form.setFieldValue(name, data.value);
  };

  render() {
    const {
      label,
      name,
      form,
      hint,
      options,
      errorMessage,
      required,
      mode,
      placeholder,
      isClearable,
    } = this.props;

    const isInvalid = !!FormErrors.displayableError(
      form,
      name,
      errorMessage,
    );

    const controlStyles = isInvalid
      ? {
          control: (provided) => ({
            ...provided,
            borderColor: 'red',
          }),
        }
      : undefined;

    return (
      <div className="form-group">
        {!!label && (
          <label
            className={`col-form-label ${
              required ? 'required' : null
            }`}
          >
            {label}
          </label>
        )}

        <br />

        <Select
          className="w-100"
          value={this.value()}
          onChange={this.handleSelect}
          id={name}
          name={name}
          options={options}
          isMulti={mode === 'multiple'}
          placeholder={placeholder || ''}
          isClearable={isClearable}
          styles={controlStyles}
          loadingMessage={() =>
            i18n('autocomplete.loading')
          }
          noOptionsMessage={() =>
            i18n('autocomplete.noOptions')
          }
        />

        <div className="invalid-feedback">
          {FormErrors.displayableError(
            form,
            name,
            errorMessage,
          )}
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

SelectFormItemNotFast.defaultProps = {
  required: false,
  isClearable: true,
};

SelectFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
};

class SelectFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <SelectFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default SelectFormItem;
