import * as yup from 'yup'

const validationSchema = yup.object({
  email: yup
    .string('Please enter your email address')
    .email('Enter a valid email address')
    .required('Required field'),
  password: yup
    .string('Please enter your password')
    .min(8, 'The password must contain atleast 8 characters')
    .required('Required field'),
});

export default validationSchema