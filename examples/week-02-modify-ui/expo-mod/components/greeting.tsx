import { StyleSheet, Text, View } from 'react-native';


// "name" is a prop passed from the parent screen​

export function Greeting({ name }: { name: string }) {

  return (

    <View style={styles.container}>

      <Text style={styles.text}>Hello, {name}!</Text>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    padding: 10,

    marginVertical: 5,

  },

  text: {

    fontSize: 24,

    fontWeight: '600',

    color: '#003594', // Pitt Blue​

  },

});