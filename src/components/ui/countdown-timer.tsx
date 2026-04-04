"use client";

import { useEffect, useState } from "react";

import type { Dictionary } from "@/types/site";

type CountdownTimerProps = {
  dictionary: Dictionary;
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
  dictionary,
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
      label: dictionary.hero.monthsLabel,
      value: countdown.months,
    },
    {
      label: dictionary.hero.daysLabel,
      value: countdown.days,
    },
    {
      label: dictionary.hero.hoursLabel,
      value: countdown.hours,
    },
    {
      label: dictionary.hero.minutesLabel,
      value: countdown.minutes,
    },
    {
      label: dictionary.hero.secondsLabel,
      value: countdown.seconds,
    },
  ];

  return (
    <div className="mt-10">
      <p className="section-label text-[color:var(--color-accent)]">
        {dictionary.hero.countdownLabel}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[0.85rem] border border-[color:var(--color-accent)]/18 bg-[rgba(255,251,247,0.6)] px-3 py-4 text-center shadow-[0_8px_20px_rgba(140,103,78,0.05)]"
          >
            <p className="text-[1.42rem] leading-none text-[color:var(--color-wine)] sm:text-[1.72rem]">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="meta-label mt-2 text-[color:var(--color-accent)]/75">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
