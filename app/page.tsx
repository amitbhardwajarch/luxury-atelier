"use client";
import { useState, Suspense } from "react";
import Experience from "../components/Experience";
import Overlay from "../components/Overlay";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const [config, setConfig] = useState({ fabric: "#d4d4d8", room: "city" });
  const [price, setPrice] = useState(8400);

  return (
    <main className="h-screen w-full bg-[#050505] overflow-hidden">
      <LoadingScreen />
      <Suspense fallback={null}>
        <Experience config={config} />
      </Suspense>
      <Overlay config={config} setConfig={setConfig} price={price} />
    </main>
  );
}