import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordToGuess = ({ word, guessedLetters }) => {
  const maskedWord = word
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  return (
    <View>
      <Text style={styles.palavra}>Palavra: {maskedWord}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    palavra: {
        marginBottom: 20
    }
});

export default WordToGuess;
