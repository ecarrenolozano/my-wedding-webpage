"use client";

import { useEffect, useState } from "react";

import type { HomePageContent } from "@/types/site";

type CountdownTimerProps = {
  heroContent: HomePageContent["hero"];
  targetDate: string;
};

type CountdownParts = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdownParts(targetDate: string): CountdownParts {
  const now = new Date();
  const target = new Date(targetDate);

  if (target <= now) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();
  let seconds = target.getSeconds() - now.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    const previousMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += previousMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return {
    months: Math.max(0, years * 12 + months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };
}

export function CountdownTimer({
  heroContent,
  targetDate,
}: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdownParts(targetDate),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownParts(targetDate));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  const items = [
    {
      label: heroContent.monthsLabel,
      value: countdown.months,
    },
    {
      label: heroContent.daysLabel,
      value: countdown.days,
    },
    {
      label: heroContent.hoursLabel,
      value: countdown.hours,
    },
    {
      label: heroContent.minutesLabel,
      value: countdown.minutes,
    },
    {
      label: heroContent.secondsLabel,
      value: countdown.seconds,
    },
  ];

  return (
    <div className="mt-10">
      <p className="section-label text-[color:var(--color-accent)]">
        {heroContent.countdownLabel}
      </p>

      <div className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="min-w-0 rounded-[0.8rem] border border-[color:var(--color-accent)]/18 bg-[rgba(255,251,247,0.6)] px-1.5 py-2.5 text-center shadow-[0_8px_20px_rgba(140,103,78,0.05)] sm:rounded-[0.85rem] sm:px-3 sm:py-4"
          >
            <p className="text-[0.94rem] leading-none text-[color:var(--color-wine)] sm:text-[1.72rem]">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="mt-1.5 text-[0.45rem] leading-[1.12] tracking-[0.08em] text-[color:var(--color-accent)]/75 whitespace-normal break-words uppercase sm:meta-label sm:mt-2 sm:text-inherit">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
