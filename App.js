import React, { useState, useEffect } from 'react';
import { View, Button, Modal, Text, StyleSheet } from 'react-native';
import WordToGuess from './components/WordToGuess';
import Hangman from './components/Hangman';
import Alphabet from './components/Alphabet';

const words = ['gato', 'cachorro', 'elefante', 'girafa', 'lobo']; // Lista de palavras possíveis
const totalRounds = 5; // Total de rodadas

const App = () => {
  const [round, setRound] = useState(1); // Contador de rodadas
  const [word, setWord] = useState(words[0]); // Inicializa a primeira palavra
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameFinished, setGameFinished] = useState(false); // Variável para controlar se o jogo foi finalizado

  useEffect(() => {
    const isWordGuessed = word.split('').every(letter => guessedLetters.includes(letter));
    if (isWordGuessed) {
      setGameWon(true);
    }
  }, [word, guessedLetters]);

  useEffect(() => {
    if (round === totalRounds && gameWon) {
      setGameFinished(true);
    }
  }, [round, gameWon]);

  const handleSelectLetter = letter => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setIncorrectGuesses(incorrectGuesses + 1);
        if (incorrectGuesses + 1 === 6) {
          setGameOver(true);
        }
      }
    }
  };

  const resetGame = () => {
    setRound(1);
    setWord(words[0]);
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setGameFinished(false); // Reinicia o estado do jogo finalizado
  };

  const nextRound = () => {
    if (round < totalRounds) {
      setRound(round + 1);
      setWord(words[round]); // Atualiza a palavra para a próxima rodada
      setGuessedLetters([]);
      setIncorrectGuesses(0);
      setGameOver(false);
      setGameWon(false);
    }
  };

  const handleRestart = () => {
    resetGame();
  };

  return (
    <View style={styles.container}>
      <WordToGuess word={word} guessedLetters={guessedLetters} />
      <Hangman incorrectGuesses={incorrectGuesses} onRestart={nextRound} />
      <Alphabet onSelect={handleSelectLetter} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={gameWon && round < totalRounds}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Você ganhou!</Text>
            <Button title="Próxima rodada" onPress={nextRound} color="#a71627"/>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={gameFinished}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Jogo finalizado, deseja reiniciar?</Text>
            <Button title="Reiniciar" onPress={handleRestart} color="#a71627"/>
          </View>
        </View>
      </Modal>
      {gameOver && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={gameOver}
          onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Você perdeu!</Text>
              <Button title="Reiniciar" onPress={handleRestart} color="#a71627"/>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  }
});

export default App;
