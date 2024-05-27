import { RootState } from "../../store";

export const getIsAuthorized= (state: RootState) => state.authorization.isAuthorized