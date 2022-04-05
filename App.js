import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, BackHandler } from 'react-native';



const App = () => {

  const [inputValue, setInputValue] = useState('') // This veriable in React and javaScript 
  const [target, setTarget] = useState([])
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(30)




  const newQuestion = () => { // This function is generate random number between 1 to 10 every time this function re run when a user give the correct answer and this function generate a new random number
    const minimum = 1;
    const maximum = 10;
    const int1 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    const int2 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    setTarget([int1, int2])
  }

  useEffect(() => { // This not a custom function it is ready made React function and it is very importent when the screen change the text
    let interval = setInterval(() => { // This is timer in JavaScript programing language
      setTimer(prev => {
        if (prev === 1) clearInterval(interval)
        return prev - 1
      })
    }, 1000)
    newQuestion()
    return () => clearInterval(interval)

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",

    );

    return () => backHandler.remove();
  }, [score])



  const handleAnsewer = () => { // This is function that is check the correct answer and add score to 1 every correct answer
    const total = target[0] + target[1];

    // Check that total against the number
    if (total === Number(inputValue)) {
      setScore(score + 1)
    } else {
      if (score > 0) {
        setScore(score - 1)
      }
    }

    setInputValue('')
    // Call the function again
    newQuestion();
  }

  const handleExit = () => { // This is function that is exit the game 
    BackHandler.exitApp()
  }


  const handleReset = () => {
    setScore(0)
    setTimer(20)

  }

  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#F900BF' }}>Random Math Quiz</Text>
      <Text style={{ fontSize: 16, color: '#F900BF' }}> {target.join(' + ')} </Text>
      <Text style={{ fontSize: 16, color: '#F900BF' }}> Timer:  {timer} </Text>
      <TextInput
        style={styles.textInput}
        keyboardType="number-pad"
        placeholder="Answer The Question"
        value={inputValue} onChangeText={(enterText) => setInputValue(enterText)}
      />

     <View style={styles.button}>
      <Button style={styles.button} disabled={timer === 0} title='Answer' onPress={handleAnsewer} />
      </View>
      <View style={styles.button}>
      <Button style={styles.button} title='Exit Game' onPress={handleExit} />
      </View>
      <View style={styles.button} >
      <Button style={styles.button} title='Play Again' onPress={handleReset} />
      </View>

      {score === 10 && <Text style={{ fontSize: 16, color: '#F900BF' }}> Score: {score} Congrate you are master in Math!</Text>}

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },

  textInput: {
    height: 40,
    margin: 10,
    padding: 10
  },

button: {
 display: 'flex',
 margin: 20,
  width: 100
}
});

export default App
