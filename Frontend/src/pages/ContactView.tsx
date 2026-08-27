import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useInquiry } from "../hooks/useInquiry";
import { useToast } from "../context/ToastContext";
import { PROJECTS } from "../data";
import { Mail, Phone, MapPin, CheckCircle, Navigation } from "lucide-react";

const contactValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Full name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  phone: Yup.string()
    .trim()
    .test("valid-phone", "Enter a valid 10-digit mobile number", (val) => {
      if (!val) return false;
      const digitsOnly = val.replace(/[\s-+]/g, "");
      return /^\d{10}$/.test(digitsOnly);
    })
    .required("Phone number is required"),
  projectSlug: Yup.string().required("Please select a project"),
  message: Yup.string().trim(),
});

interface ContactViewProps {
  lightMode: boolean;
  openLeadModal: (projectSlug: string, message?: string) => void;
}

type Checkpoint = { point: string; distance: string };

const CHECKPOINTS: Checkpoint[] = [
  { point: "Besa Square Crossing", distance: "Immediate neighborhood access" },
  { point: "Nagpur Metro Corridor (Wardha Rd)", distance: "8 min commute" },
  { point: "Dr. Ambedkar Int. Airport", distance: "12 min by highway" },
  { point: "MIHAN Technology Corridor", distance: "15 min arterial reach" },
];

const HQ_PHOTO_URL =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80&auto=format&fit=crop";

type ContactRowProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

const ContactRow = ({ icon, label, children }: ContactRowProps) => (
  <div className="group flex items-start gap-3.5">
    <div className="w-8 h-8 rounded-lg bg-[#2B86C5]/8 flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-[#2B86C5]/15">
      {icon}
    </div>
    <div>
      <span className="text-[10px] font-semibold text-[#2B86C5] uppercase tracking-[0.15em] block">
        {label}
      </span>
      <div className="text-sm text-[#003A78] leading-relaxed mt-1 font-medium">
        {children}
      </div>
    </div>
  </div>
);

type FieldProps = {
  label: string;
  error?: string;
  focused?: boolean;
  children: React.ReactNode;
};

