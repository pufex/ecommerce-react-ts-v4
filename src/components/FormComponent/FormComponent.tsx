import type { ReactElement } from "react"

import "./FormComponent.css"

type FormComponentProps = {
    children: ReactElement[] | ReactElement,
    title?: string,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isError?: boolean,
    errorMessage?: string,
}

const FormComponent = ({
    children,
    title,
    onSubmit,
    isError,
    errorMessage,
}: FormComponentProps) => {
  return <form 
    className="form-component"
    onSubmit={onSubmit}
  >
    <header className="form-component__header">
      {
        title
          && <h1 className="form-component__heading">
              {title}
          </h1>
      }
      {
        typeof isError != "undefined" && isError 
          && <h1 className="form-component__error-message">
            {errorMessage ?? "Something went wrong."}
          </h1>
      }
    </header>
    <div className="form-component__content">
      {
          children
      }
    </div>
  </form>
}

export default FormComponent
