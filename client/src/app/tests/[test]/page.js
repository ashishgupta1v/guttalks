// pages/product/gut-health-test.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  CheckCircle,
  HeartPulse,
  Sparkles,
  Tag,
  Shield,
  Apple,
  Salad,
  Activity,
  Star,
  ZoomIn,
  AlertTriangle,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Wind,
  Droplets,
  Beaker,
  Flame,
  Heart,
  Microscope,
  Clock,
  Truck,
  FileCheck,
  Award,
  ThumbsUp,
  ArrowRight,
  Download, // added for report buttons
} from "lucide-react";
import { useParams } from "next/navigation";



// --------------------------------------------------------------
// 1. Product Data (with distinct images per test)
// --------------------------------------------------------------
const PRODUCT_IMAGES = {
  smt: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
  ],
  gmt: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop",
  ],
};

const TEST_OPTIONS = {
  smt: {
    id: "smt",
    name: "SMT Test",
    shortName: "SMT",
    badge: "Basic Screening",
    title: "Prelim Screening Test",
    description:
      "Essential gut health markers to identify common digestive issues like bloating, acidity, and IBS. Ideal for first-time screening.",
    fullPrice: 2000,
    price: 1750,
    taxNote: "Tax included. Shipping calculated at checkout.",
    benefits: [
      { icon: Apple, title: "Prevent GERD & Acidity", desc: "Identify triggers early" },
      { icon: Salad, title: "Fix Acidity, Reflux & Heartburns", desc: "Target root causes" },
      { icon: Activity, title: "Alternative to Colonoscopy", desc: "Non-invasive screening" },
    ],
    features: [
      "Blood sample (IgG antibody test)",
      "Home sample collection",
      "1 doctor consultation",
      "Digital report within 7 days",
      "NABL Certified Lab",
    ],
    reportDays: 7,
    included: "Sample collection kit, shipping, digital report",
    doctorConsultation: "1 session (15 min) with gastroenterologist",
    sampleType: "Blood",
  },
  gmt: {
    id: "gmt",
    name: "GMT Test",
    shortName: "GMT",
    badge: "Advanced Analysis",
    title: "Active Infection Test",
    description:
      "Comprehensive microbiome mapping with stool antigen test for active H. pylori infection. Includes personalised diet & lifestyle plan.",
    fullPrice: 3999,
    price: 2499,
    taxNote: "Tax included. Shipping calculated at checkout.",
    benefits: [
      { icon: Apple, title: "Direct Pathogen Detection", desc: "Active infection status" },
      { icon: Salad, title: "Personalised Antibiotic Guidance", desc: "Reduce resistance risk" },
      { icon: Activity, title: "Post-Treatment Validation", desc: "Confirm eradication" },
    ],
    features: [
      "Stool antigen test (active infection)",
      "Home sample collection",
      "2 doctor consultations + follow-up",
      "Personalised diet & lifestyle plan",
      "50+ gut biomarkers & diversity index",
      "NABL Certified Lab",
    ],
    reportDays: 14,
    included: "Sample collection kit, shipping, detailed report + action plan",
    doctorConsultation: "2 sessions (30 min each) + follow-up",
    sampleType: "Stool",
    recommended: true,
  },
};

const COMBO = {
  discountedPrice: 3499,
  savings: TEST_OPTIONS.smt.price + TEST_OPTIONS.gmt.price - 3499,
};

// Comparison table data
const COMPARISON_TABLE = [
  { feature: "Sample Type", smt: "Blood", gmt: "Stool" },
  { feature: "Detection", smt: "Antibodies (past exposure)", gmt: "Active infection (antigen)" },
  { feature: "Report Time", smt: "7 days", gmt: "14 days" },
  { feature: "Doctor Consultations", smt: "1 session", gmt: "2 sessions + follow-up" },
  { feature: "Personalised Plan", smt: "Basic", gmt: "Comprehensive diet & lifestyle" },
  { feature: "Ideal For", smt: "Initial screening", gmt: "Confirmed symptoms / post-treatment" },
];

