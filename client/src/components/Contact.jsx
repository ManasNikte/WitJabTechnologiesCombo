import Section from "./Section";
import { socials } from "../constants";

const Contact = () => {
  return (
    <Section id="contact" crosses={true}>
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-10">
          Contact Us
        </h2>
        <div className="flex flex-col lg:flex-row">
          
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h3 className="text-2xl font-semibold mb-3">Get in Touch</h3>
            {/* Socials */}
            <ul className="flex gap-5 flex-wrap mb-4">
              {socials.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                >
                  <img src={item.iconUrl} width={16} height={16} alt={item.title} />
                </a>
              ))}
            </ul>
            <div className="text-gray-700 space-y-2 mb-4">
              <p><strong>Email:</strong> contact@witjabtechnologies.com</p>
              <p><strong>Phone:</strong> (+91) 9004502414</p>
              <p><strong>Address:</strong> Thane, Maharashtra, India.</p>
            </div>
            <br />
            <p className="text-gray-700 mb-10">
              We would love to hear from you! Whether you have a question about
              our services, pricing, or anything else, our team is ready to
              answer all your questions.
            </p>
            <div className="mb-10 lg:pr-5">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.95373531531636!3d-37.81627927975167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775e8c5c63d7b9!2sGoogle!5e0!3m2!1sen!2sau!4v1611815368774!5m2!1sen!2sau"
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <form className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 bg-gray-200 rounded-lg"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 bg-gray-200 rounded-lg"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="subject"
                >
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border border-gray-300 bg-gray-200 rounded-lg"
                  placeholder="Your Subject"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="message"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 border border-gray-300 bg-gray-200 rounded-lg"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
