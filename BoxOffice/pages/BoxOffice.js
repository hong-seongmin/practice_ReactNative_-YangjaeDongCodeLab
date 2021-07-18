import React from 'react';
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native';
import axios from 'axios';


const Container = styled.SafeAreaView`
    flex:1; 
    padding:24px;
`;

const Contents = styled.ScrollView`
    flex:1;
`;

const Title = styled.Text`
    font-size:24px;
    font-weight:bold;
    margin:12px;
`;


const ListItem = styled.TouchableOpacity`
    padding:12px;
    border-bottom-color:#e5e5e5;
    border-bottom-width:1px;
    flex-direction:row;
    align-items:center;
`;

const Rank = styled.Text`
    font-size:14px;
    color:#999999;
    margin-right:12px;
`;

const MovieName = styled.Text`
    font-size:18px;
    font-weight:bold;
`;

function BoxOffice(props){//영화진흥위원회 API : http://www.kobis.or.kr/kobisopenapi/homepg/main/main.do
    const [list, setList] = React.useState([]);
    React.useEffect(()=>{//화면에 나타나는 순간에 데이터 읽음
        axios.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=dd7321fa737bfe8ec7b69d7695a8aff1&targetDt=20210101')//ajax 비동기 자바스크립트 XML
            .then(response=>{
                setList(response.data.boxOfficeResult.dailyBoxOfficeList);//데이터가 json으로 온 것이라 객체로 인식되기 때문에 json 접근하듯이 하면 됨
            })//완료되는 시점
            .catch(error=>{
                alert(error.message);
            })//실패시 예외
    }, []);
    return(
        <Container>
            <Contents>
                <Title>박스 오피스</Title>
                {list.length === 0 &&(//리스트가 0개이면(API에서 정보 받아오는 동안) 로딩 그림 띄움
                    <ActivityIndicator size="large" color="#00ff00" />
                )}
                { list.map(item=>(
                    <ListItem key={item.movieCd} >
                        <Rank>{item.rank}</Rank>
                        <MovieName>{item.movieNm}</MovieName>
                    </ListItem>
                )) }
            </Contents>
        </Container>
    )
}

export default BoxOffice