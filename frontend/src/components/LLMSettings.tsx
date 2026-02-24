import { useState } from 'react';
import type { LLMConfig } from '../types';

interface LLMSettingsProps {
  config: LLMConfig;
  onSave: (config: LLMConfig) => void;
  onClose: () => void;
}

export function LLMSettings({ config, onSave, onClose }: LLMSettingsProps) {
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [baseUrl, setBaseUrl] = useState(config.baseUrl);
  const [model, setModel] = useState(config.model);

  const handleSave = () => {
    const enabled = apiKey.trim().length > 0;
    onSave({ apiKey: apiKey.trim(), baseUrl: baseUrl.trim() || 'https://api.openai.com/v1', model: model.trim() || 'gpt-4o-mini', enabled });
    onClose();
  };

  return (
    <div className="settings-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="settings-card">
        <h2>AI Settings</h2>
        <p className="settings-desc">
          Add an OpenAI API key to enable AI-powered features: turn briefings, personalised advice, and the advisor chat. Your key is stored only in your browser (localStorage) and sent directly to OpenAI — it never touches any other server.
        </p>

        <label className="settings-field">
          <span>API Key</span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
          />
        </label>

        <label className="settings-field">
          <span>Base URL</span>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.openai.com/v1"
          />
          <small>Change this if you use a different OpenAI-compatible provider.</small>
        </label>

        <label className="settings-field">
          <span>Model</span>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="gpt-4o-mini"
          />
          <small>e.g. gpt-4o-mini, gpt-4o, gpt-4-turbo</small>
        </label>

        <div className="settings-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
