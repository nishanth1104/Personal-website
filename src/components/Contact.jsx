import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_1h0nnpb",
        "template_5rvdlb3",
        {
          from_name: form.name,
          to_name: "Nishanth Ayyalasomayajula",
          from_email: form.email,
          to_email: "nishanthayyalasomayajula@gmail.com",
          message: form.message,
        },
        "8Ld-jPPDdMRPIwJRZ"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle">Get in touch</p>
          <h2 className="section-title mt-4 mb-16">Contact</h2>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-card">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-3 text-sm uppercase tracking-wider">
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className="bg-[var(--glass-bg)] backdrop-blur-md py-4 px-6 placeholder:text-[var(--text-secondary)] text-white border border-[var(--glass-border)] rounded-xl outline-none focus:border-white/30 transition-all duration-300"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-3 text-sm uppercase tracking-wider">
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  className="bg-[var(--glass-bg)] backdrop-blur-md py-4 px-6 placeholder:text-[var(--text-secondary)] text-white border border-[var(--glass-border)] rounded-xl outline-none focus:border-white/30 transition-all duration-300"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-3 text-sm uppercase tracking-wider">
                  Your Message
                </span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  className="bg-[var(--glass-bg)] backdrop-blur-md py-4 px-6 placeholder:text-[var(--text-secondary)] text-white border border-[var(--glass-border)] rounded-xl outline-none resize-none focus:border-white/30 transition-all duration-300"
                />
              </label>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;