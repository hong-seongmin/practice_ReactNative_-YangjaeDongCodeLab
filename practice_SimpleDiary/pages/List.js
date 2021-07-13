import React from 'react';//React 권장사항 : 첫줄엔 React import
import Container from '../components/Container';
import Contents from '../components/Contents';
import Sutton from '../components/Sutton';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [list, setList]  = React.useState( [] );

    const load = async()=>{
        const data = await AsyncStorage.getItem('list');
        if (data !== null){
            setList(JSON.parse(data));
        }
    }
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {//focus되면 데이터 가져옴 
            load();
        });

        load();//개발도중의 refresh는 useEffect는 되고 focus는 안되기 때문에 목록이 안 보일 수 있기 때문에 목록이 잘 보이도록 함(개발 외의 경우에는 거의 일어나지 않음)
    
        return unsubscribe;
      }, [navigation]);
    return(
        <Container>
            <Contents>
                {list.map(item=>{
                    return(
                        <ListItem key={item.data} onPress={()=>{
                            navigation.navigate("Detail")//네비게이션에서 써야 하는 함수세트도 다 넘겨줌
                        }} >
                            <Label>{item.date}</Label>
                        </ListItem>
                    )
                })}

            </Contents>
            <Sutton onPress={()=>{
                navigation.navigate('Form')
            }} >새 일기 작성</Sutton>
            

        </Container>
    )
}

export default List;