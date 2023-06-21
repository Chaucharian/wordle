import {
  getStringData,
  STORAGE,
  getJsonData,
  storeStringData,
  storeJsonData,
} from "commons/helpers/storage";
import { IUserSession } from "commons/types/UserSession";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface useSessionReturnOptions {
  isFirstTime: boolean;
  isLoading: boolean;
  session: IUserSession;
  changeFirstTimeState: () => void;
  changeSession: (session: IUserSession) => void;
}
const initialSessionState = {
  played: 0,
  victories: 0,
};
export const useSession = (): useSessionReturnOptions => {
  const [session, setSession] = useState<IUserSession>(initialSessionState);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const initializeSession = useCallback(() => {
    const isFirstTime = getStringData(STORAGE.IS_FIRST_TIME);
    const session = getJsonData(STORAGE.LOCAL_SESSION) ?? initialSessionState;

    console.log("GET STORE SESSION", session);
    setIsFirstTime(!isFirstTime);
    setSession(session);
    setIsLoading(false);
  }, [setIsFirstTime, setSession, setIsLoading]);

  const changeSession = useCallback(
    (session: IUserSession) => {
      console.log("STORE SESSION", session);

      storeJsonData(STORAGE.LOCAL_SESSION, session);
      setSession(session);
    },
    [setSession]
  );

  const changeFirstTimeState = useCallback(() => {
    storeStringData(STORAGE.IS_FIRST_TIME, "false");
    setIsFirstTime(false);
  }, [setIsFirstTime]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession, setIsLoading]);

  return useMemo(
    () => ({
      session,
      isFirstTime,
      isLoading,
      changeFirstTimeState,
      changeSession,
    }),
    [session, isFirstTime, isLoading, changeFirstTimeState, changeSession]
  );
};
