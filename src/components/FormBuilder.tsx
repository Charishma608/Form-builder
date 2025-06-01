import React, { useEffect, useState, useRef } from 'react';
import { useFormStore } from '@/store/formStore';
import { useToast } from '@/hooks/use-toast';
import {
  Eye,
  Save,
  Share2,
  Smartphone,
  Tablet,
  Monitor,
  Layers,
  Grid,
  Undo,
  Redo,
  Settings,
  Download,
  Upload,
} from 'lucide-react';

import FieldPalette from './FormBuilder/FieldPalette';
import TemplateManager from './FormBuilder/TemplateManager';
import FormCanvas from './FormBuilder/FormCanvas';
import FieldConfigPanel from './FormBuilder/FieldConfigPanel';
import PreviewPanel from './FormBuilder/PreviewPanel';
import { Button } from '@/components/elements/button';

const FormBuilder: React.FC = () => {
  const {
    currentForm,
    previewMode,
    showPreview,
    createNewForm,
    saveForm,
    setPreviewMode,
    togglePreview,
    loadForm,
    savedForms,
    updateForm,
  } = useFormStore();
  const { toast } = useToast();

  // Local state for left sidebar panel (field or templates)
  const [leftPanel, setLeftPanel] = useState<'fields' | 'templates'>('fields');

  useEffect(() => {
    if (!currentForm) createNewForm();
  }, [currentForm, createNewForm]);

  const handleSave = () => {
    const formId = saveForm();
    if (formId) {
      toast({
        title: 'Form Saved',
        description: `Saved with ID: ${formId}`,
      });
    }
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const form = JSON.parse(result);
          loadForm(form);
          toast({
            title: 'Form Imported',
            description: 'Form has been imported successfully',
          });
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to import form. Please ensure the file is a valid JSON.',
            variant: 'destructive',
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleShare = () => {
    if (!currentForm) return;
    const url = `${window.location.origin}/form/${currentForm.id}`;
    navigator.clipboard.writeText(url).then(() =>
      toast({
        title: 'Copied',
        description: 'URL copied to clipboard',
      })
    );
  };

  // Right sidebar tab: 'config' or 'preview'
  const [rightTab, setRightTab] = useState<'config' | 'preview' | 'settings'>('config');

  // Sync showPreview with rightTab
  useEffect(() => {
    if (rightTab === 'preview' && !showPreview) togglePreview();
    if (rightTab === 'config' && showPreview) togglePreview();
  }, [rightTab, showPreview, togglePreview]);

  if (!currentForm) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50 text-green-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-400 mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading your form builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-teal-50 to-teal-50">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white/95 backdrop-blur-sm border-b border-teal-200 shadow-sm">
        <div className="flex items-center gap-4 px-6">
          <h1 className="text-xl font-bold text-teal-800">
            FormForge Builder
          </h1>
        </div>

        <div className="flex items-center gap-4 px-6">
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm"
            variant="default"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button
            onClick={handleImport}
            size="sm"
            variant="outline"
            className="border-teal-400 text-teal-700 hover:bg-teal-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>

          <Button
            onClick={handleShare}
            size="sm"
            variant="outline"
            className="border-teal-400 text-teal-700 hover:bg-teal-50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button
            onClick={() => setRightTab('settings')}
            size="sm"
            variant="outline"
            className="border-teal-400 text-teal-700 hover:bg-teal-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Narrow vertical bar with icon buttons */}
        <nav className="w-14 bg-teal-50 border-r border-teal-200 flex flex-col items-center py-4 space-y-6">
          <button
            onClick={() => setLeftPanel('fields')}
            aria-label="Show Fields"
            className={`p-2 rounded-md transition-colors duration-200 ${
              leftPanel === 'fields'
                ? 'bg-teal-600 text-white'
                : 'text-teal-600 hover:bg-teal-100'
            }`}
          >
            <Layers className="w-5 h-5" />
          </button>

          <button
            onClick={() => setLeftPanel('templates')}
            aria-label="Show Templates"
            className={`p-2 rounded-md transition-colors duration-200 ${
              leftPanel === 'templates'
                ? 'bg-teal-600 text-white'
                : 'text-teal-600 hover:bg-teal-100'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
        </nav>

        {/* Left Panel Popover */}
        <aside className="w-72 bg-white border-r border-teal-200 overflow-y-auto p-6">
          {leftPanel === 'fields' ? (
            <>
              <h2 className="text-teal-800 text-lg font-semibold mb-4">Fields</h2>
              <FieldPalette />
            </>
          ) : (
            <>
              <h2 className="text-teal-800 text-lg font-semibold mb-4">Templates</h2>
              <TemplateManager />
            </>
          )}
        </aside>

        {/* Center Canvas */}
        <section className="flex-1 bg-white p-10 overflow-auto rounded-tr-lg rounded-br-lg shadow-lg border border-teal-200">
          <FormCanvas />
        </section>

        {/* Right Sidebar: Tabs for Config / Preview */}
        <aside className="w-96 bg-white border-l border-teal-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-teal-200">
            <button
              onClick={() => setRightTab('config')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                rightTab === 'config'
                  ? 'border-b-2 border-teal-600 text-teal-800 bg-teal-50'
                  : 'text-teal-600 hover:bg-teal-50'
              }`}
              aria-selected={rightTab === 'config'}
              role="tab"
            >
              Configuration
            </button>

            <button
              onClick={() => setRightTab('preview')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                rightTab === 'preview'
                  ? 'border-b-2 border-teal-600 text-teal-800 bg-teal-50'
                  : 'text-teal-600 hover:bg-teal-50'
              }`}
              aria-selected={rightTab === 'preview'}
              role="tab"
            >
              Preview
            </button>

            <button
              onClick={() => setRightTab('settings')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                rightTab === 'settings'
                  ? 'border-b-2 border-teal-600 text-teal-800 bg-teal-50'
                  : 'text-teal-600 hover:bg-teal-50'
              }`}
              aria-selected={rightTab === 'settings'}
              role="tab"
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {rightTab === 'config' ? (
              <FieldConfigPanel />
            ) : rightTab === 'preview' ? (
              <>
                {/* Preview mode device selector */}
                <div className="flex items-center justify-between mb-4">
  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                      className={`border-teal-400 text-teal-700 hover:bg-teal-50 ${
                        previewMode === 'desktop' ? 'bg-teal-50' : ''
                      }`}
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Desktop
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                      className={`border-teal-400 text-teal-700 hover:bg-teal-50 ${
                        previewMode === 'tablet' ? 'bg-teal-50' : ''
                      }`}
                    >
                      <Tablet className="h-4 w-4 mr-2" />
                      Tablet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                      className={`border-teal-400 text-teal-700 hover:bg-teal-50 ${
                        previewMode === 'mobile' ? 'bg-teal-50' : ''
                      }`}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Mobile
                    </Button>
                  </div>
                </div>
                <PreviewPanel />
              </>
            ) : (
              <div className="space-y-4">
                <h2 className="text-teal-800 text-lg font-semibold">Form Settings</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Form Title</span>
                    <input
                      type="text"
                      value={currentForm.title}
                      onChange={(e) => updateForm({ title: e.target.value })}
                      className="flex-1 border-teal-300 focus:ring-teal-500 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Description</span>
                    <textarea
                      value={currentForm.description || ''}
                      onChange={(e) => updateForm({ description: e.target.value })}
                      className="flex-1 border-teal-300 focus:ring-teal-500 rounded-md px-3 py-2 text-sm"
                      rows={2}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Submit Button Text</span>
                    <input
                      type="text"
                      value={currentForm.settings.submitText}
                      onChange={(e) => updateForm({ settings: { ...currentForm.settings, submitText: e.target.value } })}
                      className="flex-1 border-teal-300 focus:ring-teal-500 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Redirect URL</span>
                    <input
                      type="text"
                      value={currentForm.settings.redirectUrl || ''}
                      onChange={(e) => updateForm({ settings: { ...currentForm.settings, redirectUrl: e.target.value } })}
                      className="flex-1 border-teal-300 focus:ring-teal-500 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Show Progress Bar</span>
                    <input
                      type="checkbox"
                      checked={currentForm.settings.showProgressBar}
                      onChange={(e) => updateForm({ settings: { ...currentForm.settings, showProgressBar: e.target.checked } })}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default FormBuilder;
