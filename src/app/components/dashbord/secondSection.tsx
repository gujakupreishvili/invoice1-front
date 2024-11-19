import axios from "axios";
import { getCookie } from "cookies-next";
import React, { ReactNode, useEffect, useState } from "react";
import empty from "../../../../public/assets/empty.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

interface InvoiceItem {
  price: number;
  Qt: number;
}
interface BillTo {
  invoiceDate: ReactNode;
  clientName: ReactNode;
}
interface Invoice {
  billTo: BillTo;
  _id: string;
  date: string;
  status: string;
  items: InvoiceItem[]
}
interface SecondSectionProps {
  selectedFilters: string[];
}



export default function SecondSection({ selectedFilters }: SecondSectionProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const router = useRouter();

  async function fetchCurrentUser() {
    const token = getCookie("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const res = await axios.get("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Current user data with invoices:", res.data);
      setInvoices(res.data.Invoice || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    fetchCurrentUser();
    
  }, []);
  
  const filteredInvoices = invoices.filter(
    (invoice: Invoice) =>
      selectedFilters.length === 0 || selectedFilters.includes(invoice.status)
  );
  const handleInvoiceKlick = (invoiceId: string) => {
    router.push(`invoice/${invoiceId}`);
  };

 

  return (
    <div>
      {filteredInvoices.length > 0 ? (
        <div className=" ">
          {filteredInvoices.map((invoice) => {
            const total: number = invoice.items.reduce((sum: number, item: InvoiceItem) => {
              return sum + item.price * item.Qt;
            }, 0);

            return (
              <div
                onClick={() => handleInvoiceKlick(invoice._id)}
                key={invoice._id}
                className="px-[24px] py-[25px] pb-[22px] mx-[24px] mt-[16px] flex flex-col dark:bg-[#1E2139] bg-white rounded-[8px] shadow-lg shadow-[rgba(72, 84, 159, 0.10)] md:px-[42px] md:ml-[42px] md:mr-[42px] cursor-pointer"
              >
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col md:flex-row md:gap-[28px]">
                    <p className="dark:text-white w-[59px]">
                      #{invoice._id.substring(0, 6)}
                    </p>
                    <p className="dark:text-white mt-[24px] md:mt-[0px]">
                      Due {invoice.billTo.invoiceDate}
                    </p>
                    <p className="dark:text-white">${total.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-[28px]">
                    <p className="text-end dark:text-white">
                      {invoice.billTo.clientName}
                    </p>
                    <div className="flex items-center gap-[20px]">
                      <button
                        className={`w-[104px] h-[40px] flex items-center gap-[8px] justify-center rounded-[6px] mt-[27px] md:mt-[0px] ${
                          invoice.status === "paid" || invoice.status === "Paid"
                            ? "bg-[#f5fdfa] text-[#33D69F]"
                            : invoice.status === "pending" ||
                              invoice.status === "Pending"
                            ? "bg-[#fef8f1] text-[#FF8F00]"
                            : "bg-[#f4f4f5] text-[#373B53]"
                        }`}
                      >
                        <div
                          className={`w-[8px] h-[8px] rounded-[4px] ${
                            invoice.status === "paid" ||
                            invoice.status === "Paid"
                              ? "bg-green-500"
                              : invoice.status === "pending" ||
                                invoice.status === "Pending"
                              ? "bg-[#FF8F00]"
                              : "bg-[#373B53]"
                          }`}
                        ></div>
                        {invoice.status}
                      </button>
                      <IoIosArrowForward className="hidden md:block text-[#7C5DFA]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-screen mt-[-200px]">
            <Image src={empty} alt="" />
            <h2 className="mt-[42] mb-[23px] text-[24px] font-bold dark:text-white">
              There is nothing here
            </h2>
            <p className="text-center w-[236px] text-[13px] text-[#888EB0] font-bold dark:text-[3DFE3FA]">
              Create an invoice by clicking the New button and get started
            </p>
          </div>
        </>
      )}
    </div>
  );
}
