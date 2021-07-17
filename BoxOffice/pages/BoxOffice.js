import React from 'react';
import styled from 'styled-components/native';
import axios from 'axios';


const Container = styled.SafeAreaView`
    flex:1; 
    padding:24px;
`;

const Title = styled.Text`
    font-size:24px;
    font-weight:bold;
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

function BoxOffice(props){
    const [list, setList] = React.useState([]);
    React.useEffect(()=>{//화면에 나타나는 순간에 데이터 읽음
        axios.get('http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=dd7321fa737bfe8ec7b69d7695a8aff1&targetDt=20120101')//ajax 비동기 자바스크립트 XML
            .then(response=>{
                setList(response.data.boxOfficeResult.dailyBoxOfficeList)//데이터가 json으로 온 것이라 객체로 인식되기 때문에 json 접근하듯이 하면 됨
            })//완료되는 시점
            .catch(error=>{
                alert(error.message);
            })//실패시 예외
    }, []);
    return(
        <Container>
            <Title>박스 오피스</Title>
            {list.map(item=>{
                <ListItem key={item.movieCd} >
                    <Rank>{item.rank}</Rank>
                    <MovieName>{item.movieNm}</MovieName>
                </ListItem>
            })}

        </Container>
    )
}

export default BoxOffice