import { IAUthenticatedUser } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserGlobalStore {
  user: IAUthenticatedUser | null;
  updateUser: (user: IAUthenticatedUser | null) => void;
  logoutUser: () => void;
}

const useUserGlobalStore = create<IUserGlobalStore>()(
  persist(
    (set, get) => ({
      user: null,
      updateUser: (user) => {
        set({
          user,
        });
      },
      logoutUser: () => {
        AsyncStorage.clear();
        set({ user: null });
      },
    }),
    {
      name: "check-list",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserGlobalStore;
