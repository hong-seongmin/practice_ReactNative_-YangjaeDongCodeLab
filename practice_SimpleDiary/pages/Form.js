import React from 'react';//React 권장사항 : 첫줄엔 React import
import Container from '../components/Container';
import Contents from '../components/Contents';
import Sutton from '../components/Sutton';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Label = styled.Text`
    font-size:20px;
    font-weight:bold;
    margin-bottom:12px;
`;

const Input = styled.TextInput`
    width:100%;
    border:1px solid #666666;
    padding:4px;
    font-size:20px;
    margin-bottom:12px;
`;

function Form({navigation}){
    const [date, setDate] = React.useState('');
    const [text, setText] = React.useState('');

    const store = async()=>{
        if (date==='')return;
        if (text==='')return;
        let list = await AsyncStorage.getItem('list');
        if (list===null){//빈 배열
            list=[];
        }else{
            list=JSON.parse(list);//JSON형태로 바꿔서 업데이트
        }

        list.push({//state로 관리되는 애가 아니라 async에서 꺼낸 배열이므로 push 사용 가능
            date,
            text,
        });
        await AsyncStorage.setItem('list', JSON.stringify(list))
        navigation.goBack();
    }

    return(
        <Container>
            <Contents>
                <Label>날짜</Label>
                <Input placeholder={"YYYY-MM-DD 형식을 입력하세요"} value={date } onChangeText={value=>setDate(value)} />
                <Label>내용</Label>
                <Input multiline={true} /*numberOfLines={10}*/ style={{height:200}} value={text} onChangeText={value=>setText(value)} />
            </Contents>
                
            <Sutton onPress={store} >저장</Sutton>
        </Container>
    )
}

export default Form;