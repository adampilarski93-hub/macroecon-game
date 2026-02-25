import React, { useState, useRef, useCallback, useEffect } from 'react';
import { parseMarkdown, applyMarkdownToNodes } from '../../utils/parseMarkdown';

// Tooltip marker pattern: [[TERM|definition]]
const TOOLTIP_PATTERN = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;

interface TooltipProps {
  content: string; // Text with [[TERM|definition]] markers
  className?: string;
}

interface ParsedSegment {
  type: 'text' | 'tooltip';
  content: string;
  definition?: string;
  key: string;
}

// Check if device is touch-based
const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Individual tooltip trigger component
interface TooltipTriggerProps {
  term: string;
  definition: string;
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ term, definition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsVisible(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsVisible(prev => !prev);
    }
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = useCallback(() => {
    if (!isTouch) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 300);
    }
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouch) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsVisible(false);
    }
  }, [isTouch]);

  // Mobile tap handler
  const handleClick = useCallback((event: React.MouseEvent) => {
    if (isTouch) {
      event.preventDefault();
      setIsVisible(prev => !prev);
    }
  }, [isTouch]);

  return (
    <span className="tooltip-container">
      <span
        ref={triggerRef}
        className={\	ooltip-trigger \\}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isVisible}
        aria-describedby={isVisible ? \	ooltip-\\ : undefined}
      >
        {parseMarkdown(term)}
      </span>
      {isVisible && (
        <div
          ref={tooltipRef}
          id={\	ooltip-\\}
          className="tooltip-popup"
          role="tooltip"
        >
          <div className="tooltip-content">
            <strong className="tooltip-term">{parseMarkdown(term)}</strong>
            <p className="tooltip-definition">{parseMarkdown(definition)}</p>
          </div>
          <div className="tooltip-arrow" />
        </div>
      )}
    </span>
  );
};

/**
 * Parse text containing [[TERM|definition]] markers and return React nodes
 * Also applies markdown bold parsing to all text segments
 */
export function parseTooltipText(text: string): React.ReactNode[] {
  const segments: ParsedSegment[] = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  // Reset regex
  TOOLTIP_PATTERN.lastIndex = 0;

  while ((match = TOOLTIP_PATTERN.exec(text)) !== null) {
    const [fullMatch, term, definition] = match;
    const matchIndex = match.index;

    // Add text before this match (with markdown parsing)
    if (matchIndex > lastIndex) {
      const textBefore = text.slice(lastIndex, matchIndex);
      segments.push({
        type: 'text',
        content: textBefore,
        key: \	ext-\\,
      });
    }

    // Add the tooltip segment
    segments.push({
      type: 'tooltip',
      content: term.trim(),
      definition: definition.trim(),
      key: \	ooltip-\\,
    });

    lastIndex = matchIndex + fullMatch.length;
  }

  // Add remaining text after last match (with markdown parsing)
  if (lastIndex < text.length) {
    const textAfter = text.slice(lastIndex);
    segments.push({
      type: 'text',
      content: textAfter,
      key: \	ext-\\,
    });
  }

  // If no matches, return the original text with markdown parsing
  if (segments.length === 0) {
    return parseMarkdown(text);
  }

  // Build React nodes from segments
  const nodes = segments.map((segment) => {
    if (segment.type === 'text') {
      // Apply markdown parsing to text segments
      return <span key={segment.key}>{parseMarkdown(segment.content)}</span>;
    } else {
      return (
        <TooltipTrigger
          key={segment.key}
          term={segment.content}
          definition={segment.definition!}
        />
      );
    }
  });

  return nodes;
}

/**
 * Tooltip component that parses [[TERM|definition]] markers from content
 */
export const Tooltip: React.FC<TooltipProps> = ({ content, className = '' }) => {
  const parsedContent = parseTooltipText(content);

  return (
    <span className={\	ooltip-wrapper \\}>
      {parsedContent}
    </span>
  );
};

// Default export for convenience
export default Tooltip;

// CSS-in-JS styles component
export const TooltipStyles: React.FC = () => (
  <style>{\
    .tooltip-wrapper {
      display: inline;
    }

    .tooltip-container {
      position: relative;
      display: inline;
    }

    .tooltip-trigger {
      display: inline;
      color: #60a5fa;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 2px;
      cursor: pointer;
      transition: color 0.2s ease;
      border-radius: 2px;
      padding: 0 2px;
    }

    .tooltip-trigger:hover,
    .tooltip-trigger.active {
      color: #93c5fd;
      background-color: rgba(96, 165, 250, 0.1);
    }

    .tooltip-trigger:focus {
      outline: 2px solid #60a5fa;
      outline-offset: 2px;
    }

    .tooltip-popup {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      max-width: 300px;
      animation: tooltipFadeIn 200ms ease-out;
    }

    @keyframes tooltipFadeIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    .tooltip-content {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      border: 1px solid #60a5fa;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 
                  0 2px 4px -1px rgba(0, 0, 0, 0.2),
                  0 0 0 1px rgba(96, 165, 250, 0.1);
      color: #e2e8f0;
      font-size: 14px;
      line-height: 1.5;
    }

    .tooltip-term {
      display: block;
      color: #60a5fa;
      font-size: 13px;
      margin-bottom: 6px;
      font-weight: 600;
    }

    .tooltip-definition {
      margin: 0;
      color: #cbd5e1;
      font-size: 14px;
      line-height: 1.5;
    }

    .tooltip-arrow {
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #60a5fa;
    }

    .tooltip-arrow::after {
      content: '';
      position: absolute;
      top: -7px;
      left: -6px;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #334155;
    }

    /* Markdown bold styling */
    .markdown-bold {
      font-weight: 600;
      color: inherit;
    }

    .tooltip-trigger .markdown-bold {
      color: inherit;
      font-weight: 700;
    }

    .tooltip-content .markdown-bold {
      color: #fbbf24;
      font-weight: 600;
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
      .tooltip-popup {
        position: fixed;
        bottom: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 90vw;
        width: 300px;
      }

      @keyframes tooltipFadeIn {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .tooltip-arrow {
        display: none;
      }

      .tooltip-content {
        padding: 16px;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .tooltip-trigger {
        text-decoration-style: solid;
      }

      .tooltip-content {
        border-width: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .tooltip-popup {
        animation: none;
      }

      .tooltip-trigger {
        transition: none;
      }
    }
  \}</style>
);
