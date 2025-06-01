import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useFormStore } from '@/store/formStore';
import { Button } from '@/components/elements/button';
import { Progress } from '@/components/elements/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/elements/card';
import { useToast } from '@/hooks/use-toast';
import FieldRenderer from './FormBuilder/FieldRenderer';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowLeft
} from 'lucide-react';

const FormFiller: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { loadFormById } = useFormStore();
  const { toast } = useToast();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (formId) {
      const loadedForm = loadFormById(formId);
      if (loadedForm) {
        setForm(loadedForm);
      } else {
        toast({
          title: 'Oops! Form Not Found',
          description: 'The form you requested does not exist or may have been removed.',
          variant: 'destructive'
        });
      }
      setLoading(false);
    }
  }, [formId, loadFormById, toast]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-b-4 border-blue-600 rounded-full mx-auto mb-5" />
          <p className="text-gray-600 text-lg">Loading form, please wait...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-10">
            <AlertCircle className="mx-auto mb-5 text-red-500" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Form Not Found</h2>
            <p className="text-gray-700 mb-6">Sorry, we couldn’t find the form you’re looking for.</p>
            <Button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center space-x-2"
              variant="outline"
            >
              <ArrowLeft size={16} />
              <span>Return Home</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-10">
            <CheckCircle className="mx-auto mb-5 text-green-500" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
            <p className="text-gray-700 mb-6">Your submission has been received successfully.</p>
            <Button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center space-x-2"
              variant="outline"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalSteps = form.isMultiStep ? form.steps?.length || 1 : 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentStepFields = form.isMultiStep
    ? form.fields.filter((field: any) => field.step === currentStep)
    : form.fields;

  const validateField = (field: any, value: any): string | null => {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return 'This field is required';
    }

    if (value && field.validation) {
      const { minLength, maxLength, pattern, min, max } = field.validation;

      if (typeof value === 'string') {
        if (minLength && value.length < minLength) {
          return `Please enter at least ${minLength} characters`;
        }
        if (maxLength && value.length > maxLength) {
          return `Maximum allowed length is ${maxLength} characters`;
        }
        if (pattern && !new RegExp(pattern).test(value)) {
          return 'Invalid format';
        }
      }

      if (typeof value === 'number') {
        if (min !== undefined && value < min) {
          return `Value must be at least ${min}`;
        }
        if (max !== undefined && value > max) {
          return `Value cannot exceed ${max}`;
        }
      }
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.type === 'phone' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[-\s()]/g, ''))) {
        return 'Please enter a valid phone number';
      }
    }

    return null;
  };

  const validateCurrentStep = (): boolean => {
    const stepErrors: Record<string, string> = {};
    let hasErrors = false;

    currentStepFields.forEach((field: any) => {
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
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    if (errors[fieldId]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[fieldId];
        return updatedErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Submitted form data:', {
        formId: form.id,
        title: form.title,
        data: formData,
        submittedAt: new Date().toISOString(),
      });

      const stored = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
      stored.push({
        id: Math.random().toString(36).slice(2, 11),
        formId: form.id,
        title: form.title,
        data: formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('formSubmissions', JSON.stringify(stored));

      setSubmitted(true);

      toast({
        title: 'Success!',
        description: 'Your form has been submitted.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Submission failed. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 rounded-t-md">
              <div className="flex items-center space-x-3 mb-3">
                <FileText size={24} />
                <span className="text-base font-semibold opacity-90 tracking-wide">Filling Out Form</span>
              </div>
              <CardTitle className="text-3xl font-bold">{form.title}</CardTitle>
              {form.description && (
                <p className="mt-3 text-indigo-100">{form.description}</p>
              )}

              {form.isMultiStep && form.settings.showProgressBar && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium mb-1 text-indigo-200">
                    <span>
                      Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 rounded-full bg-indigo-500" />
                </div>
              )}
            </CardHeader>

            {form.isMultiStep && form.steps && form.steps[currentStep] && (
              <div className="bg-white px-8 py-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  {form.steps[currentStep].title}
                </h3>
                {form.steps[currentStep].description && (
                  <p className="mt-1 text-gray-600">{form.steps[currentStep].description}</p>
                )}
              </div>
            )}

            <CardContent className="p-8 bg-white">
              {currentStepFields.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <AlertCircle size={48} className="mx-auto mb-4" />
                  <p>No fields available in this step.</p>
                </div>
              ) : (
                currentStepFields.map((field: any) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    error={errors[field.id]}
                  />
                ))
              )}
            </CardContent>

            <div className="flex items-center justify-between bg-gray-50 px-8 py-6 rounded-b-md">
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center space-x-2"
                  disabled={submitting}
                >
                  <ChevronLeft size={18} />
                  <span>Back</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft size={18} />
                  <span>Cancel</span>
                </Button>
              )}

              {currentStep < totalSteps - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={submitting}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight size={18} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center space-x-2"
                >
                  <span>{submitting ? 'Submitting...' : 'Submit'}</span>
                  <CheckCircle size={18} />
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FormFiller;
