import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';

export const ContainerDetail = styled.View`
    flex: 1;
    background-color: ${ ({theme}) => theme.color.background};
`;


export const BotaoVoltar = styled.Text`
    font-size: 50px;
    top: 35px;
    left: 5px;
`;


export const Button = styled.Button`
    padding: 12px 8px;
    margin-top: 25px;
    border-radius: 5px;
    font-size: 20px;
    font-family: ${ ({theme}) => theme.fonts.regular };
    color: ${ ({theme}) => theme.color.text };
`;


export const TituloHeaderDetail = styled.Text`
    color: ${ ({theme}) => theme.color.text };
    font-size: 22px;
    border-left-color: ${ ({theme}) => theme.color.primary };
    border-left-width: 5px;
    margin-top: 3px;
    margin-left: 85px;
    padding-left: 8px;
`;


export const PosterHeaderDetail = styled.Image`
    height: 180px;
    margin-top: 20px;
`;


export const ContainerDetailOrganizado = styled.Text`
    color: ${ ({theme}) => theme.color.text };
    border-left-color: ${ ({theme}) => theme.color.primary };
    border-left-width: 5px;
    font-size: 17px;
    margin-left: 5px;
    margin-top: 20px;
    margin-left: 5px;
    padding-left: 12px;
`;

