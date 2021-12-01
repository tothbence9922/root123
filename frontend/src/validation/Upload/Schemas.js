import * as yup from 'yup'

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required field'),
});

export default validationSchema