"use client"

import { useState, useRef } from "react"
import { Send } from "lucide-react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_EMAIL = "dhruvchora37@gmail.com"

/**
 * Web3Forms integrated contact form.
 * Handles state transitions (idle, sending, sent, error) and includes:
 * - Client-side email format validation with inline error
 * - Disabled submit button + spinner during network request to prevent double-sends
 * - User-friendly error with clickable email fallback on network failure
 * - Honeypot spam protection
 */
export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [fields, setFields] = useState({ name: "", email: "", message: "", botcheck: false })
  const [emailError, setEmailError] = useState<string | null>(null)
  // Ref used to move focus to status message on state change for screen readers
  const statusRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    setFields((prev) => ({ ...prev, [name]: val }))
    // Clear email validation error as the user types
    if (name === "email") setEmailError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side email format validation before hitting the network
    if (!EMAIL_REGEX.test(fields.email)) {
      setEmailError("Please enter a valid email address (e.g. you@example.com).")
      return
    }
    setEmailError(null)

    // Guard against double-sends if button click is fired twice
    if (formState === "sending") return
    setFormState("sending")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Web3Forms access key
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New message from Dhruv's Portfolio",
          from_name: "Dhruv Portfolio",
          name: fields.name,
          email: fields.email,
          message: fields.message,
          botcheck: fields.botcheck,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setFormState("sent")
        setFields({ name: "", email: "", message: "", botcheck: false })
        // Move focus to success message for screen readers
        setTimeout(() => statusRef.current?.focus(), 50)
      } else {
        setFormState("error")
        setTimeout(() => statusRef.current?.focus(), 50)
      }
    } catch (err) {
      setFormState("error")
      setTimeout(() => statusRef.current?.focus(), 50)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {/* Honeypot field for Web3Forms spam protection */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        checked={fields.botcheck}
        onChange={handleChange}
      />

      {/* Inline Status Messages — tabIndex={-1} allows programmatic focus for screen readers */}
      {formState === "sent" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm text-center font-medium dark:bg-green-950/30 dark:border-green-900/50 dark:text-green-400 outline-none"
        >
          ✓ Your message is on its way! I&apos;ll be in touch within 24 hours.
        </div>
      )}
      {formState === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm text-center font-medium dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400 outline-none"
        >
          Something went wrong. Please email me directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline font-semibold hover:text-red-800 dark:hover:text-red-300"
          >
            {CONTACT_EMAIL}
          </a>
          {" "}— I personally reply to every message.
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your Name"
          value={fields.name}
          onChange={handleChange}
          className="contact-input"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={fields.email}
          onChange={handleChange}
          aria-invalid={emailError ? "true" : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          className={`contact-input${emailError ? " border-red-400 focus:ring-red-400/30" : ""}`}
        />
        {/* Inline validation error — shown only when email format is wrong */}
        {emailError && (
          <p id="email-error" role="alert" className="text-xs text-red-600 dark:text-red-400 mt-0.5">
            {emailError}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your business and what you need — I'll take it from there."
          value={fields.message}
          onChange={handleChange}
          className="contact-input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={formState === "sending" || formState === "sent"}
        aria-label={formState === "sending" ? "Sending message…" : "Send message"}
        aria-busy={formState === "sending"}
        className="contact-submit btn-primary flex items-center justify-center gap-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formState === "sending" ? (
          <>
            {/* Inline SVG spinner — no extra import, no layout shift */}
            <svg
              className="w-4 h-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span aria-live="polite">Sending…</span>
          </>
        ) : formState === "sent" ? (
          <span>Message Sent ✓</span>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Start the Conversation
          </>
        )}
      </button>
    </form>
  )
}
