import React from 'react';//React 권장사항 : 첫줄엔 React import
import Container from '../components/Container';
import styled from 'styled-components';
import Contents from '../components/Contents';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Text = styled.Text`
    font-size:20px;
    line-height:28px;
`;

function Detail({navigation, route}){
    navigation.setOptions({title:route.params.date})//title : 상단 화살표 옆 제목

    const [text, setText] = React.useState('');
    React.useEffect(()=>{//새로 페이지 들어올 때마다
        AsyncStorage.getItem('list')
            .then(data=>{
                const list = JSON.parse(data);
                const diary = list.find(element => element.date === route.params.date)//list에서 element의 date가 params의 date와 일치하는 오브젝트를 찾아서
                setText(diary.text);//diary의 text를 넣음
            })

    }, []);

    return(
        <Container>
            <Contents>
                <Text>{text}</Text>
            </Contents>
        </Container>
    )
}

export default Detail;