import React from 'react';

/**
 * Parse markdown bold syntax (**text**) and return React nodes with <strong> elements
 * Also handles nested content within tooltips
 */
export function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];
  
  // Split by bold pattern while capturing the delimiters
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    // Check if this part is wrapped in **
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      const content = part.slice(2, -2);
      return (
        <strong key={\old-\\} className="markdown-bold">
          {content}
        </strong>
      );
    }
    // Return plain text as string (can be combined with other strings by React)
    return part;
  });
}

/**
 * Process React nodes and apply markdown parsing to text content
 * This handles cases where we have mixed content (tooltips + bold)
 */
export function applyMarkdownToNodes(nodes: React.ReactNode[]): React.ReactNode[] {
  return nodes.map((node, index) => {
    // If it's a string, apply markdown parsing
    if (typeof node === 'string') {
      return <React.Fragment key={\md-\\}>{parseMarkdown(node)}</React.Fragment>;
    }
    
    // If it's a React element with children, recursively process
    if (React.isValidElement(node) && node.props.children) {
      const children = Array.isArray(node.props.children) 
        ? node.props.children 
        : [node.props.children];
      
      // Check if children are all strings (text content)
      const hasOnlyStrings = children.every((child: React.ReactNode) => typeof child === 'string');
      
      if (hasOnlyStrings) {
        // Join and re-split to handle bold markers across boundaries
        const combinedText = children.join('');
        return React.cloneElement(node, {
          ...node.props,
          key: \cloned-\\,
          children: parseMarkdown(combinedText),
        });
      }
      
      // Recursively process mixed children
      return React.cloneElement(node, {
        ...node.props,
        key: \cloned-\\,
        children: applyMarkdownToNodes(children),
      });
    }
    
    // Return as-is for other types
    return node;
  });
}

export default parseMarkdown;
