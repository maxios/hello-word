import { StyleSheet, Text, View } from 'react-native';
 
export default ({ name = "flota" }: { name?: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello {name}!</Text>
  </View>
);
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});