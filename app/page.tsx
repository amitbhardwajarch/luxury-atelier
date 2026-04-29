"use client";
import { useState, useEffect, useRef } from "react";
// ... (previous imports)

export default function Home() {
  const [config, setConfig] = useState({ fabric: "#f3f4f6", room: "lobby" });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sound logic for luxury ambience
  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Replace with a soft ambient loop
        audioRef.current.volume = 0.05;
        audioRef.current.loop = true;
    }
    // audioRef.current.play(); // Optional: trigger on user interaction
  }, [config.room]);

  // ... (rest of the component)
}