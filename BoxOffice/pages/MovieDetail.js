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
        let url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=dd7321fa737bfe8ec7b69d7695a8aff1'
        url += "&movieCd" + props.route.params.movieCd//기본 요청 URL + key + movieCd
        axios.get(url)
            .then(response=>{
                setInfo(response.data.movieInfoResult.movieInfo);
            })
            .catch(error=>{
                alert(error.message);
            })
    }, [])
    return(
        <Container>
            <Contents>
                {info === null ? (
                    <ActivityIndicator size={'large'} color="#00ff00" />
                ) : (
                    <>
                        <Title>영화제목</Title>
                        <Description>설명</Description>
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

