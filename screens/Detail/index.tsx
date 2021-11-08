import React from "react";
import { useRoute } from "@react-navigation/core";
import { Button, Text} from "react-native";
import { 
    ContainerDetail,
    BotaoVoltar,
    PosterHeaderDetail,
    TituloHeaderDetail,
    ContainerDetailOrganizado
} from './style'



export default function Detail({navigation}) {
    const route = useRoute()
    const {filme} = route.params
    
    function handleBack(){
        navigation.goBack()

    }

    return (

        <ContainerDetail>
            <BotaoVoltar>
            <Button  onPress={handleBack}  title="Voltar" color="#FF0066" ></Button>
            </BotaoVoltar>
            <TituloHeaderDetail>Página de Detalhes</TituloHeaderDetail>
                <PosterHeaderDetail
                source={{uri: 'https://image.tmdb.org/t/p/w500/'+ filme.backdrop_path}} />
            <ContainerDetailOrganizado>
                <Text>Filme: {filme.title} {"\n"}{"\n"}</Text>
                <Text>Sinopse: {filme.overview} {"\n"}{"\n"}</Text>
                <Text>Data de lançamento: {filme.release_date} {"\n"}{"\n"}</Text>
                <Text>Língua original: {filme.original_language} {"\n"}{"\n"}</Text>
                <Text>Nota: {filme.vote_average} {"\n"}{"\n"}</Text>
                <Text>N° de votos: {filme.vote_count} {"\n"}{"\n"}</Text>
                <Text>Ranking: {filme.popularity} {"\n"}{"\n"}</Text>
            </ContainerDetailOrganizado>
        </ContainerDetail>       

    )
}