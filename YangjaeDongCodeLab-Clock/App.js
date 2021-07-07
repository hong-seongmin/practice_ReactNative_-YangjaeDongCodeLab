import * as React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import Container from './components/Container';
import Row from './components/Row';
import moment  from 'moment';

// window, document 참조

const Label = styled.Text`
  font-size:36px;
  font-weight:bold;
`;

export default function App() {
  const [now, setNow] = React.useState( moment() );//[쓰기, 읽기] 한 쌍의 state
  React.useEffect(() =>{//1. 이 컴퍼넌트가 처음으로 표시될 때 2.주시하는 대상에 변화가 일어났을 때
    //동작
    setInterval(() => {
      setNow(moment());
    }, 1000);//1초마다 새로운 moment를 만듦 -> setNow를 통해 업데이트 -> now가 새로운 모멘트로 변함
  }, [/*주시대상 */]);
  return (
    <Container>
      <Row>
        <Text>{now.format('ddd / MMM Do / YYYY')}</Text>
      </Row>
      <Row>
        <Label>{ now.format('HH') }</Label>
        <Label>{parseInt(now.format('s'), 10) % 2 === 1 ? ":" : ' '}</Label>
        <Label>{ now.format('mm') }</Label>
        <Label>{parseInt(now.format('s'), 10) % 2 === 1 ? ":" : ' '}</Label>
        <Label>{ now.format('ss') }</Label>
      </Row>
      <Row>
        <Text>
          now.format('HH') : now 중에 시간 부분만 추출
          parseInt : 문자열을 숫자로     
        </Text>
      </Row>
    </Container>
  );
}


