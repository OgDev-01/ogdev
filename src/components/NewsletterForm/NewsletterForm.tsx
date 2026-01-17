import Button from "../shared/Button/Button";

const NewsletterForm = () => {
  return (
    <form className="mt-14">
      <h3 className="text-lg">Subscribe to my Newsletter</h3>
      <p className="opacity-60 md:w-3/4">
        Get emails about web development, tech, and early access to new articles
      </p>
      <fieldset className="flex items-center gap-2 mt-5">
        <label htmlFor="newsletter-email" className="sr-only">
          Email Address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="Email Address"
          required
          aria-required="true"
          className="w-full p-3 rounded-full bg-primary-white/15 "
        />
        <Button isPrimary type="submit">
          Subscribe
        </Button>
      </fieldset>
    </form>
  );
};

export default NewsletterForm;
