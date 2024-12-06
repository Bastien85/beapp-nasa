import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import PicturesListScreen from "../screens/PicturesListScreen";

const Tab = createMaterialBottomTabNavigator();

export default function TabBarNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      inactiveColor="#f1c70b"
      activeColor="#fff4d6"
      barStyle={{ backgroundColor: "#180151" }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallerie"
        component={PicturesListScreen}
        options={{
          tabBarLabel: "Gallerie",
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons
              name="view-gallery"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
