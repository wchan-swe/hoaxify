import React from 'react';

const ButtonWithProgress = ({
  onClickSignup,
  pendingApiCall,
  passwordRepeatConfirmed,
  text,
}) => {
  return (
    <button
      className="btn btn-primary"
      onClick={onClickSignup}
      disabled={pendingApiCall || !passwordRepeatConfirmed}
    >
      {pendingApiCall && (
        <>
          <span
            className="spinner-border spinner-border-sm mr-2"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Loading...</span>
        </>
      )}
      {text}
    </button>
  );
};

export default ButtonWithProgress;
