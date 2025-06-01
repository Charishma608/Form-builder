import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/elements/card";
import { Button } from "@/components/elements/button";
import { ChevronRight } from "lucide-react";

const TemplatesPage = () => {
  const templates = [
    {
      title: "Job Application",
      description: "Streamlined job application form with required fields and attachments.",
      category: "Recruitment",
      image: "https://images.unsplash.com/photo-1519368358672-25b01301377f?w=500&auto=format",
    },
    {
      title: "Event Registration",
      description: "Complete event registration form with ticket selection and payment options.",
      category: "Events",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format",
    },
    {
      title: "Customer Feedback",
      description: "Comprehensive customer feedback form with rating scales and open-ended questions.",
      category: "Business",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format",
    },
    {
      title: "Health Assessment",
      description: "Medical history and health assessment form with privacy considerations.",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1519085360675-af1a294947e6?w=500&auto=format",
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
          <h1 className="text-4xl font-bold text-teal-700 mb-4">Templates</h1>
          <p className="text-xl text-slate-600">
            Choose from our collection of pre-built form templates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold">{template.category}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-slate-600 mb-4">{template.description}</p>
                  <Button variant="outline" className="w-full justify-between">
                    View Template
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
