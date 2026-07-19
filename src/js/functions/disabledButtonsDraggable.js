export default function disabledButtonsDraggable() {
  const buttons = document.querySelectorAll(".btn-s");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.setAttribute("draggable", false);
    });
  }
}
