import errorStile from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div id="error-page">
      <div className={`${errorStile.container} mt-30`}>
        <h1 className="text text_type_main-large"> Oops!</h1>
        <p className="text text_type_main-medium">
          Sorry, an unexpected error has occurred.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
