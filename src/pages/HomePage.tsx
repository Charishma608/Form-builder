import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  SlidersHorizontal,
  Globe,
  Activity,
  Lock,
  Send,
  Star,
  ShieldCheck,
  Users,
  Zap,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/elements/button";
import { Card } from "@/components/elements/card";
import { Input } from "@/components/elements/input";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-teal-50 text-slate-800">
      {/* Navigation */}
      <header className="w-full py-5 px-8 bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-teal-700 tracking-tight">FormForge</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => navigate("/features")} className="hover:text-teal-600 transition">
              Features
            </button>
            <button onClick={() => navigate("/templates")} className="hover:text-teal-600 transition">
              Templates
            </button>
            <button onClick={() => navigate("/contact")} className="hover:text-teal-600 transition">
              Contact
            </button>
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/form-builder")} className="bg-teal-600 text-white">
              Start Creating
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-slate-50 opacity-50 rounded-full blur-3xl -z-10 w-3/4 h-3/4 mx-auto"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-teal-700 mb-4">
                Build Better Forms
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Create professional forms with our intuitive drag-and-drop builder. Collect data securely and analyze results instantly.
              </p>
            </motion.div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-12">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Star className="h-5 w-5 text-teal-500" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Input
                type="text"
                placeholder="Search templates or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                onBlur={() => setShowSearch(false)}
                className="w-full"
              />
            </div>

            <div className="flex justify-center gap-4 mb-12">
              <Button
                onClick={() => navigate("/form-builder")}
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all"
              >
                <PenTool className="mr-2 h-5 w-5" />
                Start Building
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/features")}
                className="px-8 py-4 rounded-full hover:bg-teal-50 transition-all"
              >
                View Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-4xl font-bold text-teal-600">1M+</div>
              <p className="text-slate-600">Forms Created</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-4xl font-bold text-teal-600">10K+</div>
              <p className="text-slate-600">Active Users</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-4xl font-bold text-teal-600">99%</div>
              <p className="text-slate-600">Customer Satisfaction</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-4xl font-bold text-teal-600">24/7</div>
              <p className="text-slate-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-teal-700 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Secure Data",
                description: "End-to-end encryption and secure storage for all your form data.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together with your team members on forms and templates.",
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description: "Get instant notifications when forms are submitted or updated.",
              },
              {
                icon: TrendingUp,
                title: "Analytics",
                description: "Detailed analytics and insights for your form submissions.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all"
              >
                <div className="text-teal-600 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-teal-800 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h3 className="text-2xl font-bold mb-4">FormForge</h3>
                <p className="text-teal-200 mb-6">
                  Create smart, shareable forms in minutes with our powerful form builder.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-teal-200 hover:text-teal-100 transition">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    </svg>
                  </a>
                  <a href="#" className="text-teal-200 hover:text-teal-100 transition">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </a>
                  <a href="#" className="text-teal-200 hover:text-teal-100 transition">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058.73.069 1.237.069 1.625 0 3.086-1.144 4.915-4.92 4.915-1.232 0-2.418-.072-3.564-.211a4.822 4.822 0 01-1.415-.385l-.211-.07c-1.125-.375-2.338-.75-3.563-.21-1.18.37-1.18 1.067 0 1.437l.07.025c1.231.375 2.463.75 3.705.75 4.011 0 4.434-.019 4.65-.07 1.16-.237 1.906-1.265 1.906-2.632v-.07c.02-.278.03-.637.03-.875 0-1.953-1.304-3.447-3.11-3.447-.93 0-1.812.208-2.55.588a4.703 4.703 0 00-1.92.588c-.738 0-1.62-.208-2.55-.588-1.806-.38-3.11-1.494-3.11-3.447 0-.238.01-.5-.03-.875v-.07c0-1.367.726-2.395 1.905-2.632.217-.052.525-.07.876-.07h.07a5.002 5.002 0 014.648 0zM12 9.525a2.5 2.5 0 110-5.05 2.5 2.5 0 010 5.05z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/features" className="text-teal-200 hover:text-teal-100 transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="/templates" className="text-teal-200 hover:text-teal-100 transition">
                      Templates
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-teal-200 hover:text-teal-100 transition">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-teal-200 hover:text-teal-100 transition">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/docs" className="text-teal-200 hover:text-teal-100 transition">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="/api" className="text-teal-200 hover:text-teal-100 transition">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="/support" className="text-teal-200 hover:text-teal-100 transition">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="/community" className="text-teal-200 hover:text-teal-100 transition">
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-teal-200 mb-4">
                  Get the latest updates and tips straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-teal-700 text-white placeholder-teal-300 focus:ring-teal-400"
                  />
                  <Button className="bg-teal-500 hover:bg-teal-400 text-white">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-teal-700 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Terms & Privacy */}
              <div className="text-teal-300">
                <a href="/terms" className="hover:text-teal-100">Terms of Service</a>
                <span className="mx-2">•</span>
                <a href="/privacy" className="hover:text-teal-100">Privacy Policy</a>
              </div>

              {/* Copyright */}
              <div className="text-center text-teal-300">
                © {new Date().getFullYear()} FormForge. All rights reserved.
              </div>

              {/* Contact */}
              <div className="text-right text-teal-300">
                <a href="/contact" className="hover:text-teal-100">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* How It Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-16">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { icon: PenTool, title: "Design", desc: "Drag & drop fields to build your layout" },
              { icon: SlidersHorizontal, title: "Configure", desc: "Add logic, validations, and branding" },
              { icon: Send, title: "Share", desc: "Get links or embed your form anywhere" },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="p-6 bg-teal-50 rounded-xl shadow-sm hover:shadow-md transition">
                  <step.icon className="h-10 w-10 mx-auto text-teal-600 mb-4" />
                  <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-10">Start With a Template</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Job Application", "Event RSVP", "Feedback Form"].map((template) => (
            <Card
              key={template}
              className="p-6 border border-gray-200 hover:shadow-lg cursor-pointer"
              onClick={() => navigate("/form-builder")}
            >
              <h4 className="text-lg font-semibold">{template}</h4>
              <p className="text-sm text-gray-500 mt-1">Pre-built and ready to customize</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-teal-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10">Why Choose FormForge?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Lock, text: "Data is encrypted and secure" },
              { icon: Globe, text: "Works on every device, anywhere" },
              { icon: Activity, text: "Blazing fast & real-time updates" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/10 rounded-lg p-6"
              >
                <item.icon className="h-8 w-8 mx-auto mb-3" />
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">FormForge</h4>
            <p>Smart form builder for teams, creators, and businesses.</p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-2">Product</h5>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Templates</a></li>
              <li><a href="#" className="hover:text-white">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-2">Company</h5>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-2">Connect</h5>
            <ul className="space-y-1">
              <li>Email: support@formforge.com</li>
              <li>Twitter: @formforge</li>
              <li>LinkedIn: /formforge</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} FormForge. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
