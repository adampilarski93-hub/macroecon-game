import React, { useState, useCallback, useMemo } from 'react';
import { ChoiceCard, ChoiceCardProps, LearnMoreContent } from '../ChoiceCard';
import { parseTooltipText, TooltipStyles } from '../Tooltip';
import { parseMarkdown } from '../../utils/parseMarkdown';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface NarrativeChoice {
  id: string;
  text: string;
  consequence: string;
  effects: Record<string, number>;
  learnMore?: {
    concept: string;
    explanation: string;
    thinkers: string[];
    realWorldExample: string;
    counterArguments: string;
  };
}

export interface NarrativeBlockProps {
  phase: number;
  title: string;
  narrative: string; // Contains [[TERM|definition]] markers and **sections
  tooltipDefinitions?: Record<string, string>; // Map of term -> definition
  choices: NarrativeChoice[];
  onChoiceMade: (choiceId: string) => void;
  currentChoice?: string; // Currently selected choice ID
}

interface ParsedNarrative {
  brief: string;
  detailed: string;
  scholarContext: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Parse narrative text into sections based on markdown-style headers
 */
function parseNarrativeSections(narrative: string): ParsedNarrative {
  const sections: ParsedNarrative = {
    brief: '',
    detailed: '',
    scholarContext: '',
  };

  // Find **Brief:** section
  const briefMatch = narrative.match(/\*\*Brief:\*\*\s*([\s\S]*?)(?=\*\*Detailed:|\*\*Scholar Context:|\$)/i);
  if (briefMatch) {
    sections.brief = briefMatch[1].trim();
  }

  // Find **Detailed:** section
  const detailedMatch = narrative.match(/\*\*Detailed:\*\*\s*([\s\S]*?)(?=\*\*Scholar Context:|\$)/i);
  if (detailedMatch) {
    sections.detailed = detailedMatch[1].trim();
  }

  // Find **Scholar Context:** section
  const scholarMatch = narrative.match(/\*\*Scholar Context:\*\*\s*([\s\S]*?)\$/i);
  if (scholarMatch) {
    sections.scholarContext = scholarMatch[1].trim();
  }

  // If no sections found, treat entire text as brief
  if (!sections.brief && !sections.detailed && !sections.scholarContext) {
    sections.brief = narrative.trim();
  }

  return sections;
}

/**
 * Get first N sentences from text
 */
function getFirstSentences(text: string, count: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) || [text];
  return sentences.slice(0, count).join('').trim();
}

/**
 * Count sentences in text
 */
function countSentences(text: string): number {
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g);
  return sentences ? sentences.length : text.length > 0 ? 1 : 0;
}

// ============================================================================
// Helper Components
// ============================================================================

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  label: string;
  activeLabel?: string;
  variant?: 'default' | 'scholar';
}

