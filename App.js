import React, { useState, useEffect } from 'react';
import { View, Button, Modal, Text, StyleSheet } from 'react-native';
import WordToGuess from './components/WordToGuess';
import Hangman from './components/Hangman';
import Alphabet from './components/Alphabet';

const words = [
  'gato', 'cachorro', 'elefante', 'girafa', 'lobo',
  'tigre', 'rato', 'papagaio', 'macaco',
  'cobra', 'golfinho', 'urso', 'panda',
  'zebra', 'camelo', 'coruja', 'abelha', 'esquilo',
  'vaca', 'iguana', 'capivara', 'coala', 'calopsita'
];

const totalRounds = 5;

const shuffleArray = array => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [round, setRound] = useState(1);
  const [wordsList, setWordsList] = useState(shuffleArray(words));
  const [wordIndex, setWordIndex] = useState(0);
  const [word, setWord] = useState(wordsList[wordIndex]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [totalCorrectRounds, setTotalCorrectRounds] = useState(0);
  const [totalIncorrectRounds, setTotalIncorrectRounds] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);

  useEffect(() => {
    const isWordGuessed = word.split('').every(letter => guessedLetters.includes(letter));
    if (isWordGuessed && round < totalRounds) {
      setShowWinModal(true);
    } else if (!isWordGuessed && incorrectGuesses === 6 && round < totalRounds) {
      setShowLoseModal(true);
    } else if (round >= totalRounds) {
      setGameFinished(true);
    }
  }, [word, guessedLetters, round, totalRounds, incorrectGuesses]);

  const handleSelectLetter = letter => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setIncorrectGuesses(incorrectGuesses + 1);
      }
    }
  };

  const resetGame = () => {
    setRound(1);
    setWordsList(shuffleArray(words));
    setWordIndex(0);
    setWord(wordsList[0]);
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setGameFinished(false);
    setTotalCorrectRounds(0);
    setTotalIncorrectRounds(0);
    setShowWinModal(false);
    setShowLoseModal(false);
  };

  const handleNextRound = () => {
    setShowWinModal(false);
    setShowLoseModal(false);
    nextRound();
  };

  const nextRound = () => {
    if (round < totalRounds) {
      const newIndex = wordIndex + 1;
      setRound(round + 1);
      setWordIndex(newIndex);
      setWord(wordsList[newIndex]);
      
      // Reinicializar guessedLetters se estiver preenchido
      if (guessedLetters.length > 0) {
        setGuessedLetters([]);
      }
  
      setIncorrectGuesses(0);
      setGameOver(false);
    } else {
      setGameFinished(true);
    }
  };
  
  

  const handleRestart = () => {
    resetGame();
  };

  console.log('Round:', round);
  console.log('Word:', word);
  console.log('Guessed Letters:', guessedLetters);

  return (
    <View style={styles.container}>
      <Text style={styles.roundText}>Rodada: {round}</Text>
      <WordToGuess word={word} guessedLetters={guessedLetters} />
      <Hangman incorrectGuesses={incorrectGuesses} onRestart={nextRound} />
      <Alphabet onSelect={handleSelectLetter} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showWinModal}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Você ganhou!</Text>
            <Button title="Próxima rodada" onPress={handleNextRound} color="#a71627"/>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLoseModal}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Você perdeu!</Text>
            <Button title="Próxima rodada" onPress={handleNextRound} color="#a71627"/>
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
            <Text style={styles.modalText}>Jogo finalizado!</Text>
            <Text style={styles.modalText}>Rodadas ganhas: {totalCorrectRounds}</Text>
            <Text style={styles.modalText}>Rodadas perdidas: {totalIncorrectRounds}</Text>
            <Button title="Reiniciar" onPress={handleRestart} color="#a71627"/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginBottom: 10,
  },
});

export default App;
