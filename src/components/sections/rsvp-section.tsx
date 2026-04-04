"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { siteConfig } from "@/config/site.config";
import type { RsvpSubmission } from "@/types/rsvp";
import type { Dictionary, Locale } from "@/types/site";

type RsvpSectionProps = {
  dictionary: Dictionary;
  locale: Locale;
};

type Attendance = "yes" | "no" | "unsure" | null;
type BinaryChoice = "yes" | "no" | null;
type Step = 1 | 2 | 3 | 4;

type FormState = {
  guestName: string;
  email: string;
  phoneCountryName: string;
  phoneCountryCode: string;
  phone: string;
  attendance: Attendance;
  hasCompanion: BinaryChoice;
  companionName: string;
  travelFromOutside: BinaryChoice;
  needsAccommodation: BinaryChoice;
  dietaryRestrictions: string;
};

const initialFormState: FormState = {
  guestName: "",
  email: "",
  phoneCountryName: "Colombia",
  phoneCountryCode: "+57",
  phone: "",
  attendance: null,
  hasCompanion: null,
  companionName: "",
  travelFromOutside: null,
  needsAccommodation: null,
  dietaryRestrictions: "",
};

const phoneCountryOptions = [
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
];

export function RsvpSection({ dictionary, locale }: RsvpSectionProps) {
  const [step, setStep] = useState<Step>(1);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhoneCountryOpen, setIsPhoneCountryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneCountryRef = useRef<HTMLDivElement | null>(null);

  const stepTitles = useMemo(
    () => [
      dictionary.rsvp.identityStep,
      dictionary.rsvp.attendanceStep,
      dictionary.rsvp.logisticsStep,
      dictionary.rsvp.confirmationStep,
    ],
    [dictionary],
  );

  const sortedPhoneCountryOptions = useMemo(
    () =>
      [...phoneCountryOptions].sort((left, right) =>
        left.country.localeCompare(right.country),
      ),
    [],
  );

  const selectedPhoneCountry =
    sortedPhoneCountryOptions.find(
      (option) =>
        option.code === formState.phoneCountryCode &&
        option.country === formState.phoneCountryName,
    ) ?? sortedPhoneCountryOptions[0];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        phoneCountryRef.current &&
        !phoneCountryRef.current.contains(event.target as Node)
      ) {
        setIsPhoneCountryOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPhoneCountryOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function validateStep(currentStep: Step) {
    if (currentStep === 1) {
      if (!formState.guestName.trim()) {
        return dictionary.rsvp.validationName;
      }
      if (!formState.email.trim()) {
        return dictionary.rsvp.validationEmail;
      }
      if (!formState.phone.trim()) {
        return dictionary.rsvp.validationPhone;
      }
    }

    if (currentStep === 2) {
      if (!formState.attendance) {
        return dictionary.rsvp.validationAttendance;
      }
      if (formState.attendance === "yes" && !formState.hasCompanion) {
        return dictionary.rsvp.validationCompanionDecision;
      }
      if (
        formState.attendance === "yes" &&
        formState.hasCompanion === "yes" &&
        !formState.companionName.trim()
      ) {
        return dictionary.rsvp.validationCompanion;
      }
    }

    if (currentStep === 3) {
      if (!formState.travelFromOutside) {
        return dictionary.rsvp.validationTravel;
      }
      if (!formState.needsAccommodation) {
        return dictionary.rsvp.validationAccommodation;
      }
    }

    return "";
  }

  function handleNext() {
    const validationError = validateStep(step);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");
    setStep((currentStep) => Math.min(currentStep + 1, 4) as Step);
  }

  function handleBack() {
    setErrorMessage("");
    setStep((currentStep) => Math.max(currentStep - 1, 1) as Step);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateStep(3);
    if (validationError) {
      setErrorMessage(validationError);
      setStep(3);
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const payload: RsvpSubmission = {
      guestName: formState.guestName,
      email: formState.email,
      phoneCountryName: formState.phoneCountryName,
      phoneCountryCode: formState.phoneCountryCode,
      phone: formState.phone,
      attendance: formState.attendance!,
      hasCompanion: formState.hasCompanion,
      companionName: formState.companionName,
      travelFromOutside: formState.travelFromOutside!,
      needsAccommodation: formState.needsAccommodation!,
      dietaryRestrictions: formState.dietaryRestrictions,
      locale,
    };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 503) {
          setErrorMessage(dictionary.rsvp.backendNotConfigured);
        } else {
          setErrorMessage(dictionary.rsvp.submissionError);
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage(dictionary.rsvp.submissionError);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormState(initialFormState);
    setStep(1);
    setErrorMessage("");
    setIsSubmitted(false);
    setIsOpen(false);
    setIsPhoneCountryOpen(false);
  }

  function renderBinaryChoice(
    value: BinaryChoice,
    onSelect: (choice: BinaryChoice) => void,
  ) {
    return (
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          { label: dictionary.rsvp.yesOption, value: "yes" as const },
          { label: dictionary.rsvp.noOption, value: "no" as const },
        ].map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              className={
                isSelected
                  ? "rounded-[1.25rem] border border-[color:var(--color-accent)] bg-[#fff7f1] px-4 py-4 text-left text-[1rem] leading-7 text-stone-900 transition"
                  : "rounded-[1.25rem] border border-[#ead8c9] bg-[#fffaf6] px-4 py-4 text-left text-[1rem] leading-7 text-stone-700 transition hover:border-[color:var(--color-accent)]/35"
              }
              onClick={() => onSelect(option.value)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section
      className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-16 text-center"
      id="rsvp"
    >
      <div className="h-px w-full bg-[color:var(--color-accent)]/35" />
      <p className="section-label mt-14 text-[color:var(--color-accent)]">
        {dictionary.sections.rsvpLabel}
      </p>
      <h2 className="section-title mt-4 font-serif text-[color:var(--color-foreground)]">
        {dictionary.sections.rsvpHeading}
      </h2>
      <p className="section-intro mt-8 max-w-2xl text-stone-700">
        {dictionary.rsvp.entryDescription}
      </p>

      {!isOpen ? (
        <button
          className="btn-action btn-action-soft btn-action-lg mt-8"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          {dictionary.rsvp.openButton}
        </button>
      ) : (
        <div className="mt-12 w-full rounded-[1.75rem] border border-[#e6d7c8] bg-[rgba(255,250,245,0.86)] p-6 text-left shadow-[0_18px_60px_rgba(120,87,65,0.06)] sm:p-8">
          {dictionary.rsvp.introDescription ? (
            <p className="body-elegant text-center text-stone-700">
              {dictionary.rsvp.introDescription}
            </p>
          ) : null}
          <div className="mt-6 rounded-[1.25rem] bg-[#f6ece4] p-5 text-center">
            <p className="section-label text-[color:var(--color-accent)]">
              {siteConfig.event.rsvp.deadlineLabel}
            </p>
            <p className="body-elegant mt-4 text-stone-700">
              {siteConfig.event.rsvp.contactLine}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {stepTitles.map((title, index) => {
              const itemStep = index + 1;
              const isActive = itemStep === step;
              const isCompleted = itemStep < step || isSubmitted;

              return (
                <div
                  key={title}
                  className={
                    isActive
                      ? "meta-label rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-white"
                      : isCompleted
                        ? "meta-label rounded-full border border-[#ead8c9] bg-[#f6ece4] px-4 py-2 text-stone-700"
                        : "meta-label rounded-full border border-[#efe2d8] px-4 py-2 text-stone-400"
                  }
                >
                  {dictionary.rsvp.stepLabel} {itemStep}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submitted"
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-[1.75rem] border border-[#efdfd2] bg-[linear-gradient(180deg,#fffefc,#f8ede5)] px-6 py-7 text-stone-900"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="section-label text-[color:var(--color-accent)]">
                  {dictionary.rsvp.confirmationStep}
                </p>
                <h3 className="subsection-title mt-4 font-serif">
                  {dictionary.rsvp.confirmationTitle}
                </h3>
                <p className="body-elegant mt-4 text-stone-700">
                  {formState.attendance === "yes"
                    ? dictionary.rsvp.confirmationAttending
                    : formState.attendance === "no"
                      ? dictionary.rsvp.confirmationNotAttending
                      : dictionary.rsvp.confirmationUnsure}
                </p>

                <div className="mt-6 grid gap-4 rounded-[1.25rem] bg-[#f5ebe2] p-5 text-[1rem] leading-7 text-stone-700 sm:grid-cols-2">
                  <div>
                    <p className="meta-label text-stone-500">
                      {dictionary.rsvp.guestNameLabel}
                    </p>
                    <p className="mt-2">{formState.guestName}</p>
                  </div>
                  <div>
                    <p className="meta-label text-stone-500">
                      {dictionary.rsvp.emailLabel}
                    </p>
                    <p className="mt-2">{formState.email}</p>
                  </div>
                  <div>
                    <p className="meta-label text-stone-500">
                      {dictionary.rsvp.phoneLabel}
                    </p>
                    <p className="mt-2">
                      {formState.phoneCountryCode} {formState.phone}
                    </p>
                  </div>
                  <div>
                    <p className="meta-label text-stone-500">
                      {dictionary.rsvp.attendanceStep}
                    </p>
                    <p className="mt-2">
                      {formState.attendance === "yes"
                        ? dictionary.rsvp.yesOption
                        : formState.attendance === "no"
                          ? dictionary.rsvp.noOption
                          : dictionary.rsvp.unsureOption}
                    </p>
                  </div>
                </div>

                <button
                  className="btn-action btn-action-pill btn-action-md mt-6"
                  onClick={handleReset}
                  type="button"
                >
                  {dictionary.rsvp.resetButton}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key={step}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 14 }}
                onSubmit={handleSubmit}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <p className="section-label text-stone-500">
                  {dictionary.rsvp.stepLabel} {step}
                </p>
                <h3 className="subsection-title mt-3 font-serif text-stone-900">
                  {stepTitles[step - 1]}
                </h3>

                {step === 1 ? (
                  <div className="mt-6 grid gap-5">
                    <label className="grid gap-2">
                      <span className="form-label text-stone-700">
                        {dictionary.rsvp.guestNameLabel}
                      </span>
                      <input
                        className="input-field"
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            guestName: event.target.value,
                          }))
                        }
                        type="text"
                        value={formState.guestName}
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="form-label text-stone-700">
                        {dictionary.rsvp.emailLabel}
                      </span>
                      <input
                        className="input-field"
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        type="email"
                        value={formState.email}
                      />
                    </label>

                    <div className="grid gap-2">
                      <span className="form-label text-stone-700">
                        {dictionary.rsvp.phoneLabel}
                      </span>
                      <div className="grid gap-3 sm:grid-cols-[minmax(0,220px)_1fr]">
                        <div className="relative" ref={phoneCountryRef}>
                          <button
                            aria-expanded={isPhoneCountryOpen}
                            aria-haspopup="listbox"
                            className="input-field flex w-full items-center justify-between hover:border-[color:var(--color-accent)]/35"
                            onClick={() =>
                              setIsPhoneCountryOpen((current) => !current)
                            }
                            type="button"
                          >
                              <span className="flex items-center gap-3">
                                <span className="text-lg leading-none">
                                  {selectedPhoneCountry.flag}
                                </span>
                                <span>{selectedPhoneCountry.code}</span>
                              </span>
                              <span
                                className={`text-xs text-stone-500 transition md:text-[0.95rem] ${isPhoneCountryOpen ? "rotate-180" : ""}`}
                              >
                                ▼
                              </span>
                          </button>

                          {isPhoneCountryOpen ? (
                            <div
                              className="absolute left-0 top-[calc(100%+0.5rem)] z-20 max-h-72 w-full overflow-y-auto rounded-[1.25rem] border border-[#ead8c9] bg-[#fffaf6] p-2 shadow-[0_18px_40px_rgba(120,87,65,0.10)]"
                              role="listbox"
                            >
                              {sortedPhoneCountryOptions.map((option) => {
                                const isSelected =
                                  option.code === formState.phoneCountryCode &&
                                  option.country === selectedPhoneCountry.country;

                                return (
                                  <button
                                    aria-selected={isSelected}
                                    className={
                                      isSelected
                                        ? "flex w-full items-center justify-between rounded-[1rem] bg-[#f6ece4] px-3 py-3 text-left text-[1rem] leading-7 text-stone-900"
                                        : "flex w-full items-center justify-between rounded-[1rem] px-3 py-3 text-left text-[1rem] leading-7 text-stone-700 transition hover:bg-[#f8efe7]"
                                    }
                                    key={`${option.country}-${option.code}`}
                                    onClick={() => {
                                      setFormState((current) => ({
                                        ...current,
                                        phoneCountryName: option.country,
                                        phoneCountryCode: option.code,
                                      }));
                                      setIsPhoneCountryOpen(false);
                                    }}
                                    role="option"
                                    type="button"
                                  >
                                    <span className="flex min-w-0 items-center gap-3">
                                      <span className="text-lg leading-none">
                                        {option.flag}
                                      </span>
                                      <span className="truncate">
                                        {option.country}
                                      </span>
                                    </span>
                                    <span className="shrink-0 text-stone-500">
                                      ({option.code})
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                        <input
                          className="input-field"
                          onChange={(event) =>
                            setFormState((current) => ({
                              ...current,
                              phone: event.target.value,
                            }))
                          }
                          placeholder="300 123 4567"
                          type="tel"
                          value={formState.phone}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="mt-6 grid gap-5">
                    <div>
                      <p className="form-label text-stone-700">
                        {dictionary.rsvp.attendingQuestion}
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        {[
                          { label: dictionary.rsvp.yesOption, value: "yes" as const },
                          { label: dictionary.rsvp.noOption, value: "no" as const },
                          {
                            label: dictionary.rsvp.unsureOption,
                            value: "unsure" as const,
                          },
                        ].map((option) => {
                          const isSelected = formState.attendance === option.value;

                          return (
                            <button
                              key={option.value}
                              className={
                                isSelected
                                  ? "rounded-[1.25rem] border border-[color:var(--color-accent)] bg-[#fff7f1] px-4 py-4 text-left text-[1rem] leading-7 text-stone-900 transition"
                                  : "rounded-[1.25rem] border border-[#ead8c9] bg-[#fffaf6] px-4 py-4 text-left text-[1rem] leading-7 text-stone-700 transition hover:border-[color:var(--color-accent)]/35"
                              }
                              onClick={() =>
                                setFormState((current) => ({
                                  ...current,
                                  attendance: option.value,
                                  hasCompanion:
                                    option.value === "yes"
                                      ? current.hasCompanion
                                      : null,
                                  companionName:
                                    option.value === "yes" ? current.companionName : "",
                                }))
                              }
                              type="button"
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {formState.attendance === "yes" ? (
                      <div className="grid gap-5">
                        <div>
                          <p className="form-label text-stone-700">
                            {dictionary.rsvp.companionQuestion}
                          </p>
                          {renderBinaryChoice(formState.hasCompanion, (choice) =>
                            setFormState((current) => ({
                              ...current,
                              hasCompanion: choice,
                              companionName: choice === "yes" ? current.companionName : "",
                            })),
                          )}
                        </div>

                        {formState.hasCompanion === "yes" ? (
                          <label className="grid gap-2">
                            <span className="form-label text-stone-700">
                              {dictionary.rsvp.companionNameLabel}
                            </span>
                            <input
                              className="input-field"
                              onChange={(event) =>
                                setFormState((current) => ({
                                  ...current,
                                  companionName: event.target.value,
                                }))
                              }
                              type="text"
                              value={formState.companionName}
                            />
                          </label>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="mt-6 grid gap-5">
                    <div>
                      <p className="form-label text-stone-700">
                        {dictionary.rsvp.travelQuestion}
                      </p>
                      {renderBinaryChoice(formState.travelFromOutside, (choice) =>
                        setFormState((current) => ({
                          ...current,
                          travelFromOutside: choice,
                        })),
                      )}
                    </div>

                    <div>
                      <p className="form-label text-stone-700">
                        {dictionary.rsvp.accommodationQuestion}
                      </p>
                      {renderBinaryChoice(formState.needsAccommodation, (choice) =>
                        setFormState((current) => ({
                          ...current,
                          needsAccommodation: choice,
                        })),
                      )}
                    </div>

                    <label className="grid gap-2">
                      <span className="form-label text-stone-700">
                        {dictionary.rsvp.dietaryQuestion}{" "}
                        <span className="text-[0.95rem] text-stone-400 md:text-[1.02rem]">
                          ({dictionary.common.optionalLabel})
                        </span>
                      </span>
                      <textarea
                        className="input-field min-h-28 resize-y"
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            dietaryRestrictions: event.target.value,
                          }))
                        }
                        placeholder={dictionary.rsvp.dietaryPlaceholder}
                        value={formState.dietaryRestrictions}
                      />
                    </label>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="mt-6 rounded-[1.5rem] border border-[#ead8c9] bg-[#fffaf6] p-5">
                    <div className="grid gap-4 text-[1rem] leading-7 text-stone-700 sm:grid-cols-2">
                      <div>
                        <p className="meta-label text-stone-500">
                          {dictionary.rsvp.guestNameLabel}
                        </p>
                        <p className="mt-2">{formState.guestName}</p>
                      </div>
                      <div>
                        <p className="meta-label text-stone-500">
                          {dictionary.rsvp.emailLabel}
                        </p>
                        <p className="mt-2">{formState.email}</p>
                      </div>
                      <div>
                        <p className="meta-label text-stone-500">
                          {dictionary.rsvp.phoneLabel}
                        </p>
                        <p className="mt-2">
                          {formState.phoneCountryCode} {formState.phone}
                        </p>
                      </div>
                      <div>
                        <p className="meta-label text-stone-500">
                          {dictionary.rsvp.attendanceStep}
                        </p>
                        <p className="mt-2">
                          {formState.attendance === "yes"
                            ? dictionary.rsvp.yesOption
                            : formState.attendance === "no"
                              ? dictionary.rsvp.noOption
                              : dictionary.rsvp.unsureOption}
                        </p>
                      </div>
                      {formState.attendance === "yes" ? (
                        <div>
                          <p className="meta-label text-stone-500">
                            {dictionary.rsvp.companionQuestion}
                          </p>
                          <p className="mt-2">
                            {formState.hasCompanion === "yes"
                              ? dictionary.rsvp.yesOption
                              : dictionary.rsvp.noOption}
                          </p>
                        </div>
                      ) : null}
                      {formState.attendance === "yes" &&
                      formState.hasCompanion === "yes" ? (
                        <div>
                          <p className="meta-label text-stone-500">
                            {dictionary.rsvp.companionNameLabel}
                          </p>
                          <p className="mt-2">{formState.companionName}</p>
                        </div>
                      ) : null}
                      <div>
                        <p className="meta-label text-stone-500">
                          {dictionary.rsvp.travelQuestion}
                        </p>
                        <p className="mt-2">
                          {formState.travelFromOutside === "yes"
                            ? dictionary.rsvp.yesOption
                            : dictionary.rsvp.noOption}
                        </p>
                      </div>
                      <div>
                        <p className="meta-label text-stone-500">
                          {dictionary.rsvp.accommodationQuestion}
                        </p>
                        <p className="mt-2">
                          {formState.needsAccommodation === "yes"
                            ? dictionary.rsvp.yesOption
                            : dictionary.rsvp.noOption}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="meta-label text-stone-500">
                          {dictionary.rsvp.dietaryQuestion}
                        </p>
                        <p className="mt-2">
                          {formState.dietaryRestrictions || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {errorMessage ? (
                  <p className="mt-4 text-[1rem] leading-7 text-rose-700">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className="btn-action btn-action-pill btn-action-md"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    {dictionary.rsvp.closeButton}
                  </button>
                  {step > 1 ? (
                    <button
                      className="btn-action btn-action-pill btn-action-md"
                      onClick={handleBack}
                      type="button"
                    >
                      {dictionary.rsvp.backButton}
                    </button>
                  ) : null}

                  {step < 4 ? (
                    <button
                      className="btn-action btn-action-pill btn-action-md"
                      onClick={handleNext}
                      type="button"
                    >
                      {dictionary.rsvp.nextButton}
                    </button>
                  ) : (
                    <button
                      className="btn-action btn-action-pill btn-action-md"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting
                        ? dictionary.rsvp.submittingButton
                        : dictionary.rsvp.submitButton}
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
