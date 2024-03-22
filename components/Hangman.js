import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';

const Hangman = ({ incorrectGuesses, onRestart }) => {
  const maxIncorrectGuesses = 6; // Número máximo de partes da forca

  const drawHangman = () => {
    const hangmanParts = [
      <View style={styles.head} key="head" />,
      <View style={styles.body} key="body" />,
      <View style={styles.leftArm} key="leftArm" />,
      <View style={styles.rightArm} key="rightArm" />,
      <View style={styles.leftLeg} key="leftLeg" />,
      <View style={styles.rightLeg} key="rightLeg" />
    ];

    return hangmanParts.slice(0, incorrectGuesses);
  };

  const hasLost = incorrectGuesses >= maxIncorrectGuesses;

  return (
    <View style={styles.container}>
      {/* Chame a função drawHangman() aqui */}
      {drawHangman()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={hasLost}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Você perdeu!</Text>
            <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
              <Text style={styles.buttonText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1
  },
  body: {
    width: 2,
    height: 80,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  leftArm: {
    position: 'absolute',
    top: 60,
    left: -22,
    width: 50,
    height: 2,
    backgroundColor: 'black',
    transform: [{ rotate: '-45deg' }],
  },
  rightArm: {
    position: 'absolute',
    top: 60,
    right: -22,
    width: 50,
    height: 2,
    backgroundColor: 'black',
    transform: [{ rotate: '45deg' }],
  },
  leftLeg: {
    position: 'absolute',
    top: 136,
    left: -22,
    width: 50,
    height: 2,
    backgroundColor: 'black',
    transform: [{ rotate: '-45deg' }],
  },
  rightLeg: {
    position: 'absolute',
    top: 136,
    right: -22,
    width: 50,
    height: 2,
    backgroundColor: 'black',
    transform: [{ rotate: '45deg' }],
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
  },
  restartButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Hangman;
