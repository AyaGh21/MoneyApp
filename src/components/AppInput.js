import { TextInput, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function AppInput({ ...props }) {
  return (
    <TextInput style={styles.input} placeholderTextColor="#999" {...props} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginVertical: 8,
  },
});
