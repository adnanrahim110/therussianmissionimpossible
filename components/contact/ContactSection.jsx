"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FormInput } from "@/components/ui/FormInput";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SOCIAL_LINKS } from "@/lib/constants";
import { useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      e.target.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section className="section-padding bg-stone-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ScrollReveal>
              <div className="bg-white p-8 md:p-10 rounded-[2px] shadow-sm border border-stone-200">
                <h2 className="font-heading text-3xl font-bold text-stone-900 mb-2">
                  Send a Message
                </h2>
                <p className="text-stone-600 mb-8 font-body">
                  Fill out the form below and the publisher will route your
                  inquiry appropriately.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Your Name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                    />
                    <FormInput
                      label="Email Address"
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className="font-semibold text-stone-700 text-sm tracking-wide"
                    >
                      Subject Matter
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-stone-200 focus:border-stone-400 transition-shadow duration-200 font-body"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="press">Press / Media Interview</option>
                      <option value="bulk">Bulk Book Order</option>
                      <option value="author">Message to the Authors</option>
                    </select>
                  </div>

                  <FormInput
                    label="Message"
                    name="message"
                    textarea
                    required
                    placeholder="How can we help you?"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "loading" || status === "success"}
                    loading={status === "loading"}
                    className="w-full md:w-auto"
                  >
                    {status === "success" ? "Message Sent!" : "Send Message"}
                  </Button>

                  {status === "success" && (
                    <p
                      role="status"
                      aria-live="polite"
                      className="text-olive-600 text-sm mt-4 font-medium"
                    >
                      Thank you. Your message has been securely forwarded to CGG
                      International.
                    </p>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Publisher Info */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <ScrollReveal delay={0.2} className="h-full">
              <div className="flex flex-col h-full space-y-12">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-6">
                    Publisher Operations
                  </h3>
                  <div className="space-y-4 text-stone-700 font-body">
                    <div className="flex items-start gap-4">
                      <svg
                        className="w-6 h-6 shrink-0 text-stone-400 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-stone-900">
                          CGG International W.L.L.
                        </p>
                        <p>1404 Manama Centre, Building 145</p>
                        <p>Road 380, Block 304, Manama</p>
                        <p>Kingdom of Bahrain</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <svg
                        className="w-6 h-6 shrink-0 text-stone-400 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-stone-900">
                          Email Contact
                        </p>
                        <a
                          href="mailto:info@cgg-international.com"
                          className="hover:text-crimson-600 transition-colors"
                        >
                          info@cgg-international.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-full h-px bg-stone-200" />

                <div>
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-6">
                    Social Accounts
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {SOCIAL_LINKS.map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-200 text-stone-700 hover:bg-crimson-600 hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-crimson-500"
                        aria-label={link.label}
                      >
                        {/* Placeholder generic social icon */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
