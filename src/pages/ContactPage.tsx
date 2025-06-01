import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import { Textarea } from "@/components/elements/textarea";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log("Submitted:", { name, email, message });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-teal-50 text-slate-800 py-16">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-teal-700">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-teal-600 text-white hover:bg-teal-700">
            <Send className="mr-2 h-5 w-5" /> Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
