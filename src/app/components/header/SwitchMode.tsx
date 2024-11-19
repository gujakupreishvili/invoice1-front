import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

const SwitchMode = () => {
  const [isDark, setIsDark] = useState(false);

  const handleMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    } else {
      document.body.classList.remove("dark");
      setIsDark(false);
    }
  }, [isDark]);
  return (
    <div onClick={handleMode}>
      {isDark ? (
        <IoMdSunny className="text-[19px] text-[#858BB2]" />
      ) : (
        <FaMoon className="text-[19px] text-[#7E88C3]" />
      )}
    </div>
  );
};

export default SwitchMode;
