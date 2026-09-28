"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);
  };

  return (
    <label className="theme-switch" aria-label="Toggle dark mode">
      <input
        type="checkbox"
        role="switch"
        className="theme-switch__checkbox"
        checked={dark}
        onChange={toggle}
      />
      <span className="theme-switch__container" aria-hidden>
        <span className="theme-switch__clouds" />
        <span className="theme-switch__stars" />
        <span className="theme-switch__knob">
          <span className="theme-switch__spot" />
          <span className="theme-switch__spot" />
          <span className="theme-switch__spot" />
        </span>
      </span>
    </label>
  );
}
