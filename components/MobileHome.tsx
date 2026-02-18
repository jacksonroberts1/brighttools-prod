'use client'

import { useState } from 'react'
import Scene3D from '@/components/Scene3D'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import AnimatedCounter from '@/components/AnimatedCounter'
import FAQItem from '@/components/FAQItem'
import LogoWithSprite from '@/components/LogoWithSprite'
import MouseGlow from '@/components/MouseGlow'
import ChatTypingAnimation from '@/components/ChatTypingAnimation'
import ContactModal from '@/components/ContactModal'

export default function MobileHome() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-black">
      {/* Mouse-reactive glow */}
      <MouseGlow />

      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Scene3D />
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center">
        {/* Hero Section */}
        <Section noPadding className="min-h-screen flex items-start justify-center">
            <div className="max-w-[1600px] mx-auto w-full px-4 pt-32 pb-24 text-center">
              <LogoWithSprite>
                <h1 className="text-7xl md:text-9xl font-black mb-10 text-white brand-title">
                  BrightTools
                </h1>
              </LogoWithSprite>
              {/* Strong headline with professional styling */}
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-medium brand-subtitle">
                Unlock the AI potential already sitting in your office.
              </p>

              <div className="mt-16 mb-8">
                <div className="mb-6">
                  <div className="text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-2">
                    Applied Framework
                  </div>
                  <div className="text-base font-semibold text-cyan-400/70 uppercase tracking-wide">
                    Role • Format • Context • Logic
                  </div>
                </div>
                {/* 2 columns for readability */}
                <div className="grid grid-cols-2 gap-2 items-center">
                  <div className="relative w-full flex flex-col items-center p-3">
                    <div className="text-2xl font-black text-white mb-4 tracking-widest h-[2.5rem] flex items-center justify-center">
                      BEFORE
                    </div>
                    <ChatTypingAnimation
                      text="Summarize this quarterly report."
                      variant="before"
                      delay={300}
                    />
                  </div>

                  <div className="relative w-full flex flex-col items-center p-3">
                    <div className="text-2xl font-black text-cyan-400 mb-4 tracking-widest h-[2.5rem] flex items-center justify-center drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                      AFTER
                    </div>
                    <ChatTypingAnimation
                      text="Review this quarterly report. Identify core performance drivers, cash flow and margin quality, growth constraints, and emerging risk signals. No generic summary. Every recommendation must include clear, causal reasoning tied to the data."
                      variant="after"
                      delay={300}
                    />
                  </div>
                </div>
                <span className="sr-only">Before and after prompt training demo videos.</span>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </Section>

          {/* Universal Skill Section */}
          <Section className="relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                <div className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                        Universal Skill
                      </span>
                    </div>
                    {/* Massive display serif headline */}
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] brand-title mb-4">
                      One Skill.
                    </h2>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white/70 leading-tight brand-title">
                      Infinite Tools.
                    </h2>
                    {/* Small supporting copy */}
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-normal brand-body max-w-md"></p>
                  </div>
                </div>

                <div className="relative pl-6 md:pl-10">
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
                  {/* Stronger typography with professional weight */}
                  <p className="text-lg md:text-lg font-medium text-white leading-relaxed mb-6 brand-body">
                    Platforms change, but the communication logic of AI is permanent.
                  </p>
                  <p className="text-lg md:text-lg font-medium text-white leading-relaxed mb-6 brand-body">
                    Prompting is the universal operating system for any AI tool, today or 10 years from now.
                  </p>
                  <p className="text-lg md:text-lg font-medium text-white leading-relaxed brand-body">
                    Whether you’re using ChatGPT, Claude, Midjourney, or a custom enterprise tool, Prompt Engineering is the 'operating system' of the modern office.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* AI Capabilities Section */}
          <Section className="relative overflow-hidden -mt-20 md:-mt-32 pt-32 md:pt-48">
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section header with visual accent */}
              <div className="mb-8 space-y-4">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                    Capabilities
                  </span>
                  {/* Massive display serif */}
                  <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] brand-title">
                    What We Do
                  </h2>
                </div>
              </div>

              {/* What We Do layout */}
              <div className="space-y-16">
                <div className="max-w-6xl space-y-8">
                  {/* Small supporting text */}
                  <p className="text-lg md:text-xl text-white/85 leading-tight font-bold brand-body">
                    BrightTools trains office teams to get reliable, high-quality AI output without turning them into engineers.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <Card delay={0} className="group relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative h-full flex flex-col">
                      {/* Improved numerical label contrast */}
                      <div className="flex items-start justify-between mb-8">
                        <span className="text-6xl font-bold text-white/8 leading-none">01</span>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-black text-right leading-none pt-2">
                          Professional Results
                        </span>
                      </div>
                      {/* Enhanced heading with better visual hierarchy */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight brand-title">
                        Prompt engineering frameworks
                      </h3>
                      {/* Improved text color and line-height for better readability */}
                      <p className="text-lg text-white/60 leading-relaxed flex-1 font-normal brand-body">
                        Repeatable prompt structures your team can trust, so outputs stay consistent, on-brand, and carry real utility.
                      </p>
                    </div>
                  </Card>

                  <Card delay={0.1} className="group relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative h-full flex flex-col">
                      <div className="flex items-start justify-between mb-8">
                        <span className="text-6xl font-bold text-white/8 leading-none">02</span>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-black text-right leading-none pt-2">
                          Security + Consistency
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight brand-title">
                        Human-in-the-loop method
                      </h3>
                      <p className="text-lg text-white/60 leading-relaxed flex-1 font-normal brand-body">
                        Review steps and processes keep sensitive data safe, ensuring security and consistency across teams and tools.
                      </p>
                    </div>
                  </Card>

                  <Card delay={0.2} className="group relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative h-full flex flex-col">
                      <div className="flex items-start justify-between mb-8">
                        <span className="text-6xl font-bold text-white/8 leading-none">03</span>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-black text-right leading-none pt-2">
                          Workflow Integration
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight brand-title">
                        Applied use
                      </h3>
                      <p className="text-lg text-white/60 leading-relaxed flex-1 font-normal brand-body">
                        Prompt Frameworks prove useful far beyond just LLMs. Applicable uses in docs, email, SOPs and CRMs so AI actually fits the day-to-day of your teams.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Section>

          {/* Why It Works Section */}
          <Section className="relative overflow-hidden -mt-12 md:-mt-20 pt-20 md:pt-28">
            <div className="max-w-6xl mx-auto relative z-10">
              {/* Header with reversed accent */}
              <div className="space-y-4 mb-16">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                    The Difference
                  </span>
                  {/* Massive display serif heading */}
                  <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] brand-title mt-3">
                    Why BrightTools Works
                  </h2>
                </div>
              </div>

              <div className="space-y-12">
                <div className="grid md:grid-cols-[1fr] gap-6 items-start">
                  <div>
                    {/* Large serif subheading */}
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight brand-title">
                      You've got the power. But are you using it right?
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-normal brand-body">
                      Every business uses an AI tool. But most clients get repetitive or generic 'recap' type results. With the proper training, any employee can plan & design enterprise-grade prompts that fit their specific needs.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[1fr] gap-6 items-start">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight brand-title">
                      Skills that stick around. Platforms don't.
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-normal brand-body">
                      ChatGPT, Claude, some new AI tool next month... they're all the same conversation underneath. We teach the underlying logic, not buttons and menus. Your team learns once and applies it anywhere, forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Our Process Section */}
          <Section className="relative overflow-hidden -mt-16 md:-mt-24 pt-24 md:pt-36">
            <div className="max-w-6xl mx-auto relative z-10">
              {/* Header with side accent and gradient text */}
              <div className="space-y-4 mb-16">
                <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                  Our Approach
                </span>
                {/* Massive display serif */}
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] brand-title">
                  How We Work
                </h2>
              </div>

              <div className="relative max-w-5xl mx-auto">
                {/* Flowing vertical process with connectors */}
                <div className="space-y-8">
                  {/* First step */}
                  <div className="relative">
                    <div className="flex items-start gap-8">
                      <div className="flex-1">
                        <h3 className="text-5xl md:text-7xl font-black text-white brand-title leading-[0.9] mb-6">
                          Understand<br />Your Workflow
                        </h3>
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-normal brand-body">
                          We meet with your team & see how your team is already utilizing AI. We construct a curriculum around what your core business functions require from LLMs.
                        </p>
                      </div>
                    </div>
                    {/* Connector */}
                    <div className="flex items-center gap-3 my-6 ml-4">
                      <div className="w-px h-12 bg-gradient-to-b from-cyan-400/40 to-cyan-400/20" />
                      <div className="w-px h-12 bg-gradient-to-b from-cyan-400/20 to-cyan-400/10" />
                    </div>
                  </div>

                  {/* Second step - indented */}
                  <div className="relative md:pl-16">
                    <div className="flex items-start gap-8">
                      <div className="flex-1">
                        <h3 className="text-5xl md:text-7xl font-black text-white brand-title leading-[0.9] mb-6">
                          Deploy &<br />Integrate
                        </h3>
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-normal brand-body">
                          Results don't come months down the line. Our training & curriculum results are evident at 8AM after your team's training. This isn't just another monthly subscription, this is instilling researched & proven frameworks to get the AI capability you already pay for.
                        </p>
                      </div>
                    </div>
                    {/* Connector */}
                    <div className="flex items-center gap-3 my-6 ml-4">
                      <div className="w-px h-12 bg-gradient-to-b from-cyan-400/40 to-cyan-400/20" />
                      <div className="w-px h-12 bg-gradient-to-b from-cyan-400/20 to-cyan-400/10" />
                    </div>
                  </div>

                  {/* Third step - indented */}
                  <div className="relative md:pl-32">
                    <div className="flex items-start gap-8">
                      <div className="flex-1">
                        <h3 className="text-5xl md:text-7xl font-black text-white brand-title leading-[0.9] mb-6">
                          Evolve &<br />Optimize
                        </h3>
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-normal brand-body">
                          No need for more AI enterprise subscriptions. Your team has the ability to construct enterprise level prompts that power almost every AI tool on the market.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Testimonials Section */}
          <Section className="relative overflow-hidden -mt-20 md:-mt-32 pt-32 md:pt-44">
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Header with accent bar on right */}
              <div className="space-y-4 mb-20">
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                    Testimonials
                  </span>
                  {/* Massive display serif */}
                  <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] brand-title mt-3">
                    Trusted by Forward-Thinking Teams
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass glass-hover rounded-2xl p-8 border border-white/10">
                  <div className="flex gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-white text-xs">★</span>
                      </div>
                    ))}
                  </div>
                  {/* Improved text styling with better contrast and line-height */}
                  <p className="text-gray-200 italic mb-8 text-lg leading-relaxed font-medium brand-body">
                    "The curriculum is what stood out to us. Several employees noted it."
                  </p>
                  <div className="h-px bg-white/10 mb-6" />
                  <div>
                    <div className="text-white font-semibold text-lg">Gustav</div>
                    <div className="text-gray-500 text-sm mt-1">
                      Founder, Philadelphia-based Insurance Company
                    </div>
                  </div>
                </div>

                <div className="glass glass-hover rounded-2xl p-8 border border-white/10">
                  <div className="flex gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-white text-xs">★</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-200 italic mb-8 text-lg leading-relaxed font-medium brand-body">
                    "Cancelled half of our sales enterprise AI subscriptions. The team only needed a single LLM to get same exact results. Highly recommend if looking to streamline AI dependency."
                  </p>
                  <div className="h-px bg-white/10 mb-6" />
                  <div>
                    <div className="text-white font-semibold text-lg">Marc</div>
                    <div className="text-gray-500 text-sm mt-1">
                      CSO, Denver-based Marketing Agency
                    </div>
                  </div>
                </div>

                <div className="glass glass-hover rounded-2xl p-8 border border-white/10">
                  <div className="flex gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-white text-xs">★</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-200 italic mb-8 text-lg leading-relaxed font-medium brand-body">
                    "Deliverables proved useful. Frameworks & curriculum resonated well. For future internal AI use we will refer back to this team."
                  </p>
                  <div className="h-px bg-white/10 mb-6" />
                  <div>
                    <div className="text-white font-semibold text-lg">Priyanka</div>
                    <div className="text-gray-500 text-sm mt-1">
                      Founder, New York City-based Startup
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* CTA Section */}
          <Section className="relative overflow-hidden -mt-16 md:-mt-24 pt-24 md:pt-36">
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="text-center">
                <p className="text-xl md:text-2xl text-white font-bold brand-body">
                  Let's get started.
                </p>
              </div>
            </div>
          </Section>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  )
}
