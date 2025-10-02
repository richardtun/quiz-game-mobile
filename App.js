import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Rome", "Berlin", "Madrid"],
    answer: 0,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1,
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
    answer: 1,
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: 1,
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChoicePress = (idx) => {
    setSelected(idx);
    if (idx === questions[current].answer) setScore(score + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Completed!</Text>
        <Text style={styles.score}>Your score: {score} / {questions.length}</Text>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Game</Text>
      <Text style={styles.question}>{q.question}</Text>
      {q.choices.map((choice, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.choice,
            selected === idx &&
              (idx === q.answer ? styles.correct : styles.incorrect),
          ]}
          onPress={() => !selected && handleChoicePress(idx)}
          disabled={selected !== null}
        >
          <Text style={styles.choiceText}>{choice}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.score}>Score: {score}</Text>
      {selected !== null && (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {current + 1 < questions.length ? "Next Question" : "Show Result"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  choice: {
    backgroundColor: '#e7e7e7',
    padding: 12,
    borderRadius: 6,
    marginVertical: 7,
    width: '100%',
    alignItems: 'center',
  },
  choiceText: {
    fontSize: 16,
  },
  correct: {
    backgroundColor: '#a6e7a1',
  },
  incorrect: {
    backgroundColor: '#f0a1a1',
  },
  score: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4285f4',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});