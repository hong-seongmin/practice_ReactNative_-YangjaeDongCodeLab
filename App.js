import * as React from 'react';
import { Button, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import _ from "lodash";
import styled from 'styled-components/native';//native 안 붙이면 웹용

let numbers = [];
//1부터 45의 숫자를 생성
_.times(45, n => numbers.push(n + 1));
//섞는다
// numbers = _.shuffle( numbers );//numbers 섞고 재정의
const Container = styled.SafeAreaView`
  flex:1;
  justify-content:center;
  align-items:center;
  padding-top:${ Constants.statusBarHeight }px;//변수를 집어넣는 방식으로도 사용 가능(Template literals 사용 효과)
`;
const Row = styled.View`//css/디자인도구stylesheet 그대로 사용가능
  ;margin-bottom:24px;
  flex-direction:row;
  //알 수 없는 이유로 맨 앞에 ;붙여야 둘 다 적용
`;//백틱안
const Ball = styled.View`
  width:50px;
  height:50px;
  border-radius:25px;
  background:${props => {
    if(props.value < 11){
      return '#ffff00';
    }
    else if(props.value < 21){
      return '#0000ff';
    }
    else if(props.value <31){
      return '#ff0000'
    }
    else if(props.value < 41){
      return '#9c9c9c'
    }
    else{
      return '#00ff00';
    }
    }};
  justify-content:center;
  align-items:center;
`;
const Label = styled.Text`
  font-size:20px;
  font-weight:bold;
  color:#000000;
`;

export default function App() {
  //상태변화 state
  const [ displayNumbers, setNumbers ] = React.useState( _.shuffle( numbers ) );//Hook : displayNumbers - 상태의 읽기 전용 값, setNumbers - 상태를 변경하기 위한 업데이트 함수
  return (
    <Container>
      <Row>
        <Ball value={displayNumbers[0]}>
          <Label>{displayNumbers[0]}</Label>
        </Ball>
        <Ball value={displayNumbers[1]}>
          <Label>{displayNumbers[1]}</Label>
        </Ball>
        <Ball value={displayNumbers[2]}>
          <Label>{displayNumbers[2]}</Label>
        </Ball>
        <Ball value={displayNumbers[3]}>
          <Label>{displayNumbers[3]}</Label>
        </Ball>
        <Ball value={displayNumbers[4]}>
          <Label>{displayNumbers[4]}</Label>
        </Ball>
        <Ball value={displayNumbers[5]}>
          <Label>{displayNumbers[5]}</Label>
        </Ball>
      </Row>
      <Button title="다시 뽑기" onPress={() => setNumbers(_.shuffle(numbers))} />
    </Container>

  );
}

const styles = StyleSheet.create({
  // container:{
  //   flex:1,
  //   borderColor:'#000000',
  //   borderWidth:1,
  //   height:"100%",
  //   paddingTop:Constants.statusBarHeight,
  //   justifyContent:"center",//flex의 방향에서 정렬
  //   alignItems:"center",//flex의 수직방향에서 정렬, 필요한 크기만 할당
  // },
  // text:{
  //   textAlign:"center",//텍스트 정렬
  //   color:"#000000",
  //   fontWeight:"bold",
  //   fontSize:20

  // },
  // ball:{
  //   width:50,
  //   height:50,
  //   backgroundColor:"#e5e5e5",
  //   borderRadius:25,//모서리 깎음
  //   justifyContent:"center",
  //   alignContent:"content"
  // },

  // row:{
  //   flexDirection:"row",//가로로 추가되도록 설정
  //   marginBottom:24
  // },
});