const ExpandButton: React.FC<ExpandButtonProps> = ({
  isExpanded,
  onClick,
  label,
  activeLabel,
  variant = 'default',
}) => {
  const isScholar = variant === 'scholar';
  
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isExpanded}
      style={{
        ...styles.expandButton,
        ...(isScholar ? styles.scholarButton : {}),
        ...(isExpanded && isScholar ? styles.scholarButtonActive : {}),
        ...(isExpanded && !isScholar ? styles.expandButtonActive : {}),
      }}
    >
      <span style={{
        ...styles.expandIcon,
        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
      }}>
        {isScholar ? (isExpanded ? '×' : '+') : (isExpanded ? '?' : '?')}
      </span>
      <span>{isExpanded ? (activeLabel || label) : label}</span>
    </button>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const NarrativeBlock: React.FC<NarrativeBlockProps> = ({
  phase,
  title,
  narrative,
  tooltipDefinitions = {},
  choices,
  onChoiceMade,
  currentChoice,
}) => {
  // Parse narrative sections
  const parsedNarrative = useMemo(() => parseNarrativeSections(narrative), [narrative]);

  // State for expansion sections
  const [isDetailedExpanded, setIsDetailedExpanded] = useState(false);
  const [isScholarExpanded, setIsScholarExpanded] = useState(false);

  // State for selected choice
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | undefined>(currentChoice);

  // Update selected choice when prop changes
  React.useEffect(() => {
    setSelectedChoiceId(currentChoice);
  }, [currentChoice]);

  // Toggle handlers
  const toggleDetailed = useCallback(() => {
    setIsDetailedExpanded(prev => !prev);
  }, []);

  const toggleScholar = useCallback(() => {
    setIsScholarExpanded(prev => !prev);
  }, []);

  // Choice selection handler
  const handleChoiceSelect = useCallback((choiceId: string) => {
    setSelectedChoiceId(choiceId);
  }, []);

  // Confirm choice handler
  const handleConfirmChoice = useCallback(() => {
    if (selectedChoiceId) {
      onChoiceMade(selectedChoiceId);
    }
  }, [selectedChoiceId, onChoiceMade]);

  // Parse tooltips with additional definitions and markdown formatting
  const parseTooltips = useCallback((text: string): React.ReactNode => {
    // First, add any additional tooltip definitions to the text
    let processedText = text;
    Object.entries(tooltipDefinitions).forEach(([term, definition]) => {
      // Only add if not already present in [[TERM|...]] format
      const pattern = new RegExp(\\\[\\[\\\|\, 'i');
      if (!pattern.test(processedText) && processedText.includes(term)) {
        // Wrap standalone term occurrences (but not in other tooltips)
        const standalonePattern = new RegExp(\(?<!\\|)\\b(\)\\b(?!\\|)\, 'gi');
        processedText = processedText.replace(standalonePattern, \[[\|\]]\);
      }
    });
    
    // parseTooltipText now includes markdown parsing
    return parseTooltipText(processedText);
  }, [tooltipDefinitions]);

  // Calculate detailed section preview
  const detailedSentenceCount = countSentences(parsedNarrative.detailed);
  const detailedPreview = parsedNarrative.detailed 
    ? getFirstSentences(parsedNarrative.detailed, 2)
    : '';
  const hasMoreDetailed = detailedSentenceCount > 2;

  return (
    <>
      <TooltipStyles />
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.phaseBadge}>Phase {phase}</span>
          <h1 style={styles.title}>{parseMarkdown(title)}</h1>
        </header>

        {/* Narrative Content */}
        <div style={styles.narrativeSection}>
          {/* Brief Section - Always Visible */}
          {parsedNarrative.brief && (
            <div style={styles.briefSection}>
              <p style={styles.briefText}>
                {parseTooltips(parsedNarrative.brief)}
              </p>
            </div>
          )}

          {/* Detailed Section - Expandable */}
          {parsedNarrative.detailed && (
            <div style={styles.detailedSection}>
              {!isDetailedExpanded ? (
                <>
                  <p style={styles.previewText}>
                    {parseTooltips(detailedPreview)}
                    {hasMoreDetailed && <span style={styles.ellipsis}>...</span>}
                  </p>
                  {hasMoreDetailed && (
                    <ExpandButton
                      isExpanded={false}
                      onClick={toggleDetailed}
                      label="Read more..."
                    />
                  )}
                </>
              ) : (
                <>
                  <p style={styles.fullText}>
                    {parseTooltips(parsedNarrative.detailed)}
                  </p>
                  <ExpandButton
                    isExpanded={true}
                    onClick={toggleDetailed}
                    label="Read more..."
                    activeLabel="Show less"
                  />
                </>
              )}
            </div>
          )}

          {/* Scholar Context Section - Collapsed by Default */}
          {parsedNarrative.scholarContext && (
            <div style={styles.scholarSection}>
              <ExpandButton
                isExpanded={isScholarExpanded}
                onClick={toggleScholar}
                label="Scholar Context"
                activeLabel="Hide Scholar Context"
                variant="scholar"
              />
              <div
                style={{
                  ...styles.scholarContent,
                  ...(isScholarExpanded ? styles.scholarContentExpanded : {}),
                }}
                aria-hidden={!isScholarExpanded}
              >
                <div style={styles.scholarInner}>
                  <p style={styles.scholarText}>
                    {parseTooltips(parsedNarrative.scholarContext)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Choice Cards */}
        <div style={styles.choicesSection}>
          <h2 style={styles.choicesHeading}>{parseMarkdown("Choose Your Path")}</h2>
          <div style={styles.choicesList}>
            {choices.map((choice) => (
              <ChoiceCard
                key={choice.id}
                id={choice.id}
                text={choice.text}
                consequence={choice.consequence}
                effects={choice.effects}
                learnMore={choice.learnMore}
                isSelected={selectedChoiceId === choice.id}
                onSelect={() => handleChoiceSelect(choice.id)}
                parseTooltips={parseTooltips}
              />
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div style={styles.confirmSection}>
          <button
            type="button"
            onClick={handleConfirmChoice}
            disabled={!selectedChoiceId}
            style={{
              ...styles.confirmButton,
              ...(selectedChoiceId ? styles.confirmButtonActive : styles.confirmButtonDisabled),
            }}
            aria-disabled={!selectedChoiceId}
          >
            {selectedChoiceId ? 'Confirm Choice' : 'Select a Choice to Continue'}
          </button>
        </div>
      </div>
    </>
  );
};

// ============================================================================
// CSS-in-JS Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  header: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '2px solid #f3f4f6',
  },
  phaseBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    lineHeight: 1.2,
  },
  narrativeSection: {
    marginBottom: '32px',
  },
  briefSection: {
    marginBottom: '20px',
  },
  briefText: {
    fontSize: '17px',
    lineHeight: 1.7,
    color: '#374151',
    margin: 0,
  },
  detailedSection: {
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  previewText: {
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#4b5563',
    margin: '0 0 12px 0',
  },
  ellipsis: {
    color: '#9ca3af',
    marginLeft: '4px',
  },
  fullText: {
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#4b5563',
    margin: '0 0 12px 0',
  },
  expandButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
  },
  expandButtonActive: {
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
  },
  expandIcon: {
    fontSize: '12px',
    transition: 'transform 0.2s ease',
  },
  scholarSection: {
    marginTop: '16px',
  },
  scholarButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    backgroundColor: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#92400e',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
  },
  scholarButtonActive: {
    backgroundColor: '#fde68a',
    borderColor: '#d97706',
  },
  scholarContent: {
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    opacity: 0,
  },
  scholarContentExpanded: {
    maxHeight: '2000px',
    opacity: 1,
  },
  scholarInner: {
    padding: '16px',
    marginTop: '12px',
    backgroundColor: '#fffbeb',
    borderRadius: '8px',
    border: '1px solid #fcd34d',
  },
  scholarText: {
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#78350f',
    margin: 0,
  },
  choicesSection: {
    marginBottom: '24px',
  },
  choicesHeading: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
  },
  choicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  confirmSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '2px solid #f3f4f6',
  },
  confirmButton: {
    width: '100%',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    minHeight: '56px',
    border: 'none',
  },
  confirmButtonActive: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
  },
  confirmButtonDisabled: {
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
};

// Mobile responsive styles via media query simulation
const mobileStyles = \
  @media (max-width: 640px) {
    .narrative-block-container {
      padding: 16px;
      border-radius: 0;
      box-shadow: none;
    }
    
    .narrative-block-title {
      font-size: 22px;
    }
    
    .narrative-block-brief {
      font-size: 16px;
    }
  }
\;

// ============================================================================
// Export
// ============================================================================

export default NarrativeBlock;
