import React from "react";

function SignInForm({ onSignIn }) {
  return (
    <div className="signin_form_wrapper">
      <h2 className="header__heading header__heading--sub--alt">Log In</h2>
      <form
        className="form--signin"
        onSubmit={(event) => {
          event.preventDefault();
          const elements = event.target.elements;
          const email = elements.email.value;
          const password = elements.password.value;
          onSignIn({ email, password });
        }}
      >
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
        <button className="button button__form--submit">Log in</button>
      </form>
    </div>
  );
}

export default SignInForm;
