import * as Yup from 'yup';

export const CreatevalidationSchema = Yup.object().shape({
  billForm: Yup.object().shape({
    streetAddress: Yup.string()
      .required('Street Address is required'),
    city: Yup.string()
      .required('City is required'),
    postCode: Yup.number()
      .required('Post Code is required')
      .positive('Post Code must be a positive number')
      .integer('Post Code must be an integer'),
    country: Yup.string()
      .required('Country is required'),
  }),
  billTo: Yup.object().shape({
    clientName: Yup.string()
      .required('Client Name is required'),
    clientEmail: Yup.string()
      .email('Invalid email format')
      .required('Client Email is required'),
    streetAddress: Yup.string()
      .required('Client Street Address is required'),
    city: Yup.string()
      .required('Client City is required'),
    postCode: Yup.number()
      .required('Client Post Code is required')
      .positive('Client Post Code must be a positive number')
      .integer('Client Post Code must be an integer'),
    country: Yup.string()
      .required('Client Country is required'),
    invoiceDate: Yup.date()
      .required('Invoice Date is required')
      .typeError('Invoice Date must be a valid date'),
    projectDescription: Yup.string()
      .required('Project Description is required'),
    paymentDue: Yup.date()
      .required('Payment Due Date is required')
      .typeError('Payment Due Date must be a valid date'),
  }),
  items: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Item name is required"),
      Qt: Yup.number().positive("Quantity must be positive").required("Quantity is required"),
      price: Yup.number().positive("Price must be positive").required("Price is required"),
      // total: Yup.number().positive("Total must be positive").required("Total is required"),
    })
  ).min(1, "At least one item is required"),

});
