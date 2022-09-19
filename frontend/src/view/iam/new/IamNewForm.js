import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import TagsFormItem from 'view/shared/form/items/TagsFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FormSchema from 'view/shared/form/formSchema';
import FormWrapper from 'view/shared/styles/FormWrapper';
import ButtonIcon from 'view/shared/ButtonIcon';

const { fields } = model;

const singleSchema = new FormSchema(fields.id, [
  fields.email,
  fields.firstName,
  fields.lastName,
  fields.phoneNumber,
  fields.avatarsIam,
  fields.rolesRequired,
]);

const multipleSchema = new FormSchema(fields.id, [
  fields.emails,
  fields.firstName,
  fields.lastName,
  fields.phoneNumber,
  fields.avatarsIam,
  fields.rolesRequired,
]);

class IamNewForm extends Component {
  schema = () => {
    return this.props.single
      ? singleSchema
      : multipleSchema;
  };

  handleSubmit = (values) => {
    const { id, ...data } = this.schema().cast(values);

    if (data.email) {
      data.emails = [data.email];
      delete data.email;
    }

    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    return this.schema().initialValues({});
  };

  isSingleEmail(form) {
    return (
      !form.values ||
      !form.values.emails ||
      form.values.emails.length <= 1
    );
  }

  render() {
    const { single, saveLoading } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.schema().initialValues()}
          validationSchema={this.schema().schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                {single ? (
                  <InputFormItem
                    name={fields.email.name}
                    label={fields.email.label}
                    required={fields.email.required}
                    autoFocus
                  />
                ) : (
                  <TagsFormItem
                    name={fields.emails.name}
                    label={fields.emails.label}
                    notFoundContent={i18n(
                      'iam.new.emailsHint',
                    )}
                    required={fields.emails.required}
                    autoFocus
                  />
                )}

                {this.isSingleEmail(form) && (
                  <React.Fragment>
                    <InputFormItem
                      name={fields.firstName.name}
                      label={fields.firstName.label}
                    />

                    <InputFormItem
                      name={fields.lastName.name}
                      label={fields.lastName.label}
                    />

                    <InputFormItem
                      name={fields.phoneNumber.name}
                      label={fields.phoneNumber.label}
                      prefix={'+'}
                    />

                    <ImagesFormItem
                      name={fields.avatarsIam.name}
                      label={fields.avatarsIam.label}
                      path={fields.avatarsIam.path}
                      schema={{
                        size: fields.avatarsIam.size,
                      }}
                      max={fields.avatarsIam.max}
                    />
                  </React.Fragment>
                )}

                <SelectFormItem
                  name={fields.rolesRequired.name}
                  label={fields.rolesRequired.label}
                  required={fields.rolesRequired.required}
                  options={fields.roles.options}
                  mode="multiple"
                />

                <div className="form-buttons">
                  <button
                    className="btn btn-primary"
                    disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    <ButtonIcon
                      loading={saveLoading}
                      iconClass="far fa-save"
                    />{' '}
                    {i18n('common.save')}
                  </button>

                  <button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    className="btn btn-light"
                    type="button"
                  >
                    <i className="fas fa-undo"></i>{' '}
                    {i18n('common.reset')}
                  </button>

                  {this.props.onCancel ? (
                    <button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      className="btn btn-light"
                      type="button"
                    >
                      <i className="fas fa-times"></i>{' '}
                      {i18n('common.cancel')}
                    </button>
                  ) : null}
                </div>
              </form>
            );
          }}
        />
      </FormWrapper>
    );
  }
}

export default IamNewForm;
