import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-10">
          <p className="text-center text-sm text-n-4 sm:order-2 lg:order-1">
            © {new Date().getFullYear()}. All rights reserved WitJab Technologies.
          </p>
          <ul className="flex gap-5 sm:order-1 lg:order-2">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                >
                  <img src={item.iconUrl} width={16} height={16} alt={item.title} />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/login" 
            className="text-center text-sm text-n-4 underline sm:order-3 lg:order-3"
          >
            Login
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
