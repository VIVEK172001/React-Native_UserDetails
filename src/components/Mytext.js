import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Mytext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color:'#0D0D0D',
    fontSize: 18,
    marginTop: 16,
  },
});

export default Mytext;
