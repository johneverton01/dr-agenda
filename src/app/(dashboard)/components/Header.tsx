"use client";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex  items-center justify-between p-4 text-white">
      <Image src="logo.svg" alt="Dr. agenda" width={136} height={30} />
    </header>
  );
}