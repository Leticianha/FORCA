import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordToGuess = ({ word, guessedLetters }) => {
  const maskedWord = word
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.palavra}>ANIMAL:</Text>
      <Text style={styles.traco}>{maskedWord}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  traco: {
    marginBottom: 20,
    fontSize: 20
  }
});

export default WordToGuess;
