import React from "react";

function SignUpForm({ onSignUp }) {
  return (
    <div className="signup_form_wrapper">
      <h3 className="header__heading header__heading--sub--alt">Sign Up</h3>
      <form
        className="form--signin"
        onSubmit={(event) => {
          event.preventDefault();
          const elements = event.target.elements;
          const email = elements.email.value;
          const firstName = elements.firstName.value;
          const lastName = elements.lastName.value;
          const password = elements.password.value;
          onSignUp({ firstName, lastName, email, password });
        }}
      >
        <div className="sign_in_form__group">
          <label className="form__label form__label--padding">
            {"First Name"}
            <input type="text" name="firstName" className="form__input" />
          </label>
        </div>
        <div className="sign_in_form__group">
          <label className="form__label form__label--padding">
            {"Last Name"}
            <input type="text" name="lastName" className="form__input" />
          </label>
        </div>
        <div className="sign_in_form__group">
          <label className="form__label form__label--padding">
            {"Email"}
            <input type="email" name="email" className="form__input" required />
          </label>
        </div>
        <div className="sign_in_form__group">
          <label className="form__label form__label--padding">
            {"Password"}
            <input
              type="password"
              name="password"
              className="form__input"
              required
            />
          </label>
        </div>
        <button className="button button__form--submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
