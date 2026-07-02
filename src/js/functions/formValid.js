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

  const connectForm = document.querySelector(
    ".s-connect__form",
  );

  if (connectForm) {
    const validator = new JustValidate(connectForm);

    validator
      .addField("#connect-name", [
        {
          rule: "required",
        },
      ])
      .addField("#connect-tel", [
        {
          rule: "required",
        },
      ])
      .addField("#connect-policy", [
        {
          rule: "required",
        },
      ]);
  }
}
