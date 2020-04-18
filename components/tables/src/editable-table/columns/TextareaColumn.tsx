import React, { useEffect, useRef } from 'react';

import { Textarea } from 'z-frontend-forms';
import { styled } from 'z-frontend-theme';

const StyledTextarea = styled(Textarea)`
  height: 40px;
  overflow-y: scroll;
  resize: none;
`;

export const TextareaColumn: React.FC<{}> = props => {
  const TextareaEl = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (TextareaEl && TextareaEl.current) {
      // Scroll to bottom of text area on mount
      TextareaEl.current.scrollTop = TextareaEl.current.scrollHeight;
      // place cursor at end
      TextareaEl.current.setSelectionRange(TextareaEl.current.value.length, TextareaEl.current.value.length);
    }
  }, []);

  return <StyledTextarea elementRef={TextareaEl} {...props} />;
};

export default TextareaColumn;
