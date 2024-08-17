import { StyleSheet, Text, View } from "react-native";

import * as ExpoPax from "expo-pax";

export default function App() {
  ExpoPax.printStr("Hello World");
  return (
    <View style={styles.container}>
      <Text>Should have printed "Hello World"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
