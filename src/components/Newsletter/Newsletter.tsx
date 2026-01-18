"use client";

import React, { useState } from "react";
import { FiCheck, FiMail, FiSend } from "react-icons/fi";

import { cn } from "@/libs/utils";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    // Simulate subscription (replace with actual newsletter API)
    try {
      // TODO: Replace with actual newsletter service (e.g., Buttondown, ConvertKit, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="group relative pb-1 transition-all duration-300 ease-out lg:hover:!opacity-100">
      {/* Hover background overlay - Desktop only (matches ExperienceCard) */}
      <div
        className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all duration-300 ease-out motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary-black/[0.03] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-primary-white/[0.03]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-button/10 dark:bg-secondary-button/10">
            <FiMail
              className="h-5 w-5 text-primary-button dark:text-secondary-button"
              aria-hidden="true"
            />
          </div>
          <h3 className="font-medium leading-snug text-secondary-black dark:text-primary-white">
            Stay up to date
          </h3>
        </div>

        <p className="mt-2 text-sm leading-normal text-secondary-black/70 dark:text-primary-white/70">
          Get notified when I publish something new, and unsubscribe at any
          time.
        </p>

        {status === "success" ? (
          <div className="mt-4 flex items-center gap-2 rounded-full bg-primary-button/10 px-4 py-2.5 text-primary-button dark:bg-secondary-button/20 dark:text-primary-white/90">
            <FiCheck className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-medium">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              aria-required="true"
              disabled={status === "loading"}
              className={cn(
                "min-w-0 flex-1 rounded-full border border-secondary-black/15 bg-transparent px-4 py-2 text-sm text-secondary-black placeholder:text-secondary-black/40 transition-all duration-200",
                "focus:outline-none focus:shadow-[0_0_12px_2px_hsla(248,62%,44%,0.25)]",
                "dark:border-primary-white/15 dark:text-primary-white dark:placeholder:text-primary-white/40 dark:focus:shadow-[0_0_12px_2px_hsla(248,62%,58%,0.3)]",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-label="Subscribe to newsletter"
              className={cn(
                "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-button text-white transition-all duration-200",
                "hover:bg-primary-button/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-button focus:ring-offset-2",
                "dark:bg-secondary-button dark:hover:bg-secondary-button/90 dark:focus:ring-secondary-button dark:focus:ring-offset-secondary-black",
                "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              )}
            >
              {status === "loading" ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <FiSend className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

Newsletter.displayName = "Newsletter";

export default Newsletter;
