const TEXT_NODE = 3;

export function removeMentionWithBackspace(event: KeyboardEvent, container: Node) {
  // fix backspace bug in FF
  // https://bugzilla.mozilla.org/show_bug.cgi?id=685445
  // workaround modified from http://jsfiddle.net/4d23y74j/333/
  const selection = window.getSelection();
  if (!selection.isCollapsed || !selection.rangeCount) {
    return;
  }

  const currentRange = selection.getRangeAt(selection.rangeCount - 1);
  if (currentRange.commonAncestorContainer.nodeType === TEXT_NODE && currentRange.startOffset > 0) {
    // just regular characters being deleted
    return;
  }

  const range = document.createRange();
  if (selection.anchorNode !== container) {
    // selection is in character mode. expand it to the whole editable field
    range.selectNodeContents(container);
    range.setEndBefore(selection.anchorNode);
  } else if (selection.anchorOffset > 0) {
    range.setEnd(container, selection.anchorOffset);
  } else {
    // reached the beginning of editable field
    return;
  }
  range.setStart(container, range.endOffset - 1);

  const previousNode = range.cloneContents().lastChild as Element;
  if (previousNode && previousNode.className === 'mention-placeholder') {
    // delete mention
    range.deleteContents();
    event.preventDefault();
  }
}
