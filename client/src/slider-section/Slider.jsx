import React, { useState, useEffect } from "react";
import img from "../assets/Screenshot_4.png";
import img2 from "../assets/Screenshot_5.png";
import img3 from "../assets/Screenshot_6.png";
import img4 from "../assets/Screenshot_19.png";

const Slider = () => {
  const [count, setCount] = useState(0);
  const arr = [img, img2, img3, img4];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((count + 1) % arr.length);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, arr.length]);

  return (
    <section className="border-solid border-black shadow-lg h-[17em]">
      <img className="h-full w-full" src={arr[count]} alt="" />
    </section>
  );
};

export default Slider;
