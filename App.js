import * as React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import _ from "lodash";


const numbers = [];
//1부터 45의 숫자를 생성
_.times(45, n => numbers.push(n + 1))
//섞는다



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.ball}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.ball}>
          <Text style={styles.text}>11</Text>
        </View>
        <View style={styles.ball}>
          <Text style={styles.text}>21</Text>
        </View>
        <View style={styles.ball}>
          <Text style={styles.text}>31</Text>
        </View>
        <View style={styles.ball}>
          <Text style={styles.text}>41</Text>
        </View>
        <View style={styles.ball}>
          <Text style={styles.text}>45</Text>
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    borderColor:'#000000',
    borderWidth:1,
    height:"100%",
    paddingTop:Constants.statusBarHeight,
    justifyContent:"center",//flex의 방향에서 정렬
    alignItems:"center",//flex의 수직방향에서 정렬, 필요한 크기만 할당
  },
  text:{
    textAlign:"center",//텍스트 정렬
    color:"#000000",
    fontWeight:"bold",
    fontSize:20

  },
  ball:{
    width:50,
    height:50,
    backgroundColor:"#e5e5e5",
    borderRadius:25,//모서리 깎음
    justifyContent:"center",
    alignContent:"content"
  },

  row:{
    flexDirection:"row"//가로로 추가되도록 설정
  },
});
