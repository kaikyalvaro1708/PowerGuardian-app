import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import Dashboard from "../screens/dashboard/Dashboard";
import Location from "../screens/location/Location";
import TimeMonitor from "../screens/timeMonitor/TimeMonitor";
import AnalysisImpact from "../screens/analysisImpact/AnalysisImpact";
import { EmergencyProcedures } from "../screens/emergencyProcedures/EmergencyProcedures";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Localização") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Monitor") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Análise") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Emergência") {
            iconName = focused ? "medical" : "medical-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: Platform.OS === "android" ? 105 : "auto",
          paddingBottom: Platform.OS === "android" ? 8 : "auto",
          paddingTop: 8,
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerStyle: {
          backgroundColor: "#1976d2",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Localização"
        component={Location}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Monitor"
        component={TimeMonitor}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Análise"
        component={AnalysisImpact}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Emergência"
        component={EmergencyProcedures}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1976d2" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
