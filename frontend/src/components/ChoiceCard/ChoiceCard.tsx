import React, { useState, useCallback } from 'react';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface LearnMoreContent {
  concept: string;
  explanation: string;
  thinkers: string[];
  realWorldExample: string;
  counterArguments: string;
}

export interface ChoiceCardProps {
  id: string;
  text: string; // May contain [[TERM|definition]] markers
  consequence: string; // May contain [[TERM|definition]] markers
  effects: Record<string, number>;
  learnMore?: LearnMoreContent;
  isSelected?: boolean;
  onSelect: () => void;
  parseTooltips?: (text: string) => React.ReactNode; // Function from Tooltip component
}

// ============================================================================
// Helper Components
// ============================================================================

interface EffectBadgeProps {
  label: string;
  value: number;
}

const EffectBadge: React.FC<EffectBadgeProps> = ({ label, value }) => {
  const getEmoji = (label: string): string => {
    const emojiMap: Record<string, string> = {
      gdp: '??',
      unemployment: '??',
      inflation: '??',
      debt: '??',
      happiness: '??',
      environment: '??',
      popularity: '??',
      investment: '??',
      exports: '??',
      imports: '??',
    };
    return emojiMap[label.toLowerCase()] || '?';
  };

  const getColor = (value: number): string => {
    if (value > 0) return '#10b981'; // green-500
    if (value < 0) return '#ef4444'; // red-500
    return '#6b7280'; // gray-500
  };

  const formatValue = (val: number): string => {
    if (val > 0) return `+${val}`;
    if (val < 0) return `${val}`;
    return '0';
  };

  return (
    <span style={styles.effectBadge}>
      <span style={styles.effectEmoji}>{getEmoji(label)}</span>
      <span style={{ ...styles.effectValue, color: getColor(value) }}>
        {formatValue(value)}
      </span>
    </span>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  id,
  text,
  consequence,
  effects,
  learnMore,
  isSelected = false,
  onSelect,
  parseTooltips,
}) => {
  const [isLearnMoreExpanded, setIsLearnMoreExpanded] = useState(false);
  const [isPerspectivesExpanded, setIsPerspectivesExpanded] = useState(false);

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      // Prevent selection when clicking expansion buttons
      const target = e.target as HTMLElement;
      if (
        target.closest('[data-expand-button]') ||
        target.closest('[data-nested-section]')
      ) {
        return;
      }
      onSelect();
    },
    [onSelect]
  );

  const toggleLearnMore = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLearnMoreExpanded((prev) => !prev);
    // Reset nested section when closing
    setIsPerspectivesExpanded((prev) => (prev ? false : prev));
  }, []);

  const togglePerspectives = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPerspectivesExpanded((prev) => !prev);
  }, []);

  // Default tooltip parser if none provided
  const renderText = useCallback(
    (content: string): React.ReactNode => {
      if (parseTooltips) {
        return parseTooltips(content);
      }
      // Simple fallback: strip [[TERM|definition]] markers
      return content.replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, '');
    },
    [parseTooltips]
  );

  const hasLearnMore = learnMore !== undefined;

  return (
    <div
      role="article"
      aria-label={`Choice: ${text.slice(0, 50)}${text.length > 50 ? "..." : ""}`}
      data-choice-id={id}
      onClick={handleCardClick}
      style={{
        ...styles.card,
        ...(isSelected ? styles.cardSelected : {}),
      }}
    >
      {/* Always Visible: Choice Text + Consequence */}
      <div style={styles.header}>
        <h3 style={styles.choiceText}>{renderText(text)}</h3>
        <p style={styles.consequence}>{renderText(consequence)}</p>

        {hasLearnMore && (
          <button
            type="button"
            data-expand-button
            onClick={toggleLearnMore}
            aria-expanded={isLearnMoreExpanded}
            aria-controls={`learn-more-${id}`}
            style={{
              ...styles.expandButton,
              ...(isLearnMoreExpanded ? styles.expandButtonActive : {}),
            }}
          >
            <span style={styles.expandIcon}>
              {isLearnMoreExpanded ? '?' : '?'}
            </span>
            <span>{isLearnMoreExpanded ? 'Learn Less' : 'Learn More'}</span>
          </button>
        )}
      </div>

      {/* Effects Display */}
      <div style={styles.effectsContainer}>
        <span style={styles.effectsLabel}>Effects:</span>
        <div style={styles.effectsList}>
          {Object.entries(effects).map(([key, value]) => (
            <EffectBadge key={key} label={key} value={value} />
          ))}
        </div>
      </div>

      {/* Expandable "Learn More" Section */}
      {hasLearnMore && (
        <div
          id={`learn-more-${id}`}
          data-nested-section
          style={{
            ...styles.learnMoreSection,
            ...(isLearnMoreExpanded ? styles.learnMoreExpanded : {}),
          }}
        >
          <div style={styles.learnMoreContent}>
            {/* Concept Header */}
            <div style={styles.conceptBlock}>
              <h4 style={styles.conceptLabel}>Concept:</h4>
              <span style={styles.conceptName}>{learnMore.concept}</span>
            </div>

            {/* Explanation */}
            <div style={styles.contentBlock}>
              <h4 style={styles.blockLabel}>Explanation:</h4>
              <p style={styles.blockText}>{learnMore.explanation}</p>
            </div>

            {/* Thinkers */}
            <div style={styles.contentBlock}>
              <h4 style={styles.blockLabel}>Key Thinkers:</h4>
              <div style={styles.thinkersList}>
                {learnMore.thinkers.map((thinker, index) => (
                  <span key={index} style={styles.thinkerTag}>
                    {thinker}
                  </span>
                ))}
              </div>
            </div>

            {/* Real World Example */}
            <div style={styles.contentBlock}>
              <h4 style={styles.blockLabel}>Real-World Example:</h4>
              <p style={styles.blockText}>{learnMore.realWorldExample}</p>
            </div>

            {/* Nested "Other Perspectives" Section */}
            <div style={styles.perspectivesContainer}>
              <button
                type="button"
                data-expand-button
                onClick={togglePerspectives}
                aria-expanded={isPerspectivesExpanded}
                aria-controls={`perspectives-${id}`}
                style={{
                  ...styles.perspectivesButton,
                  ...(isPerspectivesExpanded ? styles.perspectivesButtonActive : {}),
                }}
              >
                <span style={styles.expandIcon}>
                  {isPerspectivesExpanded ? '?' : '?'}
                </span>
                <span>Other Perspectives</span>
              </button>

              <div
                id={`perspectives-${id}`}
                style={{
                  ...styles.perspectivesSection,
                  ...(isPerspectivesExpanded ? styles.perspectivesExpanded : {}),
                }}
              >
                <div style={styles.perspectivesContent}>
                  <h5 style={styles.perspectivesLabel}>
                    Counter-arguments from other economic schools:
                  </h5>
                  <p style={styles.perspectivesText}>
                    {learnMore.counterArguments}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        style={{
          ...styles.actionButton,
          ...(isSelected ? styles.actionButtonSelected : {}),
        }}
        aria-pressed={isSelected}
      >
        {isSelected ? 'Selected' : 'Make This Choice'}
      </button>
    </div>
  );
};

// ============================================================================
// CSS-in-JS Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '16px',
  },
  cardSelected: {
    borderColor: '#3b82f6',
    boxShadow: '0 4px 6px rgba(59, 130, 246, 0.15), 0 2px 4px rgba(59, 130, 246, 0.1)',
    backgroundColor: '#eff6ff',
  },
  header: {
    marginBottom: '16px',
  },
  choiceText: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 12px 0',
    lineHeight: 1.4,
  },
  consequence: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 12px 0',
    lineHeight: 1.5,
  },
  expandButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px', // Touch target
  },
  expandButtonActive: {
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
  },
  expandIcon: {
    fontSize: '12px',
    transition: 'transform 0.2s ease',
  },
  effectsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  effectsLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#6b7280',
  },
  effectsList: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    flexWrap: 'wrap',
  },
  effectBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    fontWeight: 600,
  },
  effectEmoji: {
    fontSize: '16px',
  },
  effectValue: {
    fontSize: '14px',
    fontWeight: 600,
  },
  learnMoreSection: {
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    opacity: 0,
  },
  learnMoreExpanded: {
    maxHeight: '2000px', // Arbitrary large value for animation
    opacity: 1,
  },
  learnMoreContent: {
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    marginBottom: '16px',
  },
  conceptBlock: {
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    borderLeft: '4px solid #3b82f6',
  },
  conceptLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 4px 0',
  },
  conceptName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#1e40af',
  },
  contentBlock: {
    marginBottom: '16px',
  },
  blockLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    margin: '0 0 8px 0',
  },
  blockText: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: 1.6,
    margin: 0,
  },
  thinkersList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8px',
  },
  thinkerTag: {
    padding: '4px 10px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 500,
  },
  perspectivesContainer: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e2e8f0',
  },
  perspectivesButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px', // Touch target
  },
  perspectivesButtonActive: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    color: '#92400e',
  },
  perspectivesSection: {
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    opacity: 0,
  },
  perspectivesExpanded: {
    maxHeight: '1000px',
    opacity: 1,
  },
  perspectivesContent: {
    padding: '12px',
    marginTop: '12px',
    backgroundColor: '#fffbeb',
    borderRadius: '6px',
    border: '1px solid #fcd34d',
  },
  perspectivesLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#92400e',
    margin: '0 0 8px 0',
  },
  perspectivesText: {
    fontSize: '13px',
    color: '#78350f',
    lineHeight: 1.6,
    margin: 0,
  },
  actionButton: {
    width: '100%',
    padding: '14px 24px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '48px', // Touch target
  },
  actionButtonSelected: {
    backgroundColor: '#10b981',
  },
};

// ============================================================================
// Export
// ============================================================================

export default ChoiceCard;
