"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Field, FieldArray, useFormik, FormikProvider } from "formik";
import React from "react";
import { ImBin2 } from "react-icons/im";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { CreatevalidationSchema } from "../../utils/validation/creat.validationcshcema";

interface CreateProps {
  onBack: () => void;
}

const initialValue = {
  billForm: {
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  },
  billTo: {
    clientName: "",
    clientEmail: "",
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
    invoiceDate: "",
    projectDescription: "",
    paymentDue: "",
  },
  items: [
    {
      Qt: 0,
      price: 0,
      total: 0,
      name: "",
    },
  ],
};

export default function Create({ onBack }: CreateProps) {
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      const accessToken = getCookie("accessToken");
      console.log(values,"valuess es ari")
      try {
        const response = await axios.post(
          "http://localhost:3001/invoice",
          values,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Invoice created:", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema: CreatevalidationSchema,
  });


  // console.log(formik.values.items, "current");

  const { handleBlur, handleChange, handleSubmit, values, errors } = formik;

  return (
    <>
    <div className="absolute flex flex-col backdrop-blur-md- md:bg-gray-500 md:bg-opacity-[0.8] w-full overflow-y-scroll  z-20 ">
      <div className="flex flex-col w-fit justify-center px-[6%] bg-white dark:bg-[#141625] md:p-[0] md:w-[616px] lg:ml-[72px]">
        <p
          onClick={onBack}
          className="flex items-center w-full text-start mt-[33px] dark:text-white md:px-[6%]"
        >
          <span className="mr-[24px]">
            <MdKeyboardArrowLeft className="text-[#7C5DFA] text-[22px]" />
          </span>
          Go Back
        </p>
        <p className="mt-[26px] mb-[22px] text-[24px] font-bold dark:text-white text-[#0C0E16] md:px-[6%]">
          New Invoice
        </p>
        <form className="md:overflow-y-auto md:max-h-[150vh] scrollbar scrollbar-thumb-purple-600  md:px-[6%] " onSubmit={handleSubmit}>
          <p className="text-[15px] text-[#7C5DFA] font-bold">Bill From</p>
          <div>
            <div className="flex flex-col gap-[9px]">
              <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                Street Address
              </p>
              <input
                name="billForm.streetAddress"
                type="text"
                value={values.billForm.streetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
              />
              {errors.billForm?.streetAddress && (
                <p className="text-red-500">{errors.billForm.streetAddress}</p>
              )}
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-[23px]">
                <div className="flex flex-col gap-[9px]">
                  <p className="text-[13px] text-[#7E88C3] font-medium mt-[25px]">
                    City
                  </p>
                  <input
                    name="billForm.city"
                    type="text"
                    value={values.billForm.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                  />
                  {errors.billForm?.city && (
                    <p className="text-red-500">{errors.billForm.city}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[9px]">
                  <p className="text-[13px] text-[#7E88C3] font-medium mt-[25px]">
                    Post Code
                  </p>
                  <input
                    name="billForm.postCode"
                    type="text"
                    value={values.billForm.postCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                  />
                  {errors.billForm?.postCode && (
                    <p className="text-red-500">{errors.billForm.postCode}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[9px]">
                <p className="text-[13px] text-[#7E88C3] font-medium">
                  Country
                </p>
                <input
                  name="billForm.country"
                  type="text"
                  value={values.billForm.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                />
                {errors.billForm?.streetAddress && (
                  <p className="text-red-500">
                    {errors.billForm.streetAddress}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="flex flex-col mt-[41px]">
            <p className="text-[15px] text-[#7C5DFA] font-bold">Bill To</p>
            <div className="flex flex-col gap-[9px]">
              <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                Client’s Name
              </p>
              <input
                name="billTo.clientName"
                type="text"
                value={values.billTo.clientName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
              />
              {errors.billTo?.clientName && (
                <p className="text-red-500">{errors.billTo.clientName}</p>
              )}
            </div>
            <div className="flex flex-col gap-[9px]">
              <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                Clients Email
              </p>
              <input
                name="billTo.clientEmail"
                type="email"
                value={values.billTo.clientEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
              />
              {errors.billTo?.clientEmail && (
                <p className="text-red-500">{errors.billTo.clientEmail}</p>
              )}
            </div>
            <div className="flex flex-col gap-[9px]">
              <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                Street Address
              </p>
              <input
                name="billTo.streetAddress"
                type="text"
                value={values.billTo.streetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
              />
              {errors.billTo?.streetAddress && (
                <p className="text-red-500">{errors.billTo.streetAddress}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-[23px]">
                <div className="flex flex-col gap-[9px]">
                  <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                    City
                  </p>
                  <input
                    name="billTo.city"
                    type="text"
                    value={values.billTo.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                  />
                  {errors.billTo?.city && (
                    <p className="text-red-500">{errors.billTo.city}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[9px]">
                  <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                    Post Code
                  </p>
                  <input
                    name="billTo.postCode"
                    type="number"
                    value={values.billTo.postCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                  />
                  {errors.billTo?.postCode && (
                    <p className="text-red-500">{errors.billTo.postCode}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[9px]">
                <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                  Country
                </p>
                <input
                  name="billTo.country"
                  type="text"
                  value={values.billTo.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                />
                {errors.billTo?.country && (
                  <p className="text-red-500">{errors.billTo.country}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="flex flex-col gap-[9px]">
                  <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                    Invoice Date
                  </p>
                  <input
                    name="billTo.invoiceDate"
                    type="date"
                    value={values.billTo.invoiceDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                  />
                  {errors.billTo?.invoiceDate && (
                    <p className="text-red-500">{errors.billTo.invoiceDate}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[9px]">
                  <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                    Payment Terms
                  </p>
                  {/* ჩასასწორებელია ტიპი */}
                  <input
                    name="billTo.paymentDue"
                    type="text"
                    value={values.billTo.paymentDue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                  />
                  {errors.billTo?.paymentDue && (
                    <p className="text-red-500">{errors.billTo.paymentDue}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[9px]">
                <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                  Project Description
                </p>
                <input
                  name="billTo.projectDescription"
                  type="text"
                  value={values.billTo.projectDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                />
                {errors.billTo?.projectDescription && (
                  <p className="text-red-500">
                    {errors.billTo.projectDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="text-[#777F98] text-[18px] font-bold mb-[22px] mt-[69px]">
            Item List
          </p>
          <div className="flex flex-col ">
            <FormikProvider value={formik}>
              <div className="flex flex-col">
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <>
                      {values.items.map((item, index) => (
                         <div
                         key={index}
                           className="flex flex-col gap-4 mb-4 border-gray-300 pb-4"
                         >
                           <div className="flex flex-col gap-[9px]">
                             <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                               Item Name
                             </p>
                             <Field
                              //  type="text"
                               name={`items.${index}.name`}
                               placeholder="Enter item name..."
                               className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                             />
                           </div>
                           <div className="flex gap-[16px] items-center">
                             <div className="flex flex-col gap-[9px] w-[64px]">
                               <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                                 Qty.
                               </p>
                               <Field
                                 type="number"
                                 name={`items.${index}.Qt`}
                                 className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                               />
                             </div>
                             <div className="flex flex-col gap-[9px] w-[31%]">
                               <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                                 Price
                               </p>
                               <Field
                                 type="number"
                                 name={`items.${index}.price`}
                                 placeholder="Enter price"
                                 className="w-[100%] h-[48px] pl-[20px] rounded-[4px] border-[1px] border-[#DFE3FA] border-solid bg-white dark:bg-[#1E2139] dark:border-[#252945] dark:text-[white]"
                               />
                             </div>
                             <div className="flex flex-col gap-[9px]">
                               <p className="text-[13px] text-[#7E88C3] font-medium mt-[24px]">
                                 Total
                               </p>
                               <div className="flex gap-[64px]">
                                 <p  className="text-[#888EB0] text-[15px] font-bold">
                                   ${item.Qt * item.price}
                                 </p>
                                 {formik.values.items.length > 1 && (
                                   <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                   <ImBin2 className="text-[16px] text-[#888EB0] cursor-pointer" />
                                 </button>
                                 )}
                               </div>
                             </div>
                           </div>
                           {formik.errors.items?.[index] && (
                             <div className="text-red-500 text-sm">
                               {Object.values(formik.errors.items[index] || {}).join(', ')}
                             </div>
                           )}
                         </div>
                      ))}
                      <button
                      className="w-full h-[48px] bg-gray-200 dark:bg-[#252945] text-[#888EB0] text-[15px] font-bold rounded-[24px] mt-[48px] mb-[88px]"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            Qt: 0,
                            price: 0,
                            total: 0,
                          })
                        }
                      >
                        Add Item
                      </button>
                    </>
                  )}
                />
              </div>
            </FormikProvider>
          </div>
        </form>
      </div>
      <div className="w-full  flex justify-end gap-[7px] bg-white py-[22px] px-[24px] dark:bg-[#1E2139] md:w-[616px]  md:bottom-0 md:z-10  lg:ml-[72px]">
        <button
          onClick={onBack}
          className="w-[96px] h-[48px] bg-[#F9FAFE] rounded-[24px] text-[#7E88C3] text-[15px] font-bold dark:bg-[#252945]"
        >
          Discard
        </button>
        <div className="flex gap-[7px]">
          <button
            onClick={() => {
              formik.setFieldValue("status", "Draft");
              formik.submitForm();
            }}
            className="w-[117px] h-[48px] bg-[#373B53]  rounded-[24px] text-white font-bold text-[15px]"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            onClick={() => {
              formik.setFieldValue("status", "Pending");
              formik.submitForm();
            }}
            className="w-[112px] h-[48px] bg-[#7C5DFA] rounded-[24px] text-white font-bold text-[15px]"
          >
            Save & Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
