export default function inputFiles() {
  const inputs = document.querySelectorAll(".input-file");

  if (inputs.length) {
    inputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const label = document.querySelector(`label[for="${input.id}"]`);
        const labelText = label.querySelector(".label-file-name");

        labelText.textContent = file.name;
      });
    });
  }
}
