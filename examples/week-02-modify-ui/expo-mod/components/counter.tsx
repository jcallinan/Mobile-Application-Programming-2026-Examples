import React, { useState } from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';



export function Counter() {

  // 'count' is the variable, 'setCount' is the function to change it​

  const [count, setCount] = useState(0);



  return (

    <View style={styles.container}>

      <Text style={styles.countText}>Current Count: {count}</Text>

      <Button 

        title="Tap to Count" 

        onPress={() => setCount(count + 1)} 

      />

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    alignItems: 'center',

    padding: 20,

    backgroundColor: '#f0f0f0',

    borderRadius: 8,

  },

  countText: {

    fontSize: 18,

    marginBottom: 10,

  },

});