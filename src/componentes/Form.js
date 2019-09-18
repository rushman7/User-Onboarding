import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

function UserForm({ errors, touched, values, isSubmitting }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      axios
        .get('https://reqres.in/api/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getUsers()
  }, [])


  return (
    <Form>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="name" name="name" placeholder="Name"/>
      </div>  
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email"/>
      </div>   
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password"/>
      </div>
      <Field type="checkbox" name="tos" checked={values.tos} />
      Accept TOS <br />
      <button type="submit" disabled={isSubmitting}>Submit!</button>
    </Form>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ email, password, tos, name }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    tos: Yup.boolean().isValid(true, "Please accept the Terms of Service")
  }),

  handleSubmit(values, { setSubmitting, resetForm }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log(res)
        resetForm();
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err)
        setSubmitting(false);
      });
  }
})(UserForm);

export default FormikUserForm;