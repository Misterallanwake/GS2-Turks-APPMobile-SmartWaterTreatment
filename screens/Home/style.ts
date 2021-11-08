import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${ ({theme}) => theme.color.background};
`;

export const Header = styled.View`
    align-items: center;
`;
export const PosterHeader = styled.Image`
    width: 500px;
    height: 250px;
    opacity: 0.6;
`;
export const TituloHeader = styled.Text`
    color: ${ ({theme}) => theme.color.text_title };
    font-size: 30px;
    top: 16px;
`;

export const BotaoLabel = styled.Text`
    color: ${ ({theme}) => theme.color.text };
`;

export const SecaoFilmes = styled.View`
    margin: 16px;
`;

export const TituloSecao = styled.Text`
    color: #FFF;
    font-size: 21px;
    margin-top: 32px;
    margin-left: 16px;
    border-left-color: ${ ({theme}) => theme.color.primary };
    border-left-width: 5px;
    padding-left: 12px;
    
`;

export const Filmes = styled.View`

`;

export const CardFilme = styled(RectButton)`
    background-color: ${ ({theme}) => theme.color.background2 };
    border-radius: 10px;
    width: 150px;
    height: 260px;
    margin: 16px;
`;

export const CardFilme1 = styled(RectButton)`
    background-color: ${ ({theme}) => theme.color.background2 };
    border-radius: 10px;
    width: 320px;
    height: 235px;
    margin: 16px;
`;


export const Avaliacao1 = styled.View`
    align-self: center;
    flex-wrap: wrap;

`;


export const Avaliacao2 = styled.View`
    justify-content: space-evenly;

`;


export const Nota = styled.Text`
    color: ${ ({theme}) => theme.color.text };
    font-size: 14.5px;
    text-align: center;
    margin-bottom: 4px;

`;


export const Nota1 = styled.Text`
padding-top: 12.5px;
    color: ${ ({theme}) => theme.color.text };
    font-size: 14.5px;
    text-align: center;
    margin-bottom: 4px;

`;
