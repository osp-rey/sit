export default function formValid() {
  const modalFeedbackForm = document.querySelector(
    "#modal-feedback .modal__form",
  );

  if (modalFeedbackForm) {
    const validator = new JustValidate(modalFeedbackForm);

    validator
      .addField("#modal-feedback-name", [
        {
          rule: "required",
        },
      ])
      .addField("#modal-feedback-tel", [
        {
          rule: "required",
        },
      ])
      .addField("#modal-feedback-policy", [
        {
          rule: "required",
        },
      ]);
  }
}