// Experts data
const EXPERTS = [
  {
    name: "Sumaiyya",
    role: "Certified Nutrition Scientist",
    qualification: "M.Sc. nutrition and dietetics",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Mariyam",
    role: "Certified Nutrition Scientist",
    qualification: "M.Sc. nutrition and dietetics",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Mahima Madaan",
    role: "Certified Nutrition Scientist",
    qualification: "MSc Food and Nutrition",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

// FAQs
const FAQS = [
  {
    q: "Should I be physically present or your lab at any time during this process?",
    a: "No, everything is done from home. Our phlebotomist will visit you for sample collection (SMT) or you'll receive a kit for stool collection (GMT).",
  },
  {
    q: "What sample is needed for the test?",
    a: "SMT requires a blood sample; GMT requires a stool sample. Both are collected from home.",
  },
  {
    q: "I am taking antibiotics. Can I collect the sample?",
    a: "Please complete your antibiotic course and wait 14 days before taking the test for accurate results.",
  },
  {
    q: "I am on daily medication for an illness. Can I collect the sample?",
    a: "Most medications do not interfere, but consult our expert before booking.",
  },
  {
    q: "How do I benefit from this test?",
    a: "You'll identify the root cause of your digestive issues and receive a personalised plan to reverse symptoms.",
  },
];

// --------------------------------------------------------------
// 2. NEW Premium Banner Sections
// --------------------------------------------------------------

// SECTION 1: Test Report Download Banner
const ReportDownloadBanner = () => {
  return (
    <div className="w-full mb-20">
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-[#E8F4F7]">
        <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
          {/* LEFT: Image with overlay and hover zoom */}
<motion.div 
  className="relative md:w-1/2 h-64 md:h-auto overflow-hidden"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.4 }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-[#18606D]/20 to-transparent z-10" />
  
  <Image
    src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80"
    fill
    className="object-cover"
    alt="lab microscope"
    unoptimized
  />
</motion.div>

          {/* RIGHT: Content */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3">
              Gut Health Test Reports
            </h2>
            <p className="text-[#64748B] text-lg mb-6">
              Your report is available within <strong className="text-[#18606D]">2–3 days</strong> after sample collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#18606D] to-[#2A7F8F] text-white rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
                <Download size={18} /> Download SMT Report
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#18606D] to-[#2A7F8F] text-white rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
                <Download size={18} /> Download GMT Report
              </button>
            </div>
            <p className="text-xs text-[#94A3B8] mt-6">
              * Sample reports are for illustrative purposes only. Actual reports contain your personal biomarkers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// SECTION 2: Awareness / Warning Banner (replaces H. pylori with SMT/GMT)
const AwarenessBanner = () => {
  return (
    <div className="w-full mb-20">
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#F4FAFB] to-[#E8F4F7] border border-[#D9EEF2]">
        <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
          {/* LEFT: Image with overlay and test type text overlay */}
          <motion.div 
            className="relative md:w-1/2 h-64 md:h-auto overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#18606D]/10 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=800&fit=crop"
              alt="Medical testing kit"
              fill
              className="object-cover"
            />
            {/* Overlay text simulating "SMT Test" on the image */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <span className="font-bold text-[#18606D]">SMT Test | GMT Test</span>
            </div>
          </motion.div>

          {/* RIGHT: Text content with statistics */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              If untreated, gut infections can lead to serious health risks
            </h2>
            <div className="space-y-3 text-lg">
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#18606D]"></span>
                <span><strong className="text-[#18606D]">80%</strong> of chronic acidity cases develop into ulcers within 10 years</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#18606D]"></span>
                <span>Long‑term risk of <strong className="text-[#18606D]">severe digestive disorders</strong> increases 3x without diagnosis</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#18606D]"></span>
                <span>Early detection through <strong>SMT or GMT testing</strong> can reverse symptoms in 90% of cases</span>
              </p>
            </div>
            <div className="mt-8">
              <button className="px-6 py-3 bg-[#18606D] text-white rounded-full font-semibold hover:bg-[#2A7F8F] transition shadow-md">
                Book Your Test Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------------
// 3. Existing Premium Sections (kept as before)
// --------------------------------------------------------------

// Step data for image-based section
const TEST_STEPS = [
  {
    step: "01",
    title: "Book Test",
    description: "Choose your package and book online in 2 minutes",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8c25d7d?w=200&h=200&fit=crop",
  },
  {
    step: "02",
    title: "Fix Slot for Sample Collection",
    description: "Schedule a convenient time for home sample pick-up",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&h=200&fit=crop",
  },
  {
    step: "03",
    title: "Receive Report in 2-3 Days",
    description: "Get detailed digital report from NABL certified lab",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop",
  },
  {
    step: "04",
    title: "Consult with Gut Expert",
    description: "Discuss results and get personalised treatment plan",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=200&fit=crop",
  },
];

// Symptoms for circular infographic
const SYMPTOMS = [
  { name: "Acidity", icon: Flame },
  { name: "Heartburn", icon: Heart },
  { name: "Acid reflux", icon: Droplets },
  { name: "Burping", icon: Wind },
  { name: "Stomach ulcers", icon: Stethoscope },
  { name: "Trapped gas", icon: Activity },
];

// SMT Flow Steps
const SMT_FLOW_STEPS = [
  "STEP 1: Take the blood test",
  "STEP 2: If positive → go for stool antigen test",
  "STEP 3: If positive again → antibiotic + anti-inflammatory diet",
  "STEP 4: Improve gut health & modify stomach acid levels",
  "STEP 5: Retest after 14 days to confirm negativity",
];

// GMT Flow Steps
const GMT_FLOW_STEPS = [
  "STEP 1: Take stool antigen test",
  "STEP 2: If positive → start antibiotic + anti-inflammatory diet",
  "STEP 3: Work on modifying stomach acid levels",
  "STEP 4: Retest after 14 days to confirm negativity",
];

// Image-based Steps Component with enhanced hover
const ImageSteps = () => {
  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-12 text-center">
        Steps of the Test
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEST_STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl shadow-md border border-[#E8F4F7] p-5 text-center hover:shadow-xl hover:bg-gradient-to-b hover:from-white hover:to-[#F4FAFB] cursor-pointer"
          >
            <div className="relative w-28 h-28 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#18606D] to-[#2A7F8F] opacity-10" />
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="rounded-full object-cover border-2 border-[#18606D] shadow-sm"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#18606D] text-white flex items-center justify-center text-sm font-bold shadow-md">
                {step.step}
              </div>
            </div>
            <h3 className="font-bold text-[#0F172A] text-lg mt-2">{step.title}</h3>
            <p className="text-[#64748B] text-sm mt-1">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 3-Card Layout: Symptoms + SMT Flow + GMT Flow
const PostTestFlow = () => {
  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-12 text-center">
        What to Expect Post the Test
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Fix Symptoms with Gut Experts */}
        <motion.div
          whileHover={{ y: -8, boxShadow: "0 20px 25px -12px rgba(24,96,109,0.2)" }}
          className="bg-white rounded-2xl shadow-md border border-[#E8F4F7] p-6 transition-all hover:bg-gradient-to-b hover:from-white hover:to-[#F0F9FB] cursor-pointer"
        >
          <h3 className="text-xl font-bold text-[#18606D] text-center mb-6">
            Fix Symptoms with Gut Experts
          </h3>
          <div className="relative flex justify-center items-center min-h-[200px]">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#18606D] to-[#2A7F8F] shadow-lg flex items-center justify-center z-10">
              <Stethoscope className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
              {SYMPTOMS.map((symptom, idx) => {
                const positions = [
                  "col-start-1 row-start-1 justify-self-start self-start -translate-x-2 -translate-y-2",
                  "col-start-2 row-start-1 justify-self-center self-start -translate-y-2",
                  "col-start-3 row-start-1 justify-self-end self-start translate-x-2 -translate-y-2",
                  "col-start-1 row-start-2 justify-self-start self-center -translate-x-2",
                  "col-start-3 row-start-2 justify-self-end self-center translate-x-2",
                  "col-start-2 row-start-3 justify-self-center self-end translate-y-2",
                ];
                return (
                  <div
                    key={idx}
                    className={`${positions[idx]} bg-white rounded-full px-3 py-1 shadow-md border border-[#E8F4F7] flex items-center gap-1 text-xs font-medium text-[#18606D] whitespace-nowrap hover:bg-[#18606D] hover:text-white transition-colors cursor-default`}
                  >
                    <symptom.icon size={12} />
                    <span>{symptom.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-[#64748B] text-sm mt-24 pt-2">
            Our gut experts help you identify root causes and reverse these symptoms.
          </p>
        </motion.div>

        {/* Card 2: SMT Flow */}
        <motion.div
          whileHover={{ y: -8, boxShadow: "0 20px 25px -12px rgba(24,96,109,0.2)" }}
          className="bg-white rounded-2xl shadow-md border border-[#E8F4F7] p-6 transition-all hover:bg-gradient-to-b hover:from-white hover:to-[#E6F4F7] cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="text-[#18606D]" size={24} />
            <h3 className="text-xl font-bold text-[#0F172A]">With Blood Test (SMT)</h3>
          </div>
          <div className="space-y-4">
            {SMT_FLOW_STEPS.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F4F7] text-[#18606D] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-[#475569] text-sm">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[#E8F4F7] text-center">
            <span className="text-xs text-[#18606D] font-medium">Basic Screening</span>
          </div>
        </motion.div>

        {/* Card 3: GMT Flow (Recommended) */}
        <motion.div
          whileHover={{ y: -8, boxShadow: "0 20px 25px -12px rgba(24,96,109,0.3)" }}
          className="bg-gradient-to-br from-white to-[#F4FAFB] rounded-2xl shadow-lg border-2 border-[#18606D] p-6 transition-all relative cursor-pointer"
        >
          <div className="absolute -top-3 right-4 bg-[#18606D] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={12} /> Advanced Analysis
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="text-[#18606D]" size={24} />
            <h3 className="text-xl font-bold text-[#0F172A]">With Stool Antigen Test (GMT)</h3>
          </div>
          <div className="space-y-4">
            {GMT_FLOW_STEPS.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#18606D] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-[#475569] text-sm">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[#E8F4F7] text-center">
            <span className="text-xs font-bold text-[#18606D]">Recommended for active infection</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Comparison Table Section
const ComparisonTable = () => {
  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8 text-center">
        SMT vs GMT: Which Test is Right for You?
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-md border border-[#E8F4F7]">
          <thead>
            <tr className="bg-gradient-to-r from-[#18606D] to-[#2A7F8F] text-white">
              <th className="px-6 py-4 text-left rounded-tl-2xl">Feature</th>
              <th className="px-6 py-4 text-left">SMT (Basic)</th>
              <th className="px-6 py-4 text-left rounded-tr-2xl">GMT (Advanced)</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_TABLE.map((row, idx) => (
              <tr key={idx} className="border-b border-[#E8F4F7] hover:bg-[#F4FAFB] transition">
                <td className="px-6 py-4 font-semibold text-[#0F172A]">{row.feature}</td>
                <td className="px-6 py-4 text-[#475569]">{row.smt}</td>
                <td className="px-6 py-4 text-[#475569]">{row.gmt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {
  const reasons = [
    { icon: Truck, title: "Home Sample Collection", desc: "Free pickup from your doorstep" },
    { icon: Clock, title: "Fast Reports", desc: "Results in 2-7 days" },
    { icon: FileCheck, title: "NABL Certified Lab", desc: "Accurate & reliable testing" },
    { icon: Award, title: "Expert Consultation", desc: "Included with every test" },
    { icon: Microscope, title: "Advanced Biomarkers", desc: "50+ gut health markers" },
    { icon: ThumbsUp, title: "100% Privacy", desc: "Secure data handling" },
  ];
  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8 text-center">
        Why Choose Our Gut Health Tests?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-xl p-5 shadow-md border border-[#E8F4F7] flex items-start gap-3 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F4F7] flex items-center justify-center text-[#18606D]">
              <reason.icon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A]">{reason.title}</h3>
              <p className="text-sm text-[#64748B]">{reason.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --------------------------------------------------------------
// 4. Cart Drawer Component (unchanged)
// --------------------------------------------------------------
const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-[#D9EEF2] flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#18606D]">Your Cart</h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-[#F4FAFB]">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-[#64748B]">Your cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-[#F4FAFB] p-3 rounded-xl">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-[#0F172A]">{item.name}</h4>
                        <button onClick={() => onRemoveItem(item.id)} className="text-[#94A3B8] hover:text-red-500">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-[#64748B]">{item.testType}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white border border-[#D9EEF2] flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white border border-[#D9EEF2] flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-bold text-[#18606D]">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="border-t border-[#D9EEF2] p-4 space-y-3">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span className="text-[#18606D]">₹{subtotal}</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-[#18606D] to-[#2A7F8F] text-white rounded-xl font-bold hover:shadow-lg transition">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --------------------------------------------------------------
// 5. Main Component
// --------------------------------------------------------------
export default function GutHealthTestPage() {
  const {test} = useParams()
  
  
  const [selectedTest, setSelectedTest] = useState(test);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [mainImage, setMainImage] = useState(PRODUCT_IMAGES.smt[0]);
  const [openFaq, setOpenFaq] = useState(null);

  const currentTest = TEST_OPTIONS[selectedTest];
  const currentImages = PRODUCT_IMAGES[selectedTest];

  useEffect(() => {
    setMainImage(currentImages[0]);
  }, [selectedTest, currentImages]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (testId, qty = quantity) => {
    const test = TEST_OPTIONS[testId];
    const existingItem = cartItems.find((item) => item.id === testId);
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === testId ? { ...item, quantity: item.quantity + qty } : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: testId,
          name: test.name,
          testType: test.badge,
          price: test.price,
          quantity: qty,
          image: currentImages[0],
        },
      ]);
    }
    showToast(`${test.name} added to cart`);
    setCartOpen(true);
  };

  const addBothToCart = () => {
    addToCart("smt", 1);
    addToCart("gmt", 1);
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      showToast("Item removed");
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed");
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4FAFB] via-white to-[#E8F4F7] overflow-x-hidden">
     

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section unchanged */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left: Image Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-[#D9EEF2] group">
              <div className="relative h-80 md:h-96 w-full cursor-pointer">
                <Image
                  src={mainImage}
                  alt={`${currentTest.name} test`}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full p-1.5 shadow-md">
                  <ZoomIn size={18} className="text-[#18606D]" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === img ? "border-[#18606D] shadow-md" : "border-[#D9EEF2] opacity-70"
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} width={80} height={80} className="object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details + Test Selector */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A]">
              {currentTest.name}
            </h1>
            <p className="text-[#18606D] text-sm font-medium mt-2 flex items-center gap-2">
              <Shield size={14} /> At-home sample collection | No fasting | 20 Min Expert consultation included | NABL Certified Lab
            </p>
            {(() => {
              const hasDiscount = currentTest.fullPrice && currentTest.price && (currentTest.price < currentTest.fullPrice);
              return (
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#18606D]">
                    ₹{hasDiscount ? currentTest.price : (currentTest.fullPrice || currentTest.price)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm text-[#94A3B8] line-through">₹{currentTest.fullPrice}</span>
                      <span className="text-xs bg-[#E8F4F7] text-[#18606D] px-2 py-0.5 rounded-full">
                        Save {Math.round(((currentTest.fullPrice - currentTest.price) / currentTest.fullPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              );
            })()}
            <p className="text-xs text-[#64748B] mt-1">{currentTest.taxNote}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {currentTest.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <benefit.icon size={18} className="text-[#18606D] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{benefit.title}</p>
                    <p className="text-xs text-[#64748B]">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-semibold text-[#0F172A] mb-3">Select your test package:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {Object.entries(TEST_OPTIONS).map(([key, test]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTest(key)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
                      selectedTest === key
                        ? "border-[#18606D] bg-[#F4FAFB] shadow-md"
                        : "border-[#D9EEF2] bg-white hover:shadow"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-[#0F172A]">{test.name}</p>
                        <p className="text-xs text-[#64748B]">{test.badge}</p>
                      </div>
                      {test.recommended && (
                        <span className="text-[10px] bg-[#2A7F8F] text-white px-2 py-0.5 rounded-full">Recommended</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#18606D] mt-2">₹{test.price}</p>
                    <p className="text-[10px] text-[#64748B] mt-1">{test.sampleType} sample</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 border border-[#D9EEF2] rounded-xl px-3 py-2 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => addToCart(selectedTest, quantity)}
                className="flex-1 py-3 bg-gradient-to-r from-[#18606D] to-[#2A7F8F] text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                Add to Cart <ShoppingCart size={18} />
              </button>
              <button className="py-3 px-5 border border-[#18606D] text-[#18606D] rounded-xl font-semibold hover:bg-[#18606D] hover:text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Warning Box (keeping original, but you may replace with AwarenessBanner if desired) */}
        <div className="mb-16 bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            If untreated, H. pylori can cause <strong>peptic ulcer in &gt;80% of carriers within 12 years</strong> and 
            <strong> gastric cancer in 2% of carriers within 15 years.</strong> Early detection saves lives.
          </p>
        </div>

        {/* NEW Premium Banners */}
        <ReportDownloadBanner />
        <AwarenessBanner />

        {/* Existing Sections */}
        <WhyChooseUs />
        <ImageSteps />
        <PostTestFlow />
        <ComparisonTable />

        {/* Consultation CTA */}
        <div className="mb-20 bg-gradient-to-r from-[#18606D] to-[#2A7F8F] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold">Get questions? Consult a Gut Expert</h3>
          <p className="mt-2 opacity-90">Book a consultation with Sova’s Gut Health Expert. Get recommendations on your condition and which course of action is right for you.</p>
          <button className="mt-6 px-6 py-2 bg-white text-[#18606D] rounded-full font-semibold hover:shadow-lg transition inline-flex items-center gap-2">
            Book a Consultation <MessageCircle size={16} />
          </button>
        </div>

        {/* Meet Our Gut Experts */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">Meet Our Gut Experts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {EXPERTS.map((expert, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-md border border-[#D9EEF2] hover:shadow-lg transition">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#18606D]">
                  <Image src={expert.image} alt={expert.name} width={96} height={96} className="object-cover" />
                </div>
                <h4 className="font-bold text-[#0F172A]">{expert.name}</h4>
                <p className="text-sm text-[#18606D]">{expert.role}</p>
                <p className="text-xs text-[#64748B] mt-1">{expert.qualification}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-[#D9EEF2] overflow-hidden hover:shadow-md transition">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#F4FAFB] transition"
                >
                  <span className="font-semibold text-[#0F172A]">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-[#64748B] border-t border-[#D9EEF2]"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-20 text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Customer Reviews</h2>
          <div className="bg-white rounded-xl p-8 shadow-md border border-[#D9EEF2] max-w-md mx-auto hover:shadow-lg transition">
            <div className="flex justify-center gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-current w-5 h-5" />
              ))}
            </div>
            <p className="text-[#64748B]">Be the first to write a review</p>
            <button className="mt-4 text-[#18606D] font-semibold underline flex items-center gap-1 mx-auto">
              Write a review <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Combo Offer */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#18606D] to-[#2A7F8F] shadow-xl mb-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-[#CFE8EC]" />
                  <span className="text-sm font-semibold tracking-wide">COMBO OFFER</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">Get Complete Gut Analysis</h3>
                <p className="text-[#CFE8EC] mt-2 max-w-md">SMT + GMT together for a holistic understanding of your gut.</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl font-bold">₹{COMBO.discountedPrice}</span>
                  <span className="text-lg line-through opacity-80">₹{TEST_OPTIONS.smt.price + TEST_OPTIONS.gmt.price}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">Save ₹{COMBO.savings}</span>
                </div>
                <ul className="mt-4 space-y-1 text-sm">
                  <li className="flex items-center gap-2">✔️ Complete biomarker coverage</li>
                  <li className="flex items-center gap-2">✔️ 3 doctor consultations</li>
                  <li className="flex items-center gap-2">✔️ Personalised gut health action plan</li>
                </ul>
              </div>
              <button
                onClick={addBothToCart}
                className="px-8 py-3 bg-white text-[#18606D] rounded-xl font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2"
              >
                Add Both to Cart <Tag size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#D9EEF2] p-4 shadow-lg z-40">
        <button
          onClick={() => addToCart(selectedTest, quantity)}
          className="w-full py-3 bg-gradient-to-r from-[#18606D] to-[#2A7F8F] text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          Add to Cart <ShoppingCart size={18} />
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#18606D] text-white px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2"
          >
            <CheckCircle size={16} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
      />
    </div>
  );
}