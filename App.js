import React, { useState, useEffect } from 'react'; // This React Package taht is store varibale and make logic in code
import { StyleSheet, Text, View, TextInput, Button, BackHandler } from 'react-native';  // This React Native mobile user intreface Like Text and buttons and so on



const App = () => { // This function is by default create React team if you think I remove this function than your app crashed so do not touch this 

  const [inputValue, setInputValue] = useState('') // This variable taht is store input value when you answer the question 
  const [target, setTarget] = useState([]) // This variable store Random Math quiz as empty array 
  const [score, setScore] = useState(0) // This variable store score by default score 0
  const [timer, setTimer] = useState(30) // This variable play timer 




  const newQuestion = () => { // This function is generate random number between 1 to 10 every time this function re run when a user give the correct answer and this function generate a new random number
    const minimum = 1; // This variable  mean the random math quiz never go form less tahn 0  
    const maximum = 10; // This variable  mean the random math quiz never go form  above to  10 or 15   
    const int1 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; // This is pure JavaScript method that is create random number
    const int2 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; // This is pure JavaScript method that is create random number
    setTarget([int1, int2]) // This is function hold int , int2 to dispaly on the screen
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

    const backHandler = BackHandler.addEventListener( // This Function allow to exit the app
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


  const handleReset = () => { //  I add additional function that is allow user to play again the game 
    setScore(0)
    setTimer(30)

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

      { score === 10  && <Text style={{ fontSize: 32, color: '#F900BF', textAlign: 'center' }}>  (Score: 10 / {score}) Congrate you are master in Math!</Text>}
      { (score <= 9 && timer < 1)  && <Text style={{ fontSize: 32, color: '#F900BF', textAlign: 'center' }}> ( Score: 10 / {score}) Oh boy this is the  math class!</Text>}

    </View>

  )
}

const styles = StyleSheet.create({ // This is the style the app like font size and position and so on so far
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
