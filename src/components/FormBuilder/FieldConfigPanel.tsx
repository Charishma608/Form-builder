import React, { useState } from 'react';
import { useFormStore } from '@/store/formStore';
import { Input } from '@/components/elements/input';
import { Textarea } from '@/components/elements/textarea';
import { Label } from '@/components/elements/label';
import { Switch } from '@/components/elements/switch';
import { Button } from '@/components/elements/button';
import { Badge } from '@/components/elements/badge';
import { Separator } from '@/components/elements/separator';
import { ScrollArea } from '@/components/elements/scroll-area';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Move,
  AlertCircle,
  Hash,
  Type
} from 'lucide-react';

const FieldConfigPanel: React.FC = () => {
  const { currentForm, selectedFieldId, updateField, selectField } = useFormStore();
  const [newOption, setNewOption] = useState('');

  const selectedField = currentForm?.fields.find(f => f.id === selectedFieldId);

  if (!selectedField) {
    return (
      <div className="h-full bg-gray-50 border-l border-gray-300 flex flex-col justify-center items-center px-8 text-center">
        
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Field Selected</h3>
        
      </div>
    );
  }

  const handleUpdateField = (updates: any) => {
    updateField(selectedField.id, updates);
  };

  const addOption = () => {
    if (newOption.trim() && selectedField.options) {
      const updatedOptions = [...selectedField.options, newOption.trim()];
      handleUpdateField({ options: updatedOptions });
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (selectedField.options) {
      const updatedOptions = selectedField.options.filter((_, i) => i !== index);
      handleUpdateField({ options: updatedOptions });
    }
  };

  const updateOption = (index: number, value: string) => {
    if (selectedField.options) {
      const updatedOptions = [...selectedField.options];
      updatedOptions[index] = value;
      handleUpdateField({ options: updatedOptions });
    }
  };

  const fieldSupportsOptions = ['select', 'radio', 'checkbox'].includes(selectedField.type);
  const fieldSupportsPattern = ['text', 'email', 'phone'].includes(selectedField.type);
  const fieldSupportsLength = ['text', 'textarea', 'email', 'phone'].includes(selectedField.type);
  const fieldSupportsMinMax = ['number'].includes(selectedField.type);

  return (
    <div className="h-full bg-white border-l border-gray-300 shadow-sm flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">Field Configuration</h2>
            </div>
            <button
              aria-label="Close panel"
              onClick={() => selectField(null)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              &times;
            </button>
          </header>

          {/* Field Summary */}
          <section className="flex items-center space-x-3">
            <Badge variant="outline" className="capitalize text-indigo-700 bg-indigo-50 font-semibold">
              {selectedField.type}
            </Badge>
            <Badge
              variant={selectedField.required ? 'destructive' : 'secondary'}
              className="uppercase tracking-wide text-xs font-bold"
            >
              {selectedField.required ? 'Required' : 'Optional'}
            </Badge>
          </section>

          {/* Basic Properties Card */}
          <section className="bg-gray-50 rounded-lg p-5 shadow-inner space-y-5">
            <h3 className="flex items-center text-indigo-700 font-semibold text-lg space-x-2">
              <Type className="w-5 h-5" />
              <span>Basic Properties</span>
            </h3>

            <div className="grid gap-5">
              {/* Label */}
              <div>
                <Label htmlFor="field-label" className="mb-1 font-medium text-gray-700">
                  Label
                </Label>
                <Input
                  id="field-label"
                  value={selectedField.label}
                  onChange={e => handleUpdateField({ label: e.target.value })}
                  placeholder="Field label"
                  className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                />
              </div>

              {/* Placeholder */}
              <div>
                <Label htmlFor="field-placeholder" className="mb-1 font-medium text-gray-700">
                  Placeholder
                </Label>
                <Input
                  id="field-placeholder"
                  value={selectedField.placeholder || ''}
                  onChange={e => handleUpdateField({ placeholder: e.target.value })}
                  placeholder="Placeholder text"
                  className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                />
              </div>

              {/* Help Text */}
              <div>
                <Label htmlFor="field-help" className="mb-1 font-medium text-gray-700">
                  Help Text
                </Label>
                <Textarea
                  id="field-help"
                  value={selectedField.helpText || ''}
                  onChange={e => handleUpdateField({ helpText: e.target.value })}
                  placeholder="Additional help text for users"
                  rows={2}
                  className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400 resize-none"
                />
              </div>

              {/* Required Switch */}
              <div className="flex items-center justify-between">
                <Label htmlFor="field-required" className="font-medium text-gray-700">
                  Required Field
                </Label>
                <Switch
                  id="field-required"
                  checked={selectedField.required}
                  onCheckedChange={checked => handleUpdateField({ required: checked })}
                />
              </div>
            </div>
          </section>

          {/* Options Card */}
          {fieldSupportsOptions && (
            <section className="bg-gray-50 rounded-lg p-5 shadow-inner space-y-5">
              <h3 className="flex items-center text-indigo-700 font-semibold text-lg space-x-2">
                <Move className="w-5 h-5" />
                <span>Options</span>
              </h3>

              {/* Existing Options */}
              <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {selectedField.options?.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3"
                  >
                    <Input
                      value={option}
                      onChange={e => updateOption(index, e.target.value)}
                      placeholder="Option text"
                      className="flex-grow rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-md"
                      aria-label="Remove option"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add New Option */}
              <div className="flex items-center space-x-3">
                <Input
                  value={newOption}
                  onChange={e => setNewOption(e.target.value)}
                  placeholder="New option"
                  className="flex-grow rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addOption();
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  disabled={!newOption.trim()}
                  className="rounded-md"
                  aria-label="Add option"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}

          {/* Validation Rules Card */}
          <section className="bg-gray-50 rounded-lg p-5 shadow-inner space-y-5">
            <h3 className="flex items-center text-indigo-700 font-semibold text-lg space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Validation Rules</span>
            </h3>

            {/* Length Validation */}
            {fieldSupportsLength && (
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="min-length" className="mb-1 font-medium text-gray-700">
                    Min Length
                  </Label>
                  <Input
                    id="min-length"
                    type="number"
                    value={selectedField.validation?.minLength || ''}
                    onChange={e => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      handleUpdateField({
                        validation: { ...selectedField.validation, minLength: value }
                      });
                    }}
                    placeholder="0"
                    min={0}
                    className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <Label htmlFor="max-length" className="mb-1 font-medium text-gray-700">
                    Max Length
                  </Label>
                  <Input
                    id="max-length"
                    type="number"
                    value={selectedField.validation?.maxLength || ''}
                    onChange={e => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      handleUpdateField({
                        validation: { ...selectedField.validation, maxLength: value }
                      });
                    }}
                    placeholder="100"
                    min={1}
                    className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                  />
                </div>
              </div>
            )}

            {/* Number Validation */}
            {fieldSupportsMinMax && (
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="min-value" className="mb-1 font-medium text-gray-700">
                    Min Value
                  </Label>
                  <Input
                    id="min-value"
                    type="number"
                    value={selectedField.validation?.min || ''}
                    onChange={e => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      handleUpdateField({
                        validation: { ...selectedField.validation, min: value }
                      });
                    }}
                    placeholder="0"
                    className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <Label htmlFor="max-value" className="mb-1 font-medium text-gray-700">
                    Max Value
                  </Label>
                  <Input
                    id="max-value"
                    type="number"
                    value={selectedField.validation?.max || ''}
                    onChange={e => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      handleUpdateField({
                        validation: { ...selectedField.validation, max: value }
                      });
                    }}
                    placeholder="100"
                    className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                  />
                </div>
              </div>
            )}

            {/* Pattern Validation */}
            {fieldSupportsPattern && (
              <div>
                <Label htmlFor="pattern" className="mb-1 font-medium text-gray-700">
                  Pattern (Regex)
                </Label>
                <Input
                  id="pattern"
                  value={selectedField.validation?.pattern || ''}
                  onChange={e => {
                    handleUpdateField({
                      validation: { ...selectedField.validation, pattern: e.target.value }
                    });
                  }}
                  placeholder="^[a-zA-Z0-9]+$"
                  className="rounded-md border-indigo-300 focus:border-indigo-500 focus:ring-indigo-400"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Regular expression pattern for validation
                </p>
              </div>
            )}
          </section>

          {/* Multi-step Configuration */}
          {currentForm?.isMultiStep && (
            <section className="bg-gray-50 rounded-lg p-5 shadow-inner">
              <h3 className="flex items-center text-indigo-700 font-semibold text-lg space-x-2 mb-4">
                <Hash className="w-5 h-5" />
                <span>Multi-step Configuration</span>
              </h3>

              <Label htmlFor="field-step" className="mb-1 font-medium text-gray-700">
                Assign to Step
              </Label>
              <select
                id="field-step"
                value={selectedField.step || 0}
                onChange={e => handleUpdateField({ step: parseInt(e.target.value) })}
                className="w-full rounded-md border-indigo-300 bg-white py-2 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-400"
              >
                {currentForm.steps?.map((step, index) => (
                  <option key={step.id} value={index}>
                    Step {index + 1}: {step.title}
                  </option>
                ))}
              </select>
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FieldConfigPanel;
