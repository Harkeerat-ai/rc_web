"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks, contactInfo } from "@/lib/data";
import { socialIcons } from "@/components/ui/SocialIcons";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputClasses = (field: string) =>
    `w-full bg-surface/70 border ${
      errors[field] ? "border-rust" : "border-gold/10 focus:border-gold/50"
    } rounded-lg px-4 py-3 text-ivory text-sm placeholder-text-muted/50 outline-none transition-all duration-200`;

  return (
    <section id="contact" className="py-24 lg:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Join Us &{" "}
            <span className="bg-gradient-to-r from-goldtext to-rusttext bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-text-muted max-w-md mx-auto text-sm md:text-base">
            Have any questions or want to join our club? Reach out to us
            through the form below, and we&apos;ll get back to you as soon as
            possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold">
              Reach Out to Us
            </h3>
            <a
              href={`tel:${contactInfo.phone1.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-text-muted hover:text-goldtext transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-goldtext" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {contactInfo.phone1}
            </a>
            <a
              href={`tel:${contactInfo.phone2.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-text-muted hover:text-goldtext transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-goldtext" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {contactInfo.phone2}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 text-text-muted hover:text-goldtext transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-goldtext" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="break-all">{contactInfo.email}</span>
            </a>
            <a
              href={contactInfo.joinFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 rounded-full text-goldtext text-sm hover:bg-gold/20 transition-all duration-300"
            >
              Join Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-12 text-center"
              role="status"
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-goldtext"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3
                ref={successRef}
                tabIndex={-1}
                className="font-heading text-2xl font-bold mb-2 focus:outline-none"
              >
                Message Sent!
              </h3>
              <p className="text-text-muted text-sm mb-6">
                Thank you for reaching out. We&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-gold/10 border border-gold/30 rounded-full text-goldtext text-sm hover:bg-gold/20 transition-all duration-300 cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="glass-card p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-text-muted text-xs mb-2"
                  >
                    Name <span className="text-rusttext" aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClasses("name")}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="name-error"
                      role="alert"
                      className="text-rusttext text-xs mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-text-muted text-xs mb-2"
                  >
                    Email <span className="text-rusttext" aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClasses("email")}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      role="alert"
                      className="text-rusttext text-xs mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-text-muted text-xs mb-2"
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClasses("phone")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-text-muted text-xs mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={inputClasses("subject")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-text-muted text-xs mb-2"
                >
                  Message <span className="text-rusttext" aria-hidden="true">*</span>
                  <span className="sr-only"> (required)</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about yourself or your inquiry..."
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClasses("message")} resize-none`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    id="message-error"
                    role="alert"
                    className="text-rusttext text-xs mt-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-goldtext to-rusttext rounded-full text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(227,178,80,0.45)] transition-all duration-300 cursor-pointer"
                >
                  Send Message
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-xs">Follow us:</span>
                  {socialLinks.slice(0, 3).map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-text-muted hover:text-goldtext hover:border-gold/50 transition-all duration-300 cursor-pointer"
                      aria-label={link.name}
                    >
                      {socialIcons[link.icon]}
                    </a>
                  ))}
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
