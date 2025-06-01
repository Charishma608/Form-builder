import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useFormStore } from '@/store/formStore';
import { Button } from '@/components/elements/button';

import { Badge } from '@/components/elements/badge';
import { 
  Trash2, 
  Settings, 
  GripVertical, 
  Plus,
  FileText,
  Layers
} from 'lucide-react';
import FieldRenderer from './FieldRenderer';

const FormCanvas: React.FC = () => {
  const {
    currentForm,
    selectedFieldId,
    isDragginOver,
    addField,
    removeField,
    selectField,
    reorderFields,
    setDragginOver,
    updateForm,
  } = useFormStore();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (!currentForm) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragginOver(true);
  };

  const handleDragLeave = () => {
    setDragginOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragginOver(false);

    try {
      const fieldData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (fieldData.type) {
        addField(fieldData);
      }
    } catch (error) {
      console.error('Error parsing dropped field data:', error);
    }
  };

  const handleFieldDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleFieldDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleFieldDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      reorderFields(draggedIndex, targetIndex);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleFieldDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const toggleMultiStep = () => {
    if (currentForm.isMultiStep) {
      // Convert to single step
      updateForm({
        isMultiStep: false,
        steps: [],
      });
      // Update all fields to remove step assignment
      currentForm.fields.forEach(field => {
        if (field.step !== undefined) {
          // Remove step property
          const { step, ...fieldWithoutStep } = field;
          // This would need to be handled by the store
        }
      });
    } else {
      // Convert to multi-step
      updateForm({
        isMultiStep: true,
        steps: [
          {
            id: Math.random().toString(36).substr(2, 9),
            title: 'Step 1',
            description: 'First step of the form',
            fields: currentForm.fields.map(f => f.id),
          },
        ],
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 to-white">
      {/* Canvas Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-teal-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-teal-800">Form Editor</h3>
            </div>
            <Badge variant={currentForm.isMultiStep ? 'default' : 'secondary'} className="bg-teal-500 text-white">
              {currentForm.isMultiStep ? 'Multi-Step' : 'Single Page'}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMultiStep}
              className="flex items-center space-x-2 border-teal-300 text-teal-700 hover:bg-teal-50"
            >
              <Layers className="h-4 w-4" />
              <span>{currentForm.isMultiStep ? 'Single Page' : 'Multi-Step'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto p-6">
        <div
          className={`min-h-full transition-all duration-300 rounded-xl p-8 ${
            isDragginOver 
              ? 'bg-teal-50 border-2 border-teal-300 border-dashed' 
              : 'bg-white border border-teal-200'
          } shadow-lg`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {currentForm.fields.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="mx-auto h-12 w-12 text-teal-500">
                <FileText className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-teal-800">
                Design your form here!
              </h3>
              <p className="mt-2 text-teal-600">
                Drag and drop fields from the sidebar to start building your form.
              </p>
              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Field
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {currentForm.fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative p-6 border rounded-2xl transition-all duration-300 ${
                      selectedFieldId === field.id
                        ? 'border-teal-500 shadow-lg bg-teal-50'
                        : 'border-teal-200 bg-white hover:border-teal-300 hover:shadow-sm'
                    } ${
                      dragOverIndex === index ? 'border-teal-400 shadow-xl' : ''
                    }`}
                    draggable
                    onDragStart={(e:any) => handleFieldDragStart(e, index)}
                    onDragOver={(e:any) => handleFieldDragOver(e, index)}
                    onDrop={(e:any) => handleFieldDrop(e, index)}
                    onDragEnd={handleFieldDragEnd}
                    onClick={() => selectField(field.id)}
                  >
                    {/* Drag Handle */}
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                    </div>

                    {/* Field Controls */}
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectField(field.id);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeField(field.id);
                        }}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Field Content */}
                    <div className="pr-20 pl-6">
                      <FieldRenderer field={field} isEditing={true} />
                      
                      {/* Field Info */}
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {field.type}
                        </Badge>
                        {field.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                        {currentForm.isMultiStep && field.step !== undefined && (
                          <Badge variant="secondary" className="text-xs">
                            Step {field.step + 1}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Field Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center pt-4"
              >
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-dashed border-2 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => {
                    // This could open a quick field selector
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Field</span>
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCanvas;