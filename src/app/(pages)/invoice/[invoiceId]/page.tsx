"use client";
import Header from "@/app/components/header/Header";
import Update from "@/app/components/updateInput/update";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
interface InvoiceItem {
  name: string;
  Qt: number;
  price: number;
}
interface BillForm {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
}


interface BillTo {
  clientName: string;
  clientEmail: string;
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  invoiceDate: string;
  projectDescription: string;
  paymentDue: string;
}
interface InvoiceData {
  _id: string;
  status: string;
  billForm: BillForm;
  billTo: BillTo;
  items: InvoiceItem[];
}

export default function Invoice({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      setInvoiceId(unwrappedParams.invoiceId);
    };
    fetchParams();
  }, [params]);

  const moreAboutInvoice = async (id: string | number) => {
    const token = getCookie("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:3001/invoice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvoiceData(res.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  const DeleteInvoice = async (id: string | null) => {
    const token = getCookie("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:3001/invoice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setInvoiceData(null);
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleUpdate = (update: boolean) => {
    setUpdate(update);
  };

  useEffect(() => {
    if (invoiceId) {
      moreAboutInvoice(invoiceId);
    }
  }, [invoiceId]);

  const goBack = () => {
    router.push("/");
  };

  const total = invoiceData?.items.reduce((sum, item) => {
    return sum + item.price * item.Qt;
  }, 0);

  const sendStatusChangeRequest = async (id: string | null) => {
    const token = getCookie("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:3001/invoice/${id}`,
        {
          status: "Paid",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <div className="flex  flex-col lg:flex-row lg:gap-[25%]">
        <Header />
        {update && (
          <Update
            invoiceId={invoiceId}
            invoiceData={invoiceData}
            onBack={() => handleUpdate(false)}
          />
        )}
        <div className="flex flex-col items-center px-[24px] md:px-[48px]">
          <p
            onClick={goBack}
            className="flex items-center w-full text-start mt-[33px] mb-[31px] dark:text-white"
          >
            <span className="mr-[24px]">
              <MdKeyboardArrowLeft className="text-[#7C5DFA] text-[22px]" />
            </span>
            Go Back
          </p>
          {invoiceData ? (
            <>
              <div className=" md:flex md:items-center md:justify-between bg-white dark:bg-[#1E2139] p-[24px] rounded-[8px] shadow-lg shadow-[rgba(72, 84, 159, 0.10)]  md:p-[32px] md:w-full ">
                <div className="flex items-center justify-between gap-[140px] md:justify-start md:gap-[20px] ">
                  <p className="dark:text-white">Status</p>
                  <button
                    className={`w-[104px] h-[40px] flex items-center gap-[8px] justify-center rounded-[6px]   ${
                      invoiceData.status === "paid" ||
                      invoiceData.status === "Paid"
                        ? "bg-[#f5fdfa] text-[#33D69F]"
                        : invoiceData.status === "panding" ||
                          invoiceData.status === "Pending"
                        ? "bg-[#fef8f1]  text-[#FF8F00]"
                        : "bg-[#f4f4f5] text-[#373B53]"
                    }`}
                  >
                    <div
                      className={`w-[8px] h-[8px] rounded-[4px] ${
                        invoiceData.status === "paid" ||
                        invoiceData.status === "Paid"
                          ? "bg-green-500"
                          : invoiceData.status === "Pending"
                          ? "bg-[#FF8F00]"
                          : "bg-[#373B53]"
                      }`}
                    ></div>
                    {invoiceData.status}
                  </button>
                </div>
                <div className="hidden  md:gap-[8px] md:flex md:justify-between ">
                  <button
                    className="bg-[#F9FAFE] w-[73px] rounded-[24px] h-[48px] text-[#7E88C3] font-bold text-[15px] dark:bg-[#252945] dark:text-[#DFE3FA]"
                    onClick={() => handleUpdate(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#EC5757] w-[89px] rounded-[24px] h-[48px] text-[white] font-bold text-[15px]"
                    onClick={() => DeleteInvoice(invoiceId)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => sendStatusChangeRequest(invoiceId)}
                    className="bg-[#7C5DFA] w-[149px] rounded-[24px] h-[48px] text-[white] font-bold text-[15px]"
                  >
                    Mark as Paid
                  </button>
                </div>
              </div>

              <div className="w-[334px] mt-[16px] bg-white dark:bg-[#1E2139] p-[24px] rounded-[8px] shadow-lg flex flex-col md:w-full md:p-[32px] md:mb-[130px]">
                <div className="flex flex-col gap-[30px] md:flex-row md:justify-between ">
                  <div>
                    <p className="text-[#0C0E16] dark:text-white text-15px font-bold ">
                      <span className="text-[#7E88C3] md:text-start ">#</span>
                      {invoiceData._id.substring(0, 6)}
                    </p>
                    <p className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]font-medium">
                      {invoiceData.billTo.projectDescription}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA] md:text-end">
                      {invoiceData.billForm.streetAddress}
                    </p>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA] md:text-end">
                      {invoiceData.billForm.city}
                    </p>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA] md:text-end">
                      {invoiceData.billForm.postCode}
                    </p>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA] md:text-end">
                      {invoiceData.billForm.streetAddress}
                    </p>
                  </div>
                </div>
                <div className="mt-[31px] flex gap-[62px] flex-wrap md:gap-[119px]">
                  {/* რესფონსზე ეს გაატრაკებს  */}
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-[13px] mb-[31px]">
                      <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                        Invoice Date
                      </p>
                      <p className="text-[#0C0E16] dark:text-white text-15px font-bold ">
                        {invoiceData.billTo.invoiceDate}
                      </p>
                    </div>
                    <div className="flex flex-col gap-[13px]">
                      <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                        Payment Due
                      </p>
                      <p className="text-[#0C0E16] dark:text-white text-15px font-bold ">
                        {invoiceData.billTo.paymentDue}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[13px] mb-[7px]">
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                      Bill To
                    </p>
                    <p className="text-[#0C0E16] dark:text-white text-15px font-bold ">
                      {invoiceData.billTo.clientName}
                    </p>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                      {invoiceData.billTo.streetAddress}
                    </p>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                      {invoiceData.billTo.city}
                    </p>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                      {invoiceData.billTo.postCode}
                    </p>
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                      {invoiceData.billTo.streetAddress}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[13px]">
                    <p className="text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
                      Sent TO
                    </p>
                    <p className="text-[#0C0E16] dark:text-white text-15px font-bold  ">
                      {invoiceData.billTo.clientEmail}
                    </p>
                  </div>
                </div>
                <table className="bg-[#F9FAFE] px-[32px] dark:bg-[#252945] dark:text-white mt-[47px] hidden md:table rounded-tl-[8px] rounded-tr-[8px]">
                  <thead>
                    <tr>
                      <th className="text-start pl-[32px] mb-[32px] pt-[33px]">
                        Item Name
                      </th>
                      <th className="pb-[32px] pt-[33px]">QTY.</th>
                      <th className="pb-[32px] pt-[33px]">Price</th>
                      <th className="pb-[32px] pt-[33px]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, index) => (
                      <tr key={index}>
                        <td className="text-start pl-[32px] pb-[32px]">
                          {item.name}
                        </td>
                        <td className="text-center pb-[32px]">{item.Qt}</td>
                        <td className="text-center pb-[32px]">${item.price}</td>
                        <td className="text-center pb-[32px]">
                          ${item.Qt * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col bg-[#F9FAFE] dark:bg-[#252945] mt-[38px] md:hidden p-[25px] rounded-tl-[8px] rounded-tr-[8px]">
                  {invoiceData.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex flex-col ">
                        <p className="text-[15px] font-bold dark:text-white">
                          {item.name}
                        </p>
                        <div className="flex gap-[4px] items-center">
                          <p className="text-[#888EB0]">{item.Qt}</p>
                          <p className="text-[#888EB0]">x</p>
                          <p className="text-[#888EB0]">${item.price}</p>
                        </div>
                      </div>
                      <p className="text-[15px] font-bold dark:text-white">
                        ${item.Qt * item.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-[#373B53] p-[32px] flex items-center justify-between dark:bg-[#0C0E16]">
                  <p className="text-white">Amount Due</p>
                  <p className="text-white">${total}</p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="w-full mt-[56px] flex justify-center items-center bg-white py-[22px] gap-[8px] dark:bg-[#1E2139] md:hidden">
          <button
            className="bg-[#F9FAFE] w-[73px] rounded-[24px] h-[48px] text-[#7E88C3] font-bold text-[15px] dark:bg-[#252945] dark:text-[#DFE3FA]"
            onClick={() => handleUpdate(true)}
          >
            Edit
          </button>
          <button
            className="bg-[#EC5757] w-[89px] rounded-[24px] h-[48px] text-[white] font-bold text-[15px]"
            onClick={() => DeleteInvoice(invoiceId)}
          >
            Delete
          </button>
          <button
            onClick={() => sendStatusChangeRequest(invoiceId)}
            className="bg-[#7C5DFA] w-[149px] rounded-[24px] h-[48px] text-[white] font-bold text-[15px]"
          >
            Mark as Paid
          </button>
        </div>
      </div>
    </>
  );
}
