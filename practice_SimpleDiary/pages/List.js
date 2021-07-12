import React from 'react';//React 권장사항 : 첫줄엔 React import
import Container from '../components/Container';
import Contents from '../components/Contents';
import Sutton from '../components/Sutton';
import styled from 'styled-components/native';

const ListItem = styled.TouchableOpacity`
    width:100%;
    padding:12px 0px;
    border-bottom-color:#aaaaaa;
    border-bottom-width:1px;
`;

const Label = styled.Text`
    font-size:20px;
`;

//구조 분해 할당, Destructuring Assignment
function List({navigation}){
    return(
        <Container>
            <Contents>
                <ListItem onPress={()=>{
                    navigation.navigate("Detail")//네비게이션에서 써야 하는 함수세트도 다 넘겨줌
                }} >
                    <Label>2021-07-12</Label>
                </ListItem>
            </Contents>
            <Sutton onPress={()=>{
                navigation.navigate('Form')
            }} >새 일기 작성</Sutton>
            

        </Container>
    )
}

export default List;