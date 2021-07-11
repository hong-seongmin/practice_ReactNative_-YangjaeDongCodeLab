import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';//Async : 비동기
import produce from 'immer';
// import { json } from 'express';//Cannot read property 'prototype' of undefined 오류 원인 : https://velog.io/@juho00ng/TypeError-Cannot-read-property-prototype-of-undefined

/*
const array = [];
array.map//map : return을 모은 새로운 배열 만듦
array.filter 
//불변성 → 최근 나온 함수들은 원본을 수정하지 않고 새로운 배열을 return
array.push
array.pop
array.shift, unshift 등등
//예전에 사용하던 함수들은 원본을 수정
*/


const Container = styled.SafeAreaView`
 flex:1;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex:1;
  padding-top:${Constants.statusBarHeight}px;//px안 적으면 expected style 어쩌구 오류가 뜸
`;

const Contents = styled.ScrollView`
  flex:1;
  border:1px solid #ff0000;
  padding:8px 24px;//상하 좌우
`;

const ToDoItem = styled.View`
  flex-direction:row;
  align-items:center;//진행방향이 row니 세로 정리하려면 align-items
`;

const ToDoItemText = styled.Text`
 font-size: 20px;
 flex:1; 
`;

const ToDoItemButton = styled.Button``;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 8px 24px;//상하 좌우
`;

const Input = styled.TextInput`
  border:1px solid #e5e5e5;
  flex:1;//버튼 부분 외 나머지 사용할 수 있도록 설정
`;

const Button = styled.Button``;

//TouchableOpacity : 아무런 디자인 없는 View와 비슷한데, 터치하면 opacity변화
const Check = styled.TouchableOpacity`
  margin-right:4px;
`;

const CheckIcon = styled.Text`
  font-size:20px;
`;


export default function App() {
  const [list, setList] = React.useState([
    // {id: '1', todo:'할 일1'},
    // {id: '2', todo:'할 일2'}/*화면에 표시 안 되더라도 고유번호용 데이터는 해주는 것이 좋음 */
  ]);
  const [inputToDo, setInputToDo] = React.useState('할 일 입력')

  React.useEffect(()=>{
    AsyncStorage.getItem('list').then(//getItem : 데이터 불러오기, 이름을 지정해서 그 이름으로 가져옴
      data =>{//비동기로 동작하면 데이터 가져오는데 텀이 있으므로 이벤트 기반 동작
        if(data !== null){//data가 null(초기화/처음시작)이 아니라면
          setList(JSON.parse(data));  //string data를 JSON데이터로 변경 후 저장
        }
      }
    ).catch(error =>{
      alert(error);//확률은 낮지만 에러 발생 시 출력(주로 저장용량 초과시에만 오류남)
    });
  }, [])

  const store = (newList) => {//setItem : 데이터 저장
    setList(newList)//리스트 갱신
    AsyncStorage.setItem('list', JSON.stringify(newList));//저장소 저장(list라는 키로 stringify한 결과를 저장)

  }

  //ES6 - Promise : 비동기를 다루는 방식
  //async (function) + await : Promise 개선(약간 동기처럼 작동)

  //return 할 수 있는 값 : 컴포넌트, 컴포넌트로 이뤄진 배열
  return (
    <Container>
      <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' :'height'/*키보드를 어떻게 피할지 설정, 기기 마다 다르게 설정해줘야 문제가 안 발생함 */ } >
        <Contents>
          {list.map(item=>{
            return(
              <ToDoItem key={item.id}/*정렬기준용 내부데이터 */>
                <Check onPress={()=>{
                  store(produce(list, draft=>{//원본과 초안
                    const index = list.indexOf(item);//내가 클릭한 것이 몇 번째 아이템인가 확인
                    draft[index].done = !list[index].done;//기존 것과 반대값
                  }))
                }} >
                  <CheckIcon>{item.done ? '☑' : '☐'}</CheckIcon>
                </Check>
                <ToDoItemText>{item.todo}</ToDoItemText>
                <ToDoItemButton title="삭제" 
                onPress={ () => {//reject를 안쓴다면 데이터 변화를 인식하는 복잡한 과정을 거쳐야 함
                  const rejectedList = _.reject(list, element=>element.id === item.id)//lodash의 reject : 배열을 조건으로 제거하고 수정된 배열을 반환
                  store(rejectedList);//반환된 수정된 배열을 setList, 윗줄과 합쳐서 한 줄로도 작성 가능하긴 함
                } } />
              </ToDoItem>
            )
          })}
        </Contents>
        <InputContainer>
          <Input value={inputToDo} onChangeText={value=>setInputToDo(value)}/*value : 데이터 한 방향으로 전달(입력해도 설정값으로 바로 바뀜), onChangeText:양방향 연결 가능하게 해줌*//>
          <Button title="전송" onPress={ () => {
            //원본배열을 수정하는 push는 사용불가
            //inputToDo.push({...});
            if( inputToDo === '' ){
              return;//입력칸이 빈칸이면 종료
            }
            const newItem = {
              id:new Date().getTime().toString(),//고유값으로 만들기 위해 현재 시간으로 만듦
              todo:inputToDo,//할 일 내용
              done:false,//체크용
            };
            store([//새 배열 만들고 기존 배열을 분해해서 안에다 값을 넣고 새 데이터 만듦
              ...list,//기존배열, ... : 전개 연산자 Spread Operator
              newItem,//새것
            ]);
            setInputToDo('');//초기화
          } }/>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
