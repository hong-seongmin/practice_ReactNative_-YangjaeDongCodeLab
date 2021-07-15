/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import styled from 'styled-components';
import movieList from './movieList';
import _ from 'lodash'; 

function getInitials(string) {
  return string
    .split('')
    .map(char => {
      const index = (char.charCodeAt(0) - 44032) / 28 / 21;
      if (index >= 0) return String.fromCharCode(index + 4352);
      return char;
    })
    .join('');
}
 
const Container = styled.SafeAreaView`
  flex:1;
`;

const Contents = styled.View`
  flex:1;
  padding:24px;
`;

const Quiz = styled.Text`
  font-size:48px;
  font-weight:bold;
  text-align:center;
`;

const Button = styled.TouchableOpacity`
  width:100%;
  height:50px;
  background:#cc0000;
  justify-content:center;
  align-items:center; 
`;
 
const Label = styled.Text`
  font-size:22px;
  font-weight:bold;
  color:#ffffff;
`;

const App: () => React$Node = () => {
  const [quizList, setQuizList] = React.useState(_.shuffle(movieList));
  const [mode, setMode] = React.useState('quiz');//quiz or answer
  const onPress = React.useCallback(()=>{//실행하는 함수 넣고
    if(mode === 'answer'){
      setQuizList(quizList.slice(1))//퀴즈리스트의 1번부터나머지
    }
    setMode(mode === 'quiz' ? 'answer' : 'quiz')
  },[mode])//주시하는 함수 입력, mode가 변경되면 함수 재실행
  const retry = React.useCallback(()=>{
    setQuizList(_.shuffle(movieList));//다시 섞고
    setMode('quiz');//퀴즈모드
  }, [quizList])
  return (
    <>
      <Container>
        <Contents>
          {quizList.length ? (//quizlist의 length가 있을때와 없을때
            <Quiz>{mode === 'quiz' ? getInitials(quizList[0]) : quizList[0]}</Quiz>
          ) : (
            <Quiz>끝</Quiz>
          )}
          
          <Label>quiz모드면 초성만, 그 외는 영화제목 그대로</Label>
        </Contents>
        {quizList.length ? (
          <Button onPress={onPress} >
            <Label>{mode === 'quiz' ? "정답확인" : '다음'}</Label>
          </Button>
        ) : (
          <Button onPress={retry} >
            <Label>퀴즈 다시 시작</Label>
          </Button>
        )}

      </Container>
    </>
  );
};


export default App;
