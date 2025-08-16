// components/CurrentDate.tsx
"use client";
import { useState, useEffect } from "react";

export default function CurrentDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  return <span>{date}</span>;
}
