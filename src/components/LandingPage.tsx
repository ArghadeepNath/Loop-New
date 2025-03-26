import React from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
                  Loop
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  Pricing
                </a>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Level Up Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
                Programming Skills
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join our gamified learning platform. Master programming through
              hands-on projects, earn XP, and showcase your achievements.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-gray-700 font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 dark:opacity-40"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Programming"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Loop?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines learning with gaming elements to make
              programming education engaging and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Structured Learning",
                description:
                  "Follow carefully crafted learning paths designed by industry experts",
                icon: "📚",
              },
              {
                title: "Practice Projects",
                description:
                  "Build real-world applications that you can add to your portfolio",
                icon: "💻",
              },
              {
                title: "AI Assistance",
                description:
                  "Get personalized help when you're stuck on challenging problems",
                icon: "🤖",
              },
              {
                title: "Earn XP & Badges",
                description:
                  "Track your progress and earn recognition for your achievements",
                icon: "🏆",
              },
              {
                title: "Community Support",
                description:
                  "Connect with fellow learners and mentors in our active community",
                icon: "👥",
              },
              {
                title: "Career Preparation",
                description:
                  "Get ready for technical interviews and land your dream job",
                icon: "🚀",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-indigo-50 dark:bg-gray-700 rounded-xl p-8 transition-transform hover:scale-105 duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-indigo-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied learners who have transformed their
              careers with Loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Software Engineer at Google",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
                quote:
                  "Loop's DSA course helped me ace my technical interviews. The gamified approach kept me motivated throughout.",
              },
              {
                name: "Sarah Chen",
                role: "Full Stack Developer",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                quote:
                  "The project-based learning approach gave me practical skills that I use every day in my job. Highly recommended!",
              },
              {
                name: "Michael Rodriguez",
                role: "CS Student",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
                quote:
                  "Loop made learning programming fun! The XP system and daily challenges kept me coming back every day.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-indigo-200 dark:border-indigo-800"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-indigo-600 dark:text-indigo-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the plan that works best for your learning goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic",
                price: "Free",
                description: "Perfect for beginners",
                features: [
                  "Access to free courses",
                  "Basic coding challenges",
                  "Community forum access",
                  "Limited XP features",
                ],
                cta: "Get Started",
                highlighted: false,
              },
              {
                title: "Pro",
                price: "$19.99",
                period: "per month",
                description: "Most popular choice",
                features: [
                  "All Basic features",
                  "Full course library access",
                  "Advanced coding challenges",
                  "AI code review",
                  "Career preparation resources",
                ],
                cta: "Start Pro Trial",
                highlighted: true,
              },
              {
                title: "Teams",
                price: "$49.99",
                period: "per month",
                description: "For study groups & teams",
                features: [
                  "All Pro features",
                  "Team progress tracking",
                  "Collaborative projects",
                  "Priority support",
                  "Custom learning paths",
                ],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl scale-105 z-10"
                    : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"}`}
                >
                  {plan.title}
                </h3>
                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"}`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={
                        plan.highlighted
                          ? "text-indigo-100"
                          : "text-gray-500 dark:text-gray-300"
                      }
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`mb-6 ${plan.highlighted ? "text-indigo-100" : "text-gray-600 dark:text-gray-300"}`}
                >
                  {plan.description}
                </p>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        className={`w-5 h-5 mr-2 flex-shrink-0 ${plan.highlighted ? "text-indigo-200" : "text-indigo-500 dark:text-indigo-400"}`}
                      />
                      <span
                        className={
                          plan.highlighted
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full py-3 px-4 rounded-full text-center font-medium ${
                    plan.highlighted
                      ? "bg-white text-indigo-600 hover:bg-indigo-50"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                  } transition-colors shadow-md hover:shadow-lg`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already leveling up their
            programming skills with Loop.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-full bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-md hover:shadow-lg text-lg"
          >
            Get Started Today <ChevronRight className="inline ml-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Loop
              </h3>
              <p className="text-gray-400 mb-4">
                Gamified programming education for the modern learner.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Challenges
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Loop Learning. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
