"use client";
import { useEffect, useRef } from "react";
import { useForm } from "@formspree/react";
import Button from "@/components/shared/Button/Button";

const ContactForm = () => {
  const [state, handleSubmit, reset] = useForm("mayrjeev");
  const formRef = useRef<HTMLFormElement>(null);

  // reset form after submission
  if (state.succeeded && formRef.current) {
    formRef.current.reset();
  }

  useEffect(() => {
    if (state.succeeded) {
      const timeout = setTimeout(() => {
        reset();
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [reset, state]);

  return (
    <div className="mt-10">
      {state.succeeded && (
        <p className="text-center text-primary-button py-4">
          Message sent successfully
        </p>
      )}

      {state.submitting && (
        <p className="text-center text-primary-button py-4">
          Sending message...
        </p>
      )}
      <p className="text-center text-dark-red-10">
        {state.errors && state.errors.getAllFieldErrors().join(", ")}
      </p>
      <form
        ref={formRef}
        className="flex flex-col gap-10 "
        onSubmit={handleSubmit}
      >
        <label
          className=" relative flex border border-secondary-black/50 px-4 py-3 rounded-xl"
          htmlFor="name"
        >
          <span className="absolute -top-3 bg-white px-3">Name</span>
          <input
            name="name"
            id="name"
            placeholder="Enter your name"
            className=" flex w-full bg-transparent focus:outline-none placeholder:text-sm"
            type="text"
          />
        </label>
        <label
          className=" relative flex border border-secondary-black/50 px-4 py-3 rounded-xl"
          htmlFor="email"
        >
          <span className="absolute -top-2 bg-white px-4 text-sm">Email</span>
          <input
            name="email"
            id="email"
            placeholder="Enter your email"
            className=" flex w-full bg-transparent focus:outline-none placeholder:text-sm"
            type="email"
          />
        </label>
        <label
          className=" relative flex border border-secondary-black/50 px-4 py-3 rounded-xl"
          htmlFor="message"
        >
          <span className="absolute -top-2 bg-white px-4 text-sm">Message</span>
          <textarea
            name="message"
            id="message"
            placeholder="Type in your questions or proposals"
            className=" flex w-full bg-transparent focus:outline-none placeholder:text-sm h-28 pt-1"
          />
        </label>

        <Button disabled={state.submitting} type="submit" className="mx-auto">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
