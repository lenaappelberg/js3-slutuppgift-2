export const getErrorMessage=(errorCode)=>{
    switch (errorCode) {
        case "auth/email-already in":
            return "email in use"
    
        default:
            return "Försök igen"
    }
}