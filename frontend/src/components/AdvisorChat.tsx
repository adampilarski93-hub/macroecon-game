import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface AdvisorChatProps {
  chatHistory: ChatMessage[];
  chatLoading: boolean;
  onSend: (message: string) => void;
  llmEnabled: boolean;
}

export function AdvisorChat({ chatHistory, chatLoading, onSend, llmEnabled }: AdvisorChatProps) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory.length, chatLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = input.trim();
    if (!msg) return;
    setInput('');
    onSend(msg);
  };

  const suggestions = [
    'What should I do?',
    'How can I reduce inflation?',
    'Why did GDP fall?',
    'What would a real country do here?',
  ];

  return (
    <div className="advisor-chat">
      <h2>Ask the advisor</h2>

      <div className="chat-messages">
        {chatHistory.length === 0 && (
          <div className="chat-suggestions">
            <p className="chat-hint">
              Ask the economic advisor anything about your economy.
              {!llmEnabled && <span className="chat-hint-sub"> Add an API key in Settings for enhanced AI responses.</span>}
            </p>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="suggestion-pill"
                onClick={() => onSend(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <div key={i} className={`chat-msg chat-${msg.role}`}>
            <span className="chat-role">{msg.role === 'user' ? 'You' : 'Advisor'}</span>
            <p>{msg.content}</p>
          </div>
        ))}
        {chatLoading && (
          <div className="chat-msg chat-assistant">
            <span className="chat-role">Advisor</span>
            <p className="chat-thinking">Thinking...</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form className="chat-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the economy..."
          disabled={chatLoading}
        />
        <button type="submit" disabled={chatLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
