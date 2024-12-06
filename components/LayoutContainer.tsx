import React from "react";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const image = {
  uri: "https://i.pinimg.com/736x/d8/00/22/d800229588e417a5ec2d71f4489de90b.jpg",
};

type LayoutProps = {
  children?: React.ReactNode;
};

export default function LayoutContainer({ children }: LayoutProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
          testID="Background"
        >
          {children}
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
});
