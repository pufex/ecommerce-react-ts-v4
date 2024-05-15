export type InputTextType = {
    value: string,
    isError: boolean,
    errorMessage: string,   
}

export type fetchStatus = "loading" | "error" | "success"