import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type SelectedFilter = "Draft" | "Pending" | "Paid";

interface FirstSectionProps {
  onFilterChange: (filters: SelectedFilter[]) => void;
  onCreateChange: (isCreating: boolean) => void
}

export default function FirstSection({
  onFilterChange,
  onCreateChange,

}: FirstSectionProps) {
  const [arrow, setArrow] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [filters, setFilters] = useState<Record<SelectedFilter, boolean>>({
    Draft: false,
    Pending: false,
    Paid: false,
  });

  const handleArrow = () => setArrow(!arrow);

  const handleFilterChange = (status: SelectedFilter) => {
    setFilters((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const handleCreate = () => {
    const newIsCreating = !isCreating;
    setIsCreating(newIsCreating);
    onCreateChange(newIsCreating);
  };

  useEffect(() => {
    const activeFilters = Object.keys(filters).filter(
      (key) => filters[key as SelectedFilter]
    ) as SelectedFilter[];
    onFilterChange(activeFilters);
  }, [filters, onFilterChange]);

  return (
    <div className="flex items-start justify-between mt-[36px] px-[24px] gap-[85px] mb-[32px] md:px-[48px] md:mt-[61px] md:mb-[55px]">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-[24px] dark:text-[white] text-[#0C0E16] md:mt-[-10px] h-[22px] font-bold md:text-[36px]">
          Invoices
        </h1>
        {/* <p className="text-[13px] dark:text-[white] text-[#888EB0] mt-[0px] h-[15px] md:mt-[14px]">
          7 invoices
        </p> */}
      </div>
      <div className="flex gap-[19px] items-center">
        <div className="flex items-center gap-[12px] relative">
          <h4
            onClick={handleArrow}
            className="text-[15px] font-bold dark:text-[white] text-[#0C0E16] cursor-pointer  md:flex"
          >
            Filter <span className="hidden md:block md:pl-[4px]">by status</span>
          </h4>
          <div onClick={handleArrow}>
            {arrow ? (
              <IoIosArrowUp className="text-[#7C5DFA] mt-[3px] text-[20px]" />
            ) : (
              <IoIosArrowDown className="text-[#7C5DFA] mt-[3px] text-[20px]" />
            )}
          </div>
          {arrow && (
            <div className="absolute left-[-45px] top-[43px] flex flex-col justify-center gap-5 p-4 w-[200px] rounded-md shadow-filterModalLight dark:shadow-filterModalDark bg-white dark:bg-[#252945]">
              {(["Draft", "Pending", "Paid"] as SelectedFilter[]).map(
                (status) => (
                  <label key={status} className="container dark:text-white">
                    {status}
                    <input
                      type="checkbox"
                      checked={filters[status]}
                      onChange={() => handleFilterChange(status)}
                    />
                    <span className="checkmark"></span>
                  </label>
                )
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleCreate}
          className="bg-[#7C5DFA] w-[90px] h-[44px] rounded-[24px] flex md:w-[150px]  md:gap-[8px] md:flex md:pr-[17px] md:pl-[1px]  "
        >
          <div className="w-[32px] h-[32px] bg-white rounded-[16px] flex items-center justify-center mt-[6px] ml-[6px]">
            <FaPlus className="text-[#7C5DFA] " />
          </div>
          <p className="pl-[8px] pt-[10px] text-[15px] text-white  md:flex md:gap-[3px]">New <span className="hidden md:block">Invoice</span></p>
        </button>
      </div>
    </div>
  );
}
