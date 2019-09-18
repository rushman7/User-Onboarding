import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import User from './User';
import * as Yup from "yup";
import axios from 'axios';

function UserForm({ errors, touched, values, isSubmitting, status }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      if (status) {
        setUsers(users => [...users, status]);
      } else {
      axios
        .get('https://reqres.in/api/users/')
        .then(response => {
          setUsers(response.data.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
      }
    }
    
    getUsers()
  }, [status])

  console.log(users)

  if (users.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Form>
        <div>
          {touched.first_name && errors.first_name && <p className="error">{errors.first_name}</p>}
          <Field type="first_name" name="first_name" placeholder="First Name"/>
        </div>  
        <div>
          {touched.last_name && errors.last_name && <p className="error">{errors.last_name}</p>}
          <Field type="last_name" name="last_name" placeholder="Last Name"/>
        </div>
        <div>
          {touched.email && errors.email && <p className="error">{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email"/>
        </div>   
        <div>
          {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
          <Field type="checkbox" name="tos" checked={values.tos} />
          Accept TOS <br />
        </div>
        <button type="submit" disabled={isSubmitting}>Submit!</button>
      </Form>
      {users.map((person, index) => <User key={index} user={person}/>)}
    </div>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ email, last_name, tos, first_name }) {
    return {
      first_name: first_name || "",
      email: email || "",
      last_name: last_name || "",
      tos: tos || false
    }
  },

  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    email: Yup.string().email("Email not valid").required("Email is required"),
    last_name: Yup.string().required("Last Name is required"),
    tos: Yup.boolean().oneOf([true], "Please accept the Terms of Service")
  }),

  handleSubmit(values, { setSubmitting, resetForm, setStatus }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log(res.data)
        setStatus(res.data);
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err)
        setSubmitting(false);
      });
  }
})(UserForm);

export default FormikUserForm;