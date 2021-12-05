import * as yup from 'yup'

const validationSchema = yup.object({
  text: yup
    .string()
    .max(255, 'Maximal length of a comment is 255 characters.')
    .required('Required field'),
});

export default validationSchema