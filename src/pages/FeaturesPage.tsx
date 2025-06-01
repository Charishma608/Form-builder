import React from "react";
import { motion } from "framer-motion";
import { PenTool, ShieldCheck, Zap, Users, Globe, Lock } from "lucide-react";
import { Card } from "@/components/elements/card";

const FeaturesPage = () => {
  const features = [
    {
      icon: PenTool,
      title: "Form Builder",
      description: "Create custom forms with drag-and-drop ease. Add text, multiple choice, checkboxes, and more.",
    },
    {
      icon: ShieldCheck,
      title: "Data Security",
      description: "Your data is protected with end-to-end encryption and secure storage.",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant notifications when forms are submitted or updated.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team members on forms and templates.",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access your forms from anywhere in the world with an internet connection.",
    },
    {
      icon: Lock,
      title: "Access Control",
      description: "Control who can view and edit your forms with granular permissions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-teal-50 text-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-teal-700 mb-4">Features</h1>
          <p className="text-xl text-slate-600">
            Everything you need to create, manage, and analyze your forms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-teal-600 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
