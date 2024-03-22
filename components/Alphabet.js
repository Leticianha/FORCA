import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Alphabet = ({ onSelect }) => {
  const alphabetMatrix = [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
    ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  ];

  return (
    <View style={styles.alphabetContainer}>
      {alphabetMatrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.rowContainer}>
          {row.map((letter, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.button} 
              onPress={() => onSelect(letter)}>
              <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  alphabetContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#E1374C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase'
  },
});

export default Alphabet;
