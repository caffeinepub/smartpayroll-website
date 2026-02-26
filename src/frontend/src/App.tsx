import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  CheckCircle2,
  Star,
  Menu,
  X,
  Zap,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  Play,
  Heart,
  MessageCircle,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface Testimonial {
  quote: string;
  name: string;
  company: string;
  role: string;
  stars: number;
}

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES: FeatureCard[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Automated Payroll Processing",
    description:
      "Run payroll in minutes, not hours. Our engine handles calculations, deductions, and disbursements automatically every pay cycle.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Tax Compliance & Filing",
    description:
      "Stay compliant effortlessly. SmartPayroll calculates, files, and remits taxes to the right authorities — on time, every time.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Employee Self-Service Portal",
    description:
      "Empower your team with 24/7 access to pay stubs, tax documents, and leave balances — reducing HR queries by up to 60%.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Real-Time Reporting & Analytics",
    description:
      "Instant insights into payroll costs, headcount trends, and budget forecasting — all in a beautiful, exportable dashboard.",
  },
];

const PRICING: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams just getting started with payroll.",
    features: [
      "Up to 10 employees",
      "Basic payroll processing",
      "Email support",
      "Pay stubs & reports",
      "Direct deposit",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "The complete payroll solution for growing businesses.",
    features: [
      "Up to 50 employees",
      "Tax filing & compliance",
      "Priority support",
      "Employee self-service portal",
      "Advanced reporting",
      "Multi-state payroll",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored payroll infrastructure for large organizations.",
    features: [
      "Unlimited employees",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "White-glove onboarding",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "SmartPayroll saved us hours every month. What used to take our HR team half a day now takes about 15 minutes. The tax filing alone is worth every penny.",
    name: "Sarah M.",
    company: "TechCorp",
    role: "Head of HR",
    stars: 5,
  },
  {
    quote:
      "Finally, payroll I don't dread. The interface is clean, the reports are instant, and our team actually loves the self-service portal. Genuinely impressive.",
    name: "James K.",
    company: "GreenLeaf Ltd",
    role: "CEO",
    stars: 5,
  },
  {
    quote:
      "Our compliance issues are a thing of the past. We expanded to three new states and SmartPayroll handled everything seamlessly. I can't imagine going back.",
    name: "Aisha R.",
    company: "NovaBuild",
    role: "Finance Director",
    stars: 5,
  },
];

const VALUES: ValueCard[] = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Reliability",
    description:
      "99.9% uptime SLA with automatic failover. Your payroll runs on schedule, no matter what.",
  },
  {
    icon: <CheckCircle2 className="w-7 h-7" />,
    title: "Compliance",
    description:
      "Always up to date with the latest tax laws and regulations, so you never have to worry.",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Simplicity",
    description:
      "Built for business owners, not accountants. If you can send an email, you can run payroll.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
        {Array.from({ length: count }, (_, i) => i).map((i) => (
        <Star key={`star-${i}`} className="w-4 h-4 fill-current text-emerald" />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-4">
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full"
        style={{
          background: "oklch(0.72 0.17 162 / 12%)",
          color: "oklch(0.72 0.17 162)",
          border: "1px solid oklch(0.72 0.17 162 / 30%)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.13 0.025 264 / 97%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid oklch(1 0 0 / 8%)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 32px oklch(0.08 0.02 264 / 50%)"
          : "none",
      }}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
            aria-label="SmartPayroll Home"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.72 0.17 162)" }}
            >
              <DollarSign className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="font-heading font-800 text-lg tracking-tight"
              style={{ color: "oklch(0.97 0.005 264)" }}
            >
              Smart<span style={{ color: "oklch(0.72 0.17 162)" }}>Payroll</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: "oklch(0.80 0.01 264)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.97 0.005 264)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.80 0.01 264)")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <Button
                size="sm"
                className="font-heading font-semibold text-sm px-5"
                style={{
                  background: "oklch(0.72 0.17 162)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                Book a Demo
              </Button>
            </a>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "oklch(0.80 0.01 264)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div
            className="md:hidden border-t py-4 flex flex-col gap-2"
            style={{ borderColor: "oklch(1 0 0 / 10%)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "oklch(0.80 0.01 264)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="w-full mt-2 font-heading font-semibold"
              style={{
                background: "oklch(0.72 0.17 162)",
                color: "oklch(0.99 0 0)",
              }}
              onClick={() => {
                setMenuOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book a Demo
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.13 0.025 264) 0%, oklch(0.18 0.048 240) 55%, oklch(0.24 0.06 218) 100%)",
      }}
    >
      {/* Decorative shapes */}
      <div
        className="hero-shape w-[600px] h-[600px] -top-32 -right-40 opacity-25"
        style={{ background: "oklch(0.72 0.17 162)" }}
      />
      <div
        className="hero-shape w-[400px] h-[400px] bottom-0 left-0 opacity-15"
        style={{ background: "oklch(0.48 0.12 240)" }}
      />
      <div
        className="hero-shape w-[200px] h-[200px] top-1/3 left-1/4 opacity-10"
        style={{ background: "oklch(0.72 0.17 162)" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0 0) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-20">
        <div className="max-w-3xl">
          <div className="animate-fade-up">
            <SectionLabel>
              <Zap className="w-3 h-3" />
              Payroll for modern businesses
            </SectionLabel>
          </div>

          <h1
            className="font-heading font-900 text-5xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight mt-6 animate-fade-up-delay-1"
            style={{ color: "oklch(0.97 0.005 264)" }}
          >
            Payroll Made{" "}
            <span
              className="relative inline-block"
              style={{ color: "oklch(0.72 0.17 162)" }}
            >
              Simple,
            </span>
            <br />
            Fast &amp; Compliant
          </h1>

          <p
            className="mt-6 text-lg sm:text-xl max-w-xl leading-relaxed animate-fade-up-delay-2"
            style={{ color: "oklch(0.72 0.03 264)" }}
          >
            Automate your payroll, reduce errors, and pay your team on time —
            every time. Built for small and mid-sized businesses who'd rather
            focus on growth.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-up-delay-3">
            <a href="#contact">
              <Button
                size="lg"
                className="font-heading font-semibold text-base px-8 py-3 h-auto rounded-xl shadow-emerald-glow transition-all duration-200 hover:scale-105"
                style={{
                  background: "oklch(0.72 0.17 162)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                Book a Free Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="#features">
              <Button
                size="lg"
                variant="outline"
                className="font-heading font-semibold text-base px-8 py-3 h-auto rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "oklch(1 0 0 / 25%)",
                  color: "oklch(0.97 0.005 264)",
                  background: "transparent",
                }}
              >
                <Play className="mr-2 w-4 h-4" />
                See How It Works
              </Button>
            </a>
          </div>

          {/* Social proof */}
          <div
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 animate-fade-up-delay-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["S", "J", "A", "M"].map((initial, i) => (
                  <div
                    key={`avatar-${initial}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2"
                    style={{
                      background:
                        i === 0
                          ? "oklch(0.65 0.15 160)"
                          : i === 1
                          ? "oklch(0.55 0.12 240)"
                          : i === 2
                          ? "oklch(0.60 0.14 300)"
                          : "oklch(0.58 0.13 50)",
                      borderColor: "oklch(0.18 0.048 240)",
                      color: "oklch(0.98 0 0)",
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.72 0.03 264)" }}
              >
                500+ companies onboard
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                    style={{ color: "oklch(0.80 0.16 85)" }}
                  />
                ))}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.72 0.03 264)" }}
              >
                4.9/5 average rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.97 0.003 264)" }}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Features</SectionLabel>
          <h2
            className="font-heading font-800 text-4xl sm:text-5xl leading-tight tracking-tight mt-4"
            style={{ color: "oklch(0.18 0.035 264)" }}
          >
            Everything You Need{" "}
            <span style={{ color: "oklch(0.60 0.15 162)" }}>to Run Payroll</span>
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "oklch(0.45 0.02 264)" }}
          >
            From automated calculations to compliance — all in one platform that
            grows with your team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group rounded-2xl p-6 border"
              style={{
                background: "oklch(1 0 0)",
                borderColor: "oklch(0.90 0.01 264)",
                boxShadow: "0 2px 12px oklch(0.18 0.035 264 / 6%)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 group-hover:scale-110"
                style={{
                  background: "oklch(0.72 0.17 162 / 12%)",
                  color: "oklch(0.58 0.16 162)",
                }}
              >
                {feature.icon}
              </div>
              <h3
                className="font-heading font-700 text-lg leading-snug mb-3"
                style={{ color: "oklch(0.18 0.035 264)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.48 0.02 264)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.025 264) 0%, oklch(0.18 0.035 264) 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0 0) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Pricing</SectionLabel>
          <h2
            className="font-heading font-800 text-4xl sm:text-5xl leading-tight tracking-tight mt-4"
            style={{ color: "oklch(0.97 0.005 264)" }}
          >
            Simple, Transparent{" "}
            <span style={{ color: "oklch(0.72 0.17 162)" }}>Pricing</span>
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "oklch(0.68 0.02 264)" }}
          >
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start md:items-stretch">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col border transition-transform duration-200 ${
                plan.popular ? "pricing-card-popular" : ""
              }`}
              style={
                plan.popular
                  ? {
                      background: "oklch(0.72 0.17 162)",
                      borderColor: "transparent",
                      boxShadow:
                        "0 0 0 1px oklch(0.72 0.17 162), 0 24px 60px oklch(0.40 0.15 162 / 50%)",
                    }
                  : {
                      background: "oklch(0.22 0.04 264)",
                      borderColor: "oklch(1 0 0 / 10%)",
                    }
              }
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge
                    className="font-heading font-700 text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.99 0 0)",
                      color: "oklch(0.50 0.16 162)",
                    }}
                  >
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <p
                  className="font-heading font-700 text-lg mb-1"
                  style={{
                    color: plan.popular
                      ? "oklch(0.99 0 0)"
                      : "oklch(0.88 0.01 264)",
                  }}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mt-2">
                  <span
                    className="font-heading font-900 text-4xl leading-none"
                    style={{
                      color: plan.popular ? "oklch(0.99 0 0)" : "oklch(0.97 0 0)",
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className="text-base mb-0.5 font-medium"
                      style={{
                        color: plan.popular
                          ? "oklch(0.90 0 0 / 80%)"
                          : "oklch(0.60 0.02 264)",
                      }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{
                    color: plan.popular
                      ? "oklch(0.96 0 0 / 80%)"
                      : "oklch(0.58 0.02 264)",
                  }}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <CheckCircle2
                      className="w-4.5 h-4.5 shrink-0"
                      style={{
                        color: plan.popular
                          ? "oklch(0.99 0 0 / 85%)"
                          : "oklch(0.72 0.17 162)",
                      }}
                    />
                    <span
                      className="text-sm"
                      style={{
                        color: plan.popular
                          ? "oklch(0.97 0 0 / 90%)"
                          : "oklch(0.72 0.02 264)",
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#contact">
                <Button
                  className="w-full font-heading font-700 rounded-xl py-2.5 h-auto text-sm transition-all duration-200 hover:scale-105"
                  style={
                    plan.popular
                      ? {
                          background: "oklch(0.99 0 0)",
                          color: "oklch(0.50 0.16 162)",
                        }
                      : {
                          background: "oklch(0.72 0.17 162)",
                          color: "oklch(0.99 0 0)",
                        }
                  }
                >
                  {plan.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.97 0.003 264)" }}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Testimonials</SectionLabel>
          <h2
            className="font-heading font-800 text-4xl sm:text-5xl leading-tight tracking-tight mt-4"
            style={{ color: "oklch(0.18 0.035 264)" }}
          >
            Trusted by Hundreds of{" "}
            <span style={{ color: "oklch(0.60 0.15 162)" }}>Businesses</span>
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: "oklch(0.48 0.02 264)" }}
          >
            Don't take our word for it — hear from the teams who run payroll
            with SmartPayroll every month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="feature-card rounded-2xl p-7 border flex flex-col"
              style={{
                background: "oklch(1 0 0)",
                borderColor: "oklch(0.90 0.01 264)",
                boxShadow: "0 2px 12px oklch(0.18 0.035 264 / 6%)",
              }}
            >
              <StarRating count={testimonial.stars} />
              <blockquote
                className="mt-4 flex-1 text-base leading-relaxed font-medium"
                style={{ color: "oklch(0.28 0.02 264)" }}
              >
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t" style={{ borderColor: "oklch(0.92 0.01 264)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-700 text-sm shrink-0"
                  style={{
                    background: "oklch(0.72 0.17 162 / 12%)",
                    color: "oklch(0.55 0.16 162)",
                  }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div
                    className="font-heading font-700 text-sm"
                    style={{ color: "oklch(0.18 0.035 264)" }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.02 264)" }}
                  >
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "oklch(0.18 0.035 264)" }}
    >
      <div
        className="hero-shape w-[500px] h-[500px] -top-40 -left-40 opacity-10"
        style={{ background: "oklch(0.72 0.17 162)" }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>About Us</SectionLabel>
            <h2
              className="font-heading font-800 text-4xl sm:text-5xl leading-tight tracking-tight mt-4"
              style={{ color: "oklch(0.97 0.005 264)" }}
            >
              Built for the{" "}
              <span style={{ color: "oklch(0.72 0.17 162)" }}>Real World</span>
              ,<br />
              not the spreadsheet
            </h2>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: "oklch(0.68 0.02 264)" }}
            >
              We built SmartPayroll to take the complexity out of payroll for
              small and mid-sized businesses. Too many owners were spending
              weekends buried in spreadsheets, stressing over tax deadlines, and
              chasing down HR paperwork.
            </p>
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: "oklch(0.68 0.02 264)" }}
            >
              We knew there had to be a better way. SmartPayroll is the result
              — a platform that handles the hard parts automatically, so you can
              focus on what you actually started your business to do.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { number: "500+", label: "Companies" },
                { number: "50K+", label: "Employees Paid" },
                { number: "$2B+", label: "Processed" },
                { number: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-heading font-900 text-3xl"
                    style={{ color: "oklch(0.72 0.17 162)" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: "oklch(0.60 0.02 264)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="feature-card rounded-2xl p-6 border flex gap-5 items-start"
                style={{
                  background: "oklch(0.22 0.04 264)",
                  borderColor: "oklch(1 0 0 / 8%)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.72 0.17 162 / 15%)",
                    color: "oklch(0.72 0.17 162)",
                  }}
                >
                  {value.icon}
                </div>
                <div>
                  <h3
                    className="font-heading font-700 text-lg"
                    style={{ color: "oklch(0.97 0.005 264)" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{ color: "oklch(0.60 0.02 264)" }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

interface FormState {
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  companyName: "",
  phone: "",
  message: "",
};

function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.97 0.003 264)" }}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div>
            <SectionLabel>Get Started</SectionLabel>
            <h2
              className="font-heading font-800 text-4xl sm:text-5xl leading-tight tracking-tight mt-4"
              style={{ color: "oklch(0.18 0.035 264)" }}
            >
              Book Your{" "}
              <span style={{ color: "oklch(0.60 0.15 162)" }}>Free Demo</span>
            </h2>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: "oklch(0.45 0.02 264)" }}
            >
              See SmartPayroll in action. A product specialist will walk you
              through the platform tailored to your business in 30 minutes.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {[
                {
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  text: "No credit card required",
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  text: "Live walkthrough with a real expert",
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  text: "Custom setup for your team size",
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  text: "Get started in under 24 hours",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span style={{ color: "oklch(0.60 0.15 162)" }}>
                    {item.icon}
                  </span>
                  <span
                    className="text-base font-medium"
                    style={{ color: "oklch(0.30 0.02 264)" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-10 flex items-center gap-4 p-5 rounded-2xl border"
              style={{
                background: "oklch(1 0 0)",
                borderColor: "oklch(0.90 0.01 264)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "oklch(0.72 0.17 162 / 12%)",
                  color: "oklch(0.55 0.16 162)",
                }}
              >
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p
                  className="font-heading font-700 text-sm"
                  style={{ color: "oklch(0.20 0.03 264)" }}
                >
                  Prefer to chat right now?
                </p>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors"
                  style={{ color: "oklch(0.55 0.16 162)" }}
                >
                  Message us on WhatsApp →
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            className="rounded-2xl border p-8 shadow-card-navy"
            style={{
              background: "oklch(1 0 0)",
              borderColor: "oklch(0.90 0.01 264)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col py-6">
                {/* Success header */}
                <div className="flex flex-col items-center text-center mb-7">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "oklch(0.72 0.17 162 / 12%)" }}
                  >
                    <CheckCircle2
                      className="w-8 h-8"
                      style={{ color: "oklch(0.60 0.15 162)" }}
                    />
                  </div>
                  <h3
                    className="font-heading font-800 text-2xl"
                    style={{ color: "oklch(0.18 0.035 264)" }}
                  >
                    Request Sent!
                  </h3>
                  <p
                    className="mt-2 text-base leading-relaxed max-w-xs"
                    style={{ color: "oklch(0.48 0.02 264)" }}
                  >
                    Thanks, <strong>{form.fullName.split(" ")[0] || "there"}</strong>. Here's what happens next:
                  </p>
                </div>

                {/* Next steps */}
                <div className="flex flex-col gap-3 mb-7">
                  {[
                    {
                      step: "1",
                      title: "We review your request",
                      detail: "Our team reviews your details within a few hours.",
                    },
                    {
                      step: "2",
                      title: "We reach out within 24 hours",
                      detail: "A product specialist will contact you by email or phone.",
                    },
                    {
                      step: "3",
                      title: "Your demo is scheduled",
                      detail: "A 30-minute live walkthrough tailored to your business.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-3 p-4 rounded-xl border"
                      style={{
                        background: "oklch(0.97 0.003 264)",
                        borderColor: "oklch(0.90 0.01 264)",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-700 shrink-0 mt-0.5"
                        style={{
                          background: "oklch(0.72 0.17 162)",
                          color: "oklch(0.99 0 0)",
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <p
                          className="font-heading font-700 text-sm"
                          style={{ color: "oklch(0.18 0.035 264)" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-xs mt-0.5 leading-relaxed"
                          style={{ color: "oklch(0.50 0.02 264)" }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl font-heading font-700 text-sm transition-all duration-200 hover:scale-105 mb-3"
                  style={{
                    background: "oklch(0.55 0.20 145)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  <SiWhatsapp className="w-5 h-5" />
                  Chat with us on WhatsApp now
                </a>

                {/* Back to home */}
                <button
                  type="button"
                  className="text-sm font-medium text-center transition-colors"
                  style={{ color: "oklch(0.58 0.02 264)" }}
                  onClick={() => {
                    setSubmitted(false);
                    setForm(INITIAL_FORM);
                    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Back to home
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3
                  className="font-heading font-700 text-xl mb-1"
                  style={{ color: "oklch(0.18 0.035 264)" }}
                >
                  Request a Demo
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.30 0.02 264)" }}
                    >
                      Full Name <span style={{ color: "oklch(0.55 0.16 162)" }}>*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="rounded-lg border-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.30 0.02 264)" }}
                    >
                      Work Email <span style={{ color: "oklch(0.55 0.16 162)" }}>*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@company.com"
                      className="rounded-lg border-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="companyName"
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.30 0.02 264)" }}
                    >
                      Company Name <span style={{ color: "oklch(0.55 0.16 162)" }}>*</span>
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Acme Corp"
                      className="rounded-lg border-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.30 0.02 264)" }}
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="rounded-lg border-input"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.30 0.02 264)" }}
                  >
                    Message{" "}
                    <span
                      className="font-normal text-xs"
                      style={{ color: "oklch(0.60 0.02 264)" }}
                    >
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your team size and specific needs..."
                    className="rounded-lg border-input min-h-[100px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-heading font-700 text-base py-3 h-auto rounded-xl transition-all duration-200 hover:scale-105 mt-1"
                  style={{
                    background: submitting
                      ? "oklch(0.72 0.17 162 / 70%)"
                      : "oklch(0.72 0.17 162)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <title>Loading</title>
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Request a Demo
                      <ArrowRight className="ml-2 w-4 h-4 inline" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="py-12 border-t"
      style={{
        background: "oklch(0.13 0.025 264)",
        borderColor: "oklch(1 0 0 / 8%)",
      }}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.72 0.17 162)" }}
              >
                <DollarSign className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span
                className="font-heading font-800 text-lg"
                style={{ color: "oklch(0.97 0.005 264)" }}
              >
                Smart<span style={{ color: "oklch(0.72 0.17 162)" }}>Payroll</span>
              </span>
            </div>
            <p
              className="text-sm text-center md:text-left"
              style={{ color: "oklch(0.55 0.02 264)" }}
            >
              Payroll that works as hard as you do.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors"
                style={{ color: "oklch(0.58 0.02 264)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.80 0.01 264)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.58 0.02 264)")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "oklch(1 0 0 / 8%)" }}
        >
          <span style={{ color: "oklch(0.45 0.02 264)" }}>
            © 2026 SmartPayroll. All rights reserved.
          </span>
          <span
            className="flex items-center gap-1"
            style={{ color: "oklch(0.45 0.02 264)" }}
          >
            Built with{" "}
            <Heart
              className="w-3 h-3 mx-0.5 fill-current"
              style={{ color: "oklch(0.65 0.18 25)" }}
            />{" "}
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "oklch(0.60 0.02 264)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.72 0.17 162)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.60 0.02 264)")
              }
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Button ──────────────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-pulse fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
      style={{ background: "oklch(0.55 0.20 145)" }}
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