const Field = ({ label, error, focused, children }: FieldProps) => (
  <div className="group">
    <label
      className={`block text-[11px] font-semibold uppercase mb-1.5 tracking-[0.1em] transition-colors duration-200 ${
        focused ? "text-[#C23A4A]" : "text-[#003A78]/45 group-focus-within:text-[#C23A4A]"
      }`}
    >
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 6 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className="text-[#C23A4A] text-[11px]"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export default function ContactView() {
  const { lightMode, openLeadModal } = useOutletContext<ContactViewProps>();
  const { submit, loading, error: apiError, success, reset } = useInquiry();
  const { toast } = useToast();

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      projectSlug: "melbourne-city-sector-ii",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values) => {
      const cleanPhone = values.phone.replace(/[\s-+]/g, "");
      const ok = await submit(
        { ...values, phone: cleanPhone },
        "/contact"
      );
      if (ok) {
        toast.success(
          `Thank you ${values.name || 'Valued Client'}! A confirmation email has been sent to ${values.email}. Our team will contact you shortly.`,
          'Message & Email Sent'
        );
      }
    },
  });

  const handleReset = () => {
    reset();
    formik.resetForm();
  };

  const inputBaseClass =
    "w-full bg-[#F2F2F2] border border-[#003A78]/12 rounded-lg px-4 py-3 text-sm text-[#003A78] placeholder:text-[#003A78]/35 outline-none transition-all duration-200 focus:border-[#2B86C5] focus:bg-white focus:ring-2 focus:ring-[#2B86C5]/15";

  return (
    <div className="bg-[#f2f2f2]">
      <Helmet>
        <title>Contact 4 Pillars Realty | Book a Site Visit in Nagpur</title>
        <meta
          name="description"
          content="Get in touch with 4 Pillars Realty. Visit our corporate office in Besa Square, New Nagpur or schedule a private site visit today."
        />
        <meta property="og:title" content="Contact 4 Pillars Realty | Book a Site Visit in Nagpur" />
        <meta
          property="og:description"
          content="Get in touch with 4 Pillars Realty. Visit our corporate office in Besa Square, New Nagpur or schedule a private site visit today."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h1 className="font-serif tracking-tight font-bold mt-3 text-[#003A78] text-4xl sm:text-5xl">
            Contact 4 Pillars Realty
          </h1>
          <p className="text-[#003A78]/60 mt-3 text-sm sm:text-base max-w-md mx-auto">
            Speak with our advisory team and book a private site visit today.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="group relative rounded-2xl overflow-hidden h-[360px] sm:h-[420px] ring-1 ring-white/10">
              <img
                src={HQ_PHOTO_URL}
                alt="4 Pillars Realty corporate headquarters"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003A78]/85 via-[#003A78]/15 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 lg:-mt-94  mx-4 sm:mx-6 bg-white rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-[0_20px_50px_-15px_rgba(0,58,120,0.35)] ring-1 ring-[#003A78]/5 border-t-[3px] border-[#C23A4A]"
            >
              <ContactRow icon={<MapPin className="w-4 h-4 text-[#2B86C5]" />} label="Corporate HQ Address">
                Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil Petrol Pump, Besa Square, New Nagpur, Maharashtra
              </ContactRow>
              <div className="h-px bg-[#003A78]/8" />
              <ContactRow icon={<Phone className="w-4 h-4 text-[#2B86C5]" />} label="Sales Helpline Desks">
                <div className="flex flex-col gap-1">
                  <a href="tel:+919373233777" className="hover:text-[#C23A4A] transition-colors">+91 93732 33777</a>
                  <a href="tel:+919371612666" className="hover:text-[#C23A4A] transition-colors">+91 93716 12666</a>
                </div>
              </ContactRow>
              <div className="h-px bg-[#003A78]/8" />
              <ContactRow icon={<Mail className="w-4 h-4 text-[#2B86C5]" />} label="Electronic Enquiries">
                <a href="mailto:4iconrealities@gmail.com" className="hover:text-[#C23A4A] transition-colors">
                  4iconrealities@gmail.com
                </a>
              </ContactRow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:mt-18 p-7 rounded-2xl flex flex-col gap-4 bg-white border border-slate-200"
            >
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#2B86C5]" />
                <span className="text-[11px] font-semibold text-[#2B86C5] uppercase tracking-[0.2em]">
                  Location &amp; Connectivity
                </span>
              </div>
              <div className="flex flex-col divide-y divide-slate-100">
                {CHECKPOINTS.map((loc, index) => (
                  <motion.div
                    key={loc.point}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.07 }}
                    className="flex justify-between items-center gap-4 py-3"
                  >
                    <span className="text-sm text-[#003A78] font-medium">{loc.point}</span>
                    <span className="text-[11px] text-[#003A78]/45 font-medium whitespace-nowrap">{loc.distance}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl p-8 sm:p-10 bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-[#003A78]/5">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8 flex flex-col gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                      className="w-16 h-16 bg-[#2B86C5]/10 border border-[#2B86C5]/30 text-[#2B86C5] rounded-full flex items-center justify-center mx-auto mb-2"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>
                    <h4 className="text-xl font-serif font-bold text-[#003A78] tracking-tight">
                      Your Inquiry Has Been Sent
                    </h4>
                    <p className="text-sm text-[#003A78]/60 max-w-md mx-auto leading-relaxed">
                      Our advisory team will call you shortly to discuss your requirements.
                    </p>
                    <button
                      onClick={handleReset}
                      className="bg-[#C23A4A] hover:bg-[#a82f3d] text-white font-semibold py-2.5 px-6 rounded-xl text-sm max-w-[220px] mx-auto mt-4 transition-colors"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={formik.handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="mb-1">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C23A4A]">
                        Inquiry Form
                      </span>
                      <h3 className="font-serif font-bold text-2xl text-[#003A78] mt-1">
                        Talk to Our Advisors
                      </h3>
                    </div>

                    <Field
                      label="Full Name"
                      error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                      focused={focusedField === "name"}
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Jane Doe"
                        value={formik.values.name}
                        onFocus={() => setFocusedField("name")}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onChange={formik.handleChange}
                        className={inputBaseClass}
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        label="Email Address"
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                        focused={focusedField === "email"}
                      >
                        <input
                          type="email"
                          name="email"
                          placeholder="name@domain.com"
                          value={formik.values.email}
                          onFocus={() => setFocusedField("email")}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            setFocusedField(null);
                          }}
                          onChange={formik.handleChange}
                          className={inputBaseClass}
                        />
                      </Field>
                      <Field
                        label="Phone Number"
                        error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                        focused={focusedField === "phone"}
                      >
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#003A78]/45">+91</span>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="93732 33777"
                            value={formik.values.phone}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              setFocusedField(null);
                            }}
                            onChange={formik.handleChange}
                            className={`${inputBaseClass} pl-11`}
                          />
                        </div>
                      </Field>
                    </div>

                    <Field
                      label="Project of Interest"
                      error={formik.touched.projectSlug && formik.errors.projectSlug ? formik.errors.projectSlug : undefined}
                      focused={focusedField === "project"}
                    >
                      <select
                        name="projectSlug"
                        value={formik.values.projectSlug}
                        onFocus={() => setFocusedField("project")}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onChange={formik.handleChange}
                        className={`${inputBaseClass} appearance-none cursor-pointer`}
                      >
                        {PROJECTS.map((p) => (
                          <option key={p.slug} value={p.slug}>{p.name}</option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label="Your Message"
                      error={formik.touched.message && formik.errors.message ? formik.errors.message : undefined}
                      focused={focusedField === "message"}
                    >
                      <textarea
                        rows={3}
                        name="message"
                        placeholder="E.g. Are corner plots still available? What financing options apply?"
                        value={formik.values.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onChange={formik.handleChange}
                        className={`${inputBaseClass} resize-none`}
                      />
                    </Field>

                    <AnimatePresence>
                      {apiError && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[#C23A4A] text-xs"
                        >
                          {apiError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={loading || formik.isSubmitting}
                      whileHover={{ scale: loading || formik.isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: loading || formik.isSubmitting ? 1 : 0.99 }}
                      className="w-full bg-[#C23A4A] hover:bg-[#a82f3d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors mt-1 text-sm tracking-wide"
                    >
                      {loading || formik.isSubmitting ? "Sending…" : "Send Inquiry"}
                    </motion.button>

                    <p className="text-center text-[11px] text-[#003A78]/35 -mt-1">
                      We'll respond within one business day.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
