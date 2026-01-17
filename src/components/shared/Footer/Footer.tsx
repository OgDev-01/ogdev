import NewsletterForm from "@/components/NewsletterForm/NewsletterForm";
import NavLink from "../AppNav/NavLinks";
import Socials from "../Socials/Socials";

const Footer = () => {
  return (
    <footer className="bg-highlight-black text-white py-10 mt-20 md:mt-28 border-t">
      <div className="container">
        <div className="flex flex-col gap-10 md:flex-row md:gap-40">
          <div className="flex flex-col gap-6 opacity-90 md:flex-row flex-shrink-0">
            <NavLink />
          </div>
          <div>
            <div className="md:flex md:justify-end">
              <Socials />
            </div>
            <NewsletterForm />
          </div>
        </div>
        <div className="flex justify-center mt-20 md:mt-28">
          <img
            className="w-64 md:w-96"
            src="/foter-logo.svg"
            alt="Ogbonna Logo"
          />
        </div>
      </div>
      <p className="text-secondary-button text-center mt-6 md:mt-16">
        Designed by Henry
      </p>
    </footer>
  );
};

export default Footer;
