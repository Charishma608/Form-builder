import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useFormStore } from '@/store/formStore';
import { Button } from '@/components/elements/button';
import { ScrollArea } from '@/components/elements/scroll-area';
import { Progress } from '@/components/elements/progress';
import FieldRenderer from './FieldRenderer';
import { 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Tablet, 
  Smartphone,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PreviewPanel: React.FC = () => {
  const { currentForm, previewMode } = useFormStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!currentForm) return null;

  // Get fields for current step
  const getFieldsForStep = (stepIndex: number) => {
    if (!currentForm.isMultiStep) {
      return currentForm.fields;
    }
    return currentForm.fields.filter(field => field.step === stepIndex);
  };

  const currentStepFields = getFieldsForStep(currentStep);
  const totalSteps = currentForm.isMultiStep ? (currentForm.steps?.length || 1) : 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Validation function
  const validateField = (field: any, value: any): string | null => {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return 'This field is required';
    }

    if (value && field.validation) {
      const { minLength, maxLength, pattern, min, max } = field.validation;

      if (typeof value === 'string') {
        if (minLength && value.length < minLength) {
          return `Minimum length is ${minLength} characters`;
        }
        if (maxLength && value.length > maxLength) {
          return `Maximum length is ${maxLength} characters`;
        }
        if (pattern && !new RegExp(pattern).test(value)) {
          return 'Invalid format';
        }
      }

      if (typeof value === 'number') {
        if (min !== undefined && value < min) {
          return `Minimum value is ${min}`;
        }
        if (max !== undefined && value > max) {
          return `Maximum value is ${max}`;
        }
      }
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'phone' && value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[-\s()]/g, ''))) {
        return 'Please enter a valid phone number';
      }
    }

    return null;
  };

  const validateCurrentStep = (): boolean => {
    const stepErrors: Record<string, string> = {};
    let hasErrors = false;

    currentStepFields.forEach(field => {
      const value = formData[field.id];
      const error = validateField(field, value);
      if (error) {
        stepErrors[field.id] = error;
        hasErrors = true;
      }
    });

    setErrors(stepErrors);
    return !hasErrors;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));

    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      console.log('Form submitted:', formData);
      alert('Form submitted!');
    }
  };

  const getPreviewIcon = () => {
    switch (previewMode) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const PreviewIcon = getPreviewIcon();

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-teal-50 to-white border-l border-teal-200">
      {/* Header */}
      <header className="flex items-center justify-between bg-white/95 backdrop-blur-sm border-b border-teal-200 px-8 py-5 shadow-sm">
        <div className="flex items-center space-x-3">
          <Eye className="text-teal-600 w-6 h-6" />
          <h2 className="text-xl font-semibold text-teal-800">Live Preview</h2>
        </div>
        <div className="flex items-center space-x-2">
          <PreviewIcon className="w-5 h-5 text-teal-500" />
          <span className="uppercase text-sm font-medium text-teal-600 tracking-wide">{previewMode}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Stepper */}
        {currentForm.isMultiStep && (
          <nav className="w-64 bg-white border-r border-teal-200 flex flex-col px-6 py-8">
            <h3 className="text-lg font-semibold mb-6 text-teal-800">{currentForm.title}</h3>

            <div className="space-y-5 flex-1 overflow-y-auto">
              {currentForm.steps?.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg cursor-pointer transition
                      ${isActive ? 'bg-teal-600 text-white font-semibold' : 'text-teal-700 hover:bg-teal-50'}
                      ${isCompleted && !isActive ? 'text-teal-600' : ''}`}
                  >
                    <span className={`flex items-center justify-center w-7 h-7 mr-3 rounded-full border-2
                      ${isActive ? 'border-white bg-white text-teal-600 font-bold' : isCompleted ? 'bg-teal-600 border-teal-600 text-white' : 'border-teal-300 text-teal-500'}`}>
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </span>
                    <div className="text-left">
                      <p className="text-sm">{step.title}</p>
                      {step.description && (
                        <p className="text-xs text-teal-500">{step.description}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Progress Bar */}
            {currentForm.settings.showProgressBar && (
              <div className="mt-6">
                <Progress value={progress} className="h-2 rounded-full bg-teal-100" />
                <p className="text-xs text-gray-600 mt-1 text-center">{Math.round(progress)}% completed</p>
              </div>
            )}
          </nav>
        )}

        {/* Main Preview Panel */}
        <ScrollArea className="flex-1 p-8 overflow-y-auto">
          <motion.div
            key={previewMode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8"
          >
            {/* Form Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{currentForm.title}</h1>
              {currentForm.description && (
                <p className="text-gray-600 mt-2">{currentForm.description}</p>
              )}
            </div>

            {/* Step Title & Description (for multi-step) */}
            {currentForm.isMultiStep && currentForm.steps && currentForm.steps[currentStep] && (
              <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{currentForm.steps[currentStep].title}</h2>
                {currentForm.steps[currentStep].description && (
                  <p className="text-gray-500 mt-1">{currentForm.steps[currentStep].description}</p>
                )}
              </div>
            )}

            {/* Form Fields */}
            {currentStepFields.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No fields in this step</p>
              </div>
            ) : (
              <div className="space-y-8">
                {currentStepFields.map(field => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FieldRenderer
                      field={field}
                      value={formData[field.id]}
                      onChange={(value) => handleFieldChange(field.id, value)}
                      error={errors[field.id]}
                    />
                    {errors[field.id] && (
                      <p className="text-sm text-red-600 mt-1 ml-1">{errors[field.id]}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-12 flex justify-between">
              {currentForm.isMultiStep && currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-5 py-3"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </Button>
              ) : <div />}

              {currentForm.isMultiStep && currentStep < totalSteps - 1 ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-5 py-3"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{currentForm.settings.submitText || 'Submit'}</span>
                </Button>
              )}
            </div>
          </motion.div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PreviewPanel;
