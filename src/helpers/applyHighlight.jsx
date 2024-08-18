export const applyHighlight = (editor, mistakes) => {
  if (!editor || !mistakes || !mistakes.length) return;
  mistakes.forEach((mistake) => {
    const { offset, length, color } = mistake;
    editor
      .chain()
      .setTextSelection({ from: offset + 1, to: offset + length + 1 })
      .setHighlight({ color })
      .run();
  });

  setTimeout(() => {
    mistakes.forEach((mistake) => {
      const { offset, length } = mistake;
      const elements = document.querySelectorAll("mark");
      elements.forEach((el) => {
        if (
          el.textContent === editor.getText().substring(offset, offset + length)
        ) {
          el.setAttribute("data-offset", offset);
        }
      });
    });
  }, 100);
};
