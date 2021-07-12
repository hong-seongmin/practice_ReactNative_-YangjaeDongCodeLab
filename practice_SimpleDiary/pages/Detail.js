import React from 'react';//React 권장사항 : 첫줄엔 React import
import Container from '../components/Container';
import styled from 'styled-components';
import Contents from '../components/Contents';

const Text = styled.Text`
    font-size:20px;
    line-height:28px;
`;

function Detail({navigation}){
    return(
        <Container>
            <Contents>
                <Text>{'아무글씨'}</Text>
            </Contents>
        </Container>
    )
}

export default Detail;