import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function UserForm({ errors, touched, values }) {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email"/>
      </div>   
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password"/>
      </div>
      <Field component="select" name="occupation">
        <option value="software-engineer">Software Engineer</option>
        <option value="backend-enginer">Backend Engineer</option>
        <option value="frontend-engineer">Frontend Engineer</option>
      </Field>
      <Field type="checkbox" name="tos" checked={values.tos} />
      Accept TOS
      <button>Submit!</button>
    </Form>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ email, password, tos, occupation }) {
    return {
      email: email || "",
      password: password || "",
      tos: tos || false,
      occupation: occupation || "software-engineer"
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
  }),

  handleSubmit(values) {
    console.log(values);
  }
})(UserForm);

export default FormikUserForm;