import React from 'react'
import styled from 'styled-components/native';
import axios from 'axios';
import { response } from 'express';
import { ActivityIndicator } from 'react-native';

const Container = styled.SafeAreaView`
    flex:1;
`;

const Contents = styled.ScrollView`
    flex:1;
`;

const Title = styled.Text`
    font-size:24px;
    font-weight:bold;
    margin:12px;
`;

const Description = styled.Text`
    font-size:18px;
    margin:12px;
`;

const Back = styled.Button`

`;

function MovieDetail(props){
    const  [info, setInfo] = React.useState(null);//기본값 null
    React.useEffect(()=>{
        let url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=dd7321fa737bfe8ec7b69d7695a8aff1&movieCd=20200701';
        // url += "&movieCd=" + props.route.params.movieCd;//기본 요청 URL + key + movieCd
        axios.get(url)
            .then(response=>{
                setInfo(response.data.movieInfoResult.movieInfo);
            })
            .catch(error=>{
                alert(error.message);
            })
    }, [])
    let aaa = props.route.params.movieCd
    return(
        <Container>
            <Contents>
                {info === null ? (
                    <ActivityIndicator size={'large'} color="#00ff00" />
                ) : (
                    <>
                        <Title>{info.movieNm}</Title>
                        <Description>제작년도 : {info.prdtYear}년</Description>
                        <Description>개봉년도 : {info.openDt}</Description>
                        <Description>상영시간 : {info.showTm}</Description>
                        <Description>제작년도 : {info.prdtYear}</Description>
                        <Description>제작년도 : {aaa}</Description>
                        <Description>data: ${JSON.stringify(info)}</Description>
                    </>
                )}

                <Back title={'돌아가기'} onPress={()=>
                    props.navigation.goBack()
                }/>
            </Contents>
        </Container>
    )

}




export default MovieDetail;

