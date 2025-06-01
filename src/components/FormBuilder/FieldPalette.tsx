import React from 'react';
import { motion } from 'motion/react';
import { useFormStore } from '@/store/formStore';
import {
  Type,
  AlignLeft,
  ChevronDown,
  CheckSquare,
  Calendar,
  Mail,
  Phone,
  Hash,
  Circle,
} from 'lucide-react';

const fieldTypes = [
  { type: 'text' as const, icon: Type },
  { type: 'textarea' as const, icon: AlignLeft },
  { type: 'select' as const, icon: ChevronDown },
  { type: 'checkbox' as const, icon: CheckSquare },
  { type: 'radio' as const, icon: Circle },
  { type: 'date' as const, icon: Calendar },
  { type: 'email' as const, icon: Mail },
  { type: 'phone' as const, icon: Phone },
  { type: 'number' as const, icon: Hash },
];

const FieldPalette: React.FC = () => {
  const { addField } = useFormStore();

  const handleDragStart = (e: React.DragEvent, fieldType: typeof fieldTypes[0]) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        type: fieldType.type,
        label: fieldType.type,
        required: false,
        placeholder: `Enter ${fieldType.type}`,
        ...(fieldType.type === 'select' || fieldType.type === 'radio' || fieldType.type === 'checkbox'
          ? { options: ['Option 1', 'Option 2', 'Option 3'] }
          : {}),
      })
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleAddField = (fieldType: typeof fieldTypes[0]) => {
    const fieldData = {
      type: fieldType.type,
      label: fieldType.type,
      required: false,
      placeholder: `Enter ${fieldType.type}`,
      ...(fieldType.type === 'select' || fieldType.type === 'radio' || fieldType.type === 'checkbox'
        ? { options: ['Option 1', 'Option 2', 'Option 3'] }
        : {}),
    };

    addField(fieldData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {fieldTypes.map((fieldType, index) => {
          const Icon = fieldType.icon;

          return (
            <motion.div
              key={fieldType.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              draggable
              onDragStart={(e) => handleDragStart(e, fieldType)}
              onClick={() => handleAddField(fieldType)}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-xl hover:bg-blue-100 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all duration-150"
            >
              <Icon className="h-5 w-5 text-gray-600 hover:text-blue-700" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FieldPalette;
