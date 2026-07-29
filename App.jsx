import React from "react";
import "react-native-gesture-handler";
import "./utils/hooks/supabase";

import { SafeAreaProvider } from "react-native-safe-area-context";
import GroupchatScreen from "./src/screens/GroupchatScreen";
import RootNavigation from "./src/navigation/RootNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
     <RootNavigation/>
    </SafeAreaProvider>
  );
}
