import * as yup from 'yup'

const validationSchema = yup.object({
  text: yup
    .string()
    .required('Required field'),
});

export default validationSchema