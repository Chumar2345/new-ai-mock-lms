"use client";
import Head from "next/head";
import Image from "next/image";
import styles  from "./Home.module.css";
import HeroSection from "@/components/ui/HeroSection";
import FeatureSection from "@/components/ui/FeatureSection";
import MockInterviewSection from "@/components/ui/MockInterviewSection";
import VoiceInteractionSection from "@/components/ui/VoiceInteractionSection";
import PerformanceReportSection from "@/components/ui/PerformanceReportSection";
import SuccessStoriesSection from "@/components/ui/SuccessStoriesSection";
import NewCareerSection from "@/components/ui/NewCareerSection";
import FAQSection from "@/components/ui/FAQSection";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeatureSection />
      <MockInterviewSection />
      <VoiceInteractionSection />
      <PerformanceReportSection />
      <FAQSection />
      <SuccessStoriesSection />
      <NewCareerSection />
      <Footer />
    </div>
  );
}
