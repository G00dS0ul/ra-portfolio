"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PenCursor from "./PenCursor";

const SERVICES = [
  "Branding & Identity",
  "Ad / Banner Design",
  "Package Design",
  "Social Media Design",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
];

export default function StartProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    services: [] as string[],
    budget: "",
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const pageStyle = {
    background:
      "linear-gradient(135deg, #120016 0%, #1a0020 50%, #120016 100%)",
    minHeight: "100vh",
  };
  const formCardStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
  };
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };
  const inputClass =
    "w-full px-4 py-3 rounded-lg text-white text-sm placeholder-white/20 focus:border-[#D200FF]";
  const labelStyle = "text-white/70 text-sm font-medium mb-2 block";

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.6, delay },
  });

  if (submitted) {
    return (
      <div
        className="flex items-center justify-center min-h-screen px-6"
        style={pageStyle}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-7xl mb-6">🎨</div>
          <h2 className="text-white font-black text-4xl mb-4">
            Message <span className="text-[#BFFF00]">Received!</span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto mb-8">
            Thanks for reaching out. I&apos;ll review your project details and
            get back to you within 48 hours.
          </p>
          <motion.button
            onClick={() => router.push("/")}
            className="px-8 py-3 border border-white/20 text-white/60 text-sm tracking-widest uppercase rounded-lg hover:border-white/40 hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={pageStyle} className="px-6 py-12 hide-cursor">
      <style>{`
  .hide-cursor, .hide-cursor * {
    cursor: none !important;
  }
`}</style>
      <PenCursor />
      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(210,0,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-2xl mx-auto relative">
        {/* Back button */}
        <motion.button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-12 transition-colors group"
          {...fadeUp(0)}
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div className="mb-12" {...fadeUp(0.1)}>
          <p className="text-[#D200FF] text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Let&apos;s Work Together
          </p>
          <h1 className="text-white font-black text-5xl leading-tight mb-4">
            Start a <span className="text-[#BFFF00]">Project</span>
          </h1>
          <p className="text-white/40">
            Fill out the form and I&apos;ll get back to you within 48 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={formCardStyle}
          {...fadeUp(0.2)}
        >
          {/* Full Name */}
          <div>
            <label className={labelStyle}>
              Full Name <span className="text-[#D200FF]">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Jane Doe"
              className={inputClass}
              style={inputStyle}
              value={formData.fullName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, fullName: e.target.value }))
              }
            />
          </div>

          {/* Business Name */}
          <div>
            <label className={labelStyle}>Business Name</label>
            <input
              type="text"
              placeholder="Acme Corp"
              className={inputClass}
              style={inputStyle}
              value={formData.businessName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, businessName: e.target.value }))
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelStyle}>
              Email Address <span className="text-[#D200FF]">*</span>
            </label>
            <input
              required
              type="email"
              placeholder="jane@example.com"
              className={inputClass}
              style={inputStyle}
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>

          {/* Services */}
          <div>
            <label className={labelStyle}>
              Services Needed <span className="text-[#D200FF]">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {SERVICES.map((service) => {
                const isSelected = formData.services.includes(service);
                const chipStyle = {
                  border: isSelected
                    ? "1px solid #D200FF"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: isSelected
                    ? "rgba(210,0,255,0.15)"
                    : "rgba(255,255,255,0.03)",
                  color: isSelected ? "#fff" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                };
                return (
                  <button
                    key={service}
                    type="button"
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={chipStyle}
                    onClick={() => toggleService(service)}
                  >
                    {isSelected ? "✓ " : ""}
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className={labelStyle}>Budget Range</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {BUDGETS.map((budget) => {
                const isSelected = formData.budget === budget;
                const chipStyle = {
                  border: isSelected
                    ? "1px solid #BFFF00"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: isSelected
                    ? "rgba(191,255,0,0.12)"
                    : "rgba(255,255,255,0.03)",
                  color: isSelected ? "#BFFF00" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                };
                return (
                  <button
                    key={budget}
                    type="button"
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={chipStyle}
                    onClick={() => setFormData((p) => ({ ...p, budget }))}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className={labelStyle}>Timeline</label>
            <input
              type="text"
              placeholder="e.g. 2 weeks, ASAP, end of month..."
              className={inputClass}
              style={inputStyle}
              value={formData.timeline}
              onChange={(e) =>
                setFormData((p) => ({ ...p, timeline: e.target.value }))
              }
            />
          </div>

          {/* Message */}
          <div>
            <label className={labelStyle}>
              Tell me about your project{" "}
              <span className="text-[#D200FF]">*</span>
            </label>
            <textarea
              required
              rows={5}
              placeholder="Describe your brand, goals, what you're looking for..."
              className={inputClass + " resize-none"}
              style={inputStyle}
              value={formData.message}
              onChange={(e) =>
                setFormData((p) => ({ ...p, message: e.target.value }))
              }
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-black text-sm tracking-widest uppercase rounded-lg text-[#120016]"
            style={{
              background: loading ? "rgba(191,255,0,0.5)" : "#BFFF00",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            whileHover={loading ? {} : { scale: 1.02 }}
            whileTap={loading ? {} : { scale: 0.98 }}
          >
            {loading ? "Sending..." : "Send Project Brief →"}
          </motion.button>
        </motion.form>

        {/* Footer note */}
        <motion.p
          className="text-center text-white/20 text-xs mt-6 pb-12"
          {...fadeUp(0.3)}
        >
          No commitment required. I&apos;ll review and respond within 48 hours.
        </motion.p>
      </div>
    </div>
  );
}
