import * as Yup from 'yup'

export const SignupvalidationSchema = Yup.object({
  name: Yup.string().required("name can't be empty"),
  email: Yup.string().required("email can't be empty").email("Invalid Email Format!"),
  password: Yup.string().required("password can't be empty"),
})