export type actionFunction = (previousState: any, formData: FormData) => Promise<{message: string}>