"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import { ArchiveInlineIcon } from "@/components/ui/archive/ArchiveIcons";
import { Button } from "@/components/ui/Button";
import { contactPageContent } from "@/constants/contact";
import { siteMeta } from "@/constants/site";
import { cn } from "@/lib/utils";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const initialTouched = {
  name: false,
  email: false,
  message: false,
};

const fieldOrder = ["name", "email", "message"];

function validate(values) {
  const fields = contactPageContent.form.fields;
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = fields.name.errors.required;
  } else if (name.length < 2) {
    errors.name = fields.name.errors.min;
  }

  if (!email) {
    errors.email = fields.email.errors.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = fields.email.errors.invalid;
  }

  if (!message) {
    errors.message = fields.message.errors.required;
  } else if (message.length < 20) {
    errors.message = fields.message.errors.min;
  }

  return errors;
}

function FieldShell({ field, error, children }) {
  return (
    <label
      className={cn(
        "group/field relative block overflow-hidden rounded-md border bg-black/35 p-4 transition-[border-color,background-color,box-shadow] duration-500",
        error
          ? "border-rose-400/60 bg-rose-950/15 shadow-[0_0_0_1px_rgba(251,113,133,0.18)]"
          : "border-white/10 hover:border-white/20 focus-within:border-rose-300/50 focus-within:bg-black/45 focus-within:shadow-[0_18px_44px_rgba(242,13,13,0.08)]",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-[0.26] bg-linear-to-r from-rose-400/60 via-white/20 to-transparent transition-transform duration-700 group-focus-within/field:scale-x-100"
      />
      <span className="mb-3 flex items-center gap-2.5 font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
        <ArchiveInlineIcon
          iconKey={field.iconKey}
          size={14}
          className={cn(
            "text-stone-500 transition-colors group-focus-within/field:text-rose-300",
            error && "text-rose-300",
          )}
        />
        {field.label}
      </span>
      {children}
      {error ? (
        <p className="mt-2 text-xs leading-relaxed text-rose-200">{error}</p>
      ) : null}
    </label>
  );
}

export function ContactForm() {
  const form = contactPageContent.form;
  const prefersReducedMotion = useReducedMotion();
  const inputRefs = useRef({});
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouched);
  const [submitted, setSubmitted] = useState(false);
  const errors = validate(values);

  const sectionMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
      };

  const visibleError = (name) => (touched[name] ? errors[name] : undefined);

  const updateValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const markTouched = (name) => {
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setTouched({ name: true, email: true, message: true });

      const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
      requestAnimationFrame(() => inputRefs.current[firstInvalid]?.focus());
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setValues(initialValues);
    setTouched(initialTouched);
    setSubmitted(false);
  };

  return (
    <section className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(180deg,rgba(16,18,23,0.98),rgba(7,8,10,0.99))] p-5 text-stone-100 shadow-[0_28px_80px_rgba(0,0,0,0.32)] md:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.52) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.52) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-400/45 to-transparent"
      />

      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            {...sectionMotion}
            className="relative grid min-h-[28rem] place-items-center py-8 text-center"
          >
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-md border border-rose-300/30 bg-rose-500/10 text-rose-100 shadow-[0_0_40px_rgba(242,13,13,0.12)]">
                <ArchiveInlineIcon iconKey="contact" size={24} />
              </div>
              <p className="font-ui text-[10px] uppercase tracking-[0.34em] text-rose-200">
                {form.success.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide text-white md:text-5xl">
                {form.success.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-300 md:text-base">
                {form.success.summary}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button type="button" onClick={handleReset} iconKey="next">
                  {form.success.primaryAction}
                </Button>
                <Button
                  href={`mailto:${siteMeta.contactEmail}`}
                  variant="outline"
                  iconKey="contact"
                >
                  {form.success.secondaryAction}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            {...sectionMotion}
            noValidate
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
              <div>
                <div className="flex items-center gap-2.5 font-ui text-[10px] uppercase tracking-[0.34em] text-stone-400">
                  <span className="inline-flex size-7 items-center justify-center rounded-[3px] border border-white/15 bg-white/3 text-stone-300">
                    <ArchiveInlineIcon iconKey="contact" size={14} />
                  </span>
                  {form.eyebrow}
                </div>
                <h2 className="mt-4 font-heading text-3xl font-bold tracking-wide text-white md:text-5xl">
                  {form.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-300 md:text-base">
                  {form.summary}
                </p>
                <div className="mt-6 h-px max-w-xs bg-linear-to-r from-rose-400/45 via-white/15 to-transparent" />
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldShell field={form.fields.name} error={visibleError("name")}>
                    <input
                      ref={(node) => {
                        inputRefs.current.name = node;
                      }}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      placeholder={form.fields.name.placeholder}
                      aria-invalid={Boolean(visibleError("name"))}
                      aria-describedby={
                        visibleError("name") ? "contact-name-error" : undefined
                      }
                      onBlur={() => markTouched("name")}
                      onChange={(event) => updateValue("name", event.target.value)}
                      className="block w-full bg-transparent text-base text-white placeholder:text-stone-600 focus:outline-none"
                    />
                    {visibleError("name") ? (
                      <span id="contact-name-error" className="sr-only">
                        {visibleError("name")}
                      </span>
                    ) : null}
                  </FieldShell>

                  <FieldShell
                    field={form.fields.email}
                    error={visibleError("email")}
                  >
                    <input
                      ref={(node) => {
                        inputRefs.current.email = node;
                      }}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      placeholder={form.fields.email.placeholder}
                      aria-invalid={Boolean(visibleError("email"))}
                      aria-describedby={
                        visibleError("email")
                          ? "contact-email-error"
                          : undefined
                      }
                      onBlur={() => markTouched("email")}
                      onChange={(event) => updateValue("email", event.target.value)}
                      className="block w-full bg-transparent text-base text-white placeholder:text-stone-600 focus:outline-none"
                    />
                    {visibleError("email") ? (
                      <span id="contact-email-error" className="sr-only">
                        {visibleError("email")}
                      </span>
                    ) : null}
                  </FieldShell>
                </div>

                <FieldShell
                  field={form.fields.message}
                  error={visibleError("message")}
                >
                  <textarea
                    ref={(node) => {
                      inputRefs.current.message = node;
                    }}
                    id="contact-message"
                    name="message"
                    rows={7}
                    value={values.message}
                    placeholder={form.fields.message.placeholder}
                    aria-invalid={Boolean(visibleError("message"))}
                    aria-describedby={
                      visibleError("message")
                        ? "contact-message-error"
                        : undefined
                    }
                    onBlur={() => markTouched("message")}
                    onChange={(event) =>
                      updateValue("message", event.target.value)
                    }
                    className="block w-full resize-y bg-transparent text-base leading-relaxed text-white placeholder:text-stone-600 focus:outline-none"
                  />
                  {visibleError("message") ? (
                    <span id="contact-message-error" className="sr-only">
                      {visibleError("message")}
                    </span>
                  ) : null}
                </FieldShell>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-relaxed text-stone-500">
                    Press, rights, archive access, and distribution inquiries are
                    routed through this desk.
                  </p>
                  <Button type="submit" iconKey="next" className="sm:min-w-56">
                    {form.submitLabel}
                  </Button>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
