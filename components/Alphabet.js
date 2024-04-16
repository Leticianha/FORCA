import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Alphabet = ({ onSelect, round }) => {
  const [inputValue, setInputValue] = useState('');
  const [chosenLetters, setChosenLetters] = useState(new Set());

  const handleTextChange = (text) => {
    const cleanedText = text.toLowerCase().replace(/[^a-z]/g, '');
    setInputValue(cleanedText);
    if (cleanedText.length > 0) {
      const lastTypedLetter = cleanedText[cleanedText.length - 1];
      if (!chosenLetters.has(lastTypedLetter)) {
        onSelect(lastTypedLetter);
        setChosenLetters(new Set(chosenLetters).add(lastTypedLetter));
      }
      setInputValue('');
    }
  };

  useEffect(() => {
    // Limpar letras escolhidas ao avançar para a próxima rodada
    setChosenLetters(new Set());
  }, [round]); // Executar sempre que a rodada mudar

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={inputValue}
        autoCapitalize="none"
        autoCompleteType="off"
        keyboardType="ascii-capable"
      />
      {chosenLetters.size > 0 && (
        <View style={styles.chosenLettersContainer}>
          <Text style={styles.chosenLettersText}>Letras escolhidas:</Text>
          <Text style={styles.chosenLettersText}>{Array.from(chosenLetters).join(', ')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: 300,
    textAlign: 'center',
    marginBottom: 20,
  },
  chosenLettersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chosenLettersText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default Alphabet;
