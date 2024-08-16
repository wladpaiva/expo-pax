import { StyleSheet, Text, View } from "react-native";

import * as ExpoPax from "expo-pax";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoPax.getTheme()}</Text>
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
