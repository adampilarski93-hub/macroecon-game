import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface AdvisorChatProps {
  chatHistory: ChatMessage[];
  chatLoading: boolean;
  onSend: (message: string) => void;
}

export function AdvisorChat({ chatHistory, chatLoading, onSend }: AdvisorChatProps) {
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
    'What should I prioritize right now?',
    'Who would agree with my current strategy?',
    'What are the risks I should watch for?',
    'What would happen if I delinked from world markets?',
    'How can I fight inflation without causing unemployment?',
    'Is my debt sustainable?',
  ];

  // Show 4 random suggestions
  const shownSuggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="advisor-chat">
      <h2>Economic Advisor</h2>

      <div className="chat-messages">
        {chatHistory.length === 0 && (
          <div className="chat-suggestions">
            <p className="chat-hint">
              Your panel of economic advisors draws on thinkers from Piketty to Samir Amin,
              Hudson to Polanyi. Ask anything about your economy.
            </p>
            {shownSuggestions.map((s) => (
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
