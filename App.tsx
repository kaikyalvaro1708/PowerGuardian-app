// App.tsx
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}
