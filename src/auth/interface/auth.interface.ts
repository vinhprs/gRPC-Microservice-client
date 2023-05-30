import { LoginInput, SignupInput } from "../dto/create-auth.dto";

export default interface AuthInterface {
    signIn(loginInput: LoginInput) : Promise<any>;
    signUp(signupInput: SignupInput) : Promise<any>;
    getAllProfiles(params: {}) : Promise<{data: []}>;
}