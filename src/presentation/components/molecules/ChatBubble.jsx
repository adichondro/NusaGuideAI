import React from 'react';

export function ChatBubble({ role, content }) {
  const isAi = role === 'model' || role === 'ai' || role === 'system';
  
  const parseMarkdown = (text) => {
    if (!text) return '';

    let parsed = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const lines = parsed.split('\n');
    let inList = false;
    const parsedLines = lines.map(line => {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('* ') || cleanLine.startsWith('- ')) {
        const itemContent = cleanLine.substring(2);
        let listPrefix = '';
        if (!inList) {
          inList = true;
          listPrefix = '<ul class="list-disc ml-5 my-1.5">';
        }
        return listPrefix + `<li>${itemContent}</li>`;
      } else {
        let listSuffix = '';
        if (inList) {
          inList = false;
          listSuffix = '</ul>';
        }
        return listSuffix + line;
      }
    });

    if (inList) {
      parsedLines.push('</ul>');
    }

    return parsedLines.join('\n').replace(/\n/g, '<br>');
  };

  return (
    <div className={`flex w-full ${isAi ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-[20px] px-5 py-3 text-sm leading-relaxed ${
          isAi
            ? 'bg-surface-container-high text-on-surface rounded-tl-sm border border-outline'
            : 'bg-primary text-white rounded-tr-sm'
        }`}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />
    </div>
  );
}
