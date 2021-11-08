{/* 
Grupo Turks

Integrantes:

Allan de Rimini Matsui Malatesta	RM: 81941
André Dal Maso Nunes Roxo		    RM: 83022
Eduardo Balarini de Oliveira		RM: 82408
Marcos Paulo Amaro dos Santos    	RM: 82379


*/}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { Filme } from '../../model/Filme';
import { 
    Container, 
    Header, 
    PosterHeader, 
    TituloHeader, 
    SecaoFilmes,
    TituloSecao,
    CardFilme,
    Avaliacao1,
    Avaliacao2,
    Nota,
    Nota1
} from './style'


const dados_tiete_exigido = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "563", mes2_turbidez: "563", mes3_turbidez: "563", mes4_turbidez: "563", mes5_turbidez: "563", mes6_turbidez: "563", mes7_turbidez: "563", mes8_turbidez: "242", mes9_turbidez: "242", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "124", mes2_cor: "124", mes3_cor: "124", mes4_cor: "124", mes5_cor: "124", mes6_cor: "124", mes7_cor: "124", mes8_cor: "242", mes9_cor: "242", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "563", mes2_cloro: "563", mes3_cloro: "563", mes4_cloro: "563", mes5_cloro: "563", mes6_cloro: "563", mes7_cloro: "563", mes8_cloro: "242", mes9_cloro: "242", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "563", mes2_coliforme: "563", mes3_coliforme: "563", mes4_coliforme: "563", mes5_coliforme: "563", mes6_coliforme: "563", mes7_coliforme: "563", mes8_coliforme: "242", mes9_coliforme: "242", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "563", mes2_escherichia: "563", mes3_escherichia: "563", mes4_escherichia: "563", mes5_escherichia: "563", mes6_escherichia: "563", mes7_escherichia: "563", mes8_escherichia: "242", mes9_escherichia: "242", enunciado6: "Escherichia Coli" },
    
];

const dados_tiete_realizado = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "614", mes2_turbidez: "593", mes3_turbidez: "597", mes4_turbidez: "586", mes5_turbidez: "587", mes6_turbidez: "582", mes7_turbidez: "590", mes8_turbidez: "593", mes9_turbidez: "373", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "189", mes2_cor: "182", mes3_cor: "183", mes4_cor: "181", mes5_cor: "184", mes6_cor: "255", mes7_cor: "261", mes8_cor: "593", mes9_cor: "373", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "614", mes2_cloro: "593", mes3_cloro: "597", mes4_cloro: "586", mes5_cloro: "587", mes6_cloro: "582", mes7_cloro: "590", mes8_cloro: "593", mes9_cloro: "373", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "614", mes2_coliforme: "593", mes3_coliforme: "597", mes4_coliforme: "583", mes5_coliforme: "587", mes6_coliforme: "582", mes7_coliforme: "589", mes8_coliforme: "593", mes9_coliforme: "371", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "614", mes2_escherichia: "593", mes3_escherichia: "597", mes4_escherichia: "583", mes5_escherichia: "587", mes6_escherichia: "582", mes7_escherichia: "589", mes8_escherichia: "593", mes9_escherichia: "371", enunciado6: "Escherichia Coli" },
    
];

const dados_tiete_conforme = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "613", mes2_turbidez: "593", mes3_turbidez: "597", mes4_turbidez: "586", mes5_turbidez: "587", mes6_turbidez: "582", mes7_turbidez: "590", mes8_turbidez: "593", mes9_turbidez: "373", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "188", mes2_cor: "181", mes3_cor: "181", mes4_cor: "181", mes5_cor: "184", mes6_cor: "254", mes7_cor: "261", mes8_cor: "591", mes9_cor: "371", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "614", mes2_cloro: "593", mes3_cloro: "597", mes4_cloro: "586", mes5_cloro: "587", mes6_cloro: "582", mes7_cloro: "590", mes8_cloro: "593", mes9_cloro: "373", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "614", mes2_coliforme: "591", mes3_coliforme: "592", mes4_coliforme: "579", mes5_coliforme: "582", mes6_coliforme: "582", mes7_coliforme: "586", mes8_coliforme: "592", mes9_coliforme: "371", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "614", mes2_escherichia: "593", mes3_escherichia: "597", mes4_escherichia: "583", mes5_escherichia: "587", mes6_escherichia: "582", mes7_escherichia: "589", mes8_escherichia: "593", mes9_escherichia: "371", enunciado6: "Escherichia Coli" },
    
];






const dados_cantareira_exigido = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "725", mes2_turbidez: "725", mes3_turbidez: "725", mes4_turbidez: "725", mes5_turbidez: "725", mes6_turbidez: "725", mes7_turbidez: "725", mes8_turbidez: "290", mes9_turbidez: "290", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "231", mes2_cor: "231", mes3_cor: "231", mes4_cor: "231", mes5_cor: "231", mes6_cor: "231", mes7_cor: "231", mes8_cor: "290", mes9_cor: "290", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "725", mes2_cloro: "725", mes3_cloro: "725", mes4_cloro: "725", mes5_cloro: "725", mes6_cloro: "725", mes7_cloro: "725", mes8_cloro: "290", mes9_cloro: "290", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "725", mes2_coliforme: "725", mes3_coliforme: "725", mes4_coliforme: "725", mes5_coliforme: "725", mes6_coliforme: "725", mes7_coliforme: "725", mes8_coliforme: "290", mes9_coliforme: "290", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "725", mes2_escherichia: "725", mes3_escherichia: "725", mes4_escherichia: "725", mes5_escherichia: "725", mes6_escherichia: "725", mes7_escherichia: "725", mes8_escherichia: "290", mes9_escherichia: "290", enunciado6: "Escherichia Coli" },
    
];

const dados_cantareira_realizado = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "792", mes2_turbidez: "793", mes3_turbidez: "797", mes4_turbidez: "808", mes5_turbidez: "702", mes6_turbidez: "805", mes7_turbidez: "807", mes8_turbidez: "773", mes9_turbidez: "598", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "273", mes2_cor: "269", mes3_cor: "279", mes4_cor: "284", mes5_cor: "276", mes6_cor: "454", mes7_cor: "495", mes8_cor: "773", mes9_cor: "598", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "792", mes2_cloro: "793", mes3_cloro: "797", mes4_cloro: "807", mes5_cloro: "793", mes6_cloro: "805", mes7_cloro: "801", mes8_cloro: "773", mes9_cloro: "592", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "790", mes2_coliforme: "793", mes3_coliforme: "797", mes4_coliforme: "804", mes5_coliforme: "792", mes6_coliforme: "802", mes7_coliforme: "801", mes8_coliforme: "773", mes9_coliforme: "592", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "790", mes2_escherichia: "793", mes3_escherichia: "797", mes4_escherichia: "804", mes5_escherichia: "792", mes6_escherichia: "802", mes7_escherichia: "801", mes8_escherichia: "773", mes9_escherichia: "592", enunciado6: "Escherichia Coli" },
    
];

const dados_cantareira_conforme = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "792", mes2_turbidez: "791", mes3_turbidez: "794", mes4_turbidez: "808", mes5_turbidez: "792", mes6_turbidez: "805", mes7_turbidez: "807", mes8_turbidez: "772", mes9_turbidez: "596", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "273", mes2_cor: "269", mes3_cor: "279", mes4_cor: "284", mes5_cor: "276", mes6_cor: "454", mes7_cor: "495", mes8_cor: "772", mes9_cor: "595", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "792", mes2_cloro: "793", mes3_cloro: "797", mes4_cloro: "807", mes5_cloro: "793", mes6_cloro: "805", mes7_cloro: "810", mes8_cloro: "773", mes9_cloro: "592", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "784", mes2_coliforme: "784", mes3_coliforme: "790", mes4_coliforme: "801", mes5_coliforme: "781", mes6_coliforme: "786", mes7_coliforme: "798", mes8_coliforme: "772", mes9_coliforme: "589", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "790", mes2_escherichia: "793", mes3_escherichia: "796", mes4_escherichia: "804", mes5_escherichia: "792", mes6_escherichia: "802", mes7_escherichia: "801", mes8_escherichia: "773", mes9_escherichia: "592", enunciado6: "Escherichia Coli" },
    
];




const dados_guara_exigido = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "801", mes2_turbidez: "801", mes3_turbidez: "801", mes4_turbidez: "801", mes5_turbidez: "801", mes6_turbidez: "801", mes7_turbidez: "801", mes8_turbidez: "346", mes9_turbidez: "346", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "177", mes2_cor: "177", mes3_cor: "177", mes4_cor: "177", mes5_cor: "177", mes6_cor: "177", mes7_cor: "177", mes8_cor: "346", mes9_cor: "346", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "801", mes2_cloro: "801", mes3_cloro: "801", mes4_cloro: "801", mes5_cloro: "801", mes6_cloro: "801", mes7_cloro: "801", mes8_cloro: "801", mes9_cloro: "801", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "801", mes2_coliforme: "801", mes3_coliforme: "801", mes4_coliforme: "801", mes5_coliforme: "801", mes6_coliforme: "801", mes7_coliforme: "801", mes8_coliforme: "346", mes9_coliforme: "346", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "801", mes2_escherichia: "801", mes3_escherichia: "801", mes4_escherichia: "801", mes5_escherichia: "801", mes6_escherichia: "801", mes7_escherichia: "801", mes8_escherichia: "346", mes9_escherichia: "346", enunciado6: "Escherichia Coli" },
    
];

const dados_guara_realizado = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "801", mes2_turbidez: "832", mes3_turbidez: "803", mes4_turbidez: "809", mes5_turbidez: "834", mes6_turbidez: "810", mes7_turbidez: "804", mes8_turbidez: "392", mes9_turbidez: "350", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "229", mes2_cor: "211", mes3_cor: "211", mes4_cor: "222", mes5_cor: "209", mes6_cor: "227", mes7_cor: "252", mes8_cor: "392", mes9_cor: "350", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "803", mes2_cloro: "831", mes3_cloro: "805", mes4_cloro: "810", mes5_cloro: "834", mes6_cloro: "811", mes7_cloro: "810", mes8_cloro: "390", mes9_cloro: "352", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "801", mes2_coliforme: "832", mes3_coliforme: "804", mes4_coliforme: "805", mes5_coliforme: "825", mes6_coliforme: "808", mes7_coliforme: "804", mes8_coliforme: "392", mes9_coliforme: "349", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "801", mes2_escherichia: "832", mes3_escherichia: "804", mes4_escherichia: "805", mes5_escherichia: "825", mes6_escherichia: "808", mes7_escherichia: "804", mes8_escherichia: "392", mes9_escherichia: "349", enunciado6: "Escherichia Coli" },
    
];

const dados_guara_conforme = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "790", mes2_turbidez: "829", mes3_turbidez: "801", mes4_turbidez: "805", mes5_turbidez: "831", mes6_turbidez: "805", mes7_turbidez: "800", mes8_turbidez: "389", mes9_turbidez: "348", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "227", mes2_cor: "210", mes3_cor: "211", mes4_cor: "222", mes5_cor: "208", mes6_cor: "227", mes7_cor: "252", mes8_cor: "390", mes9_cor: "346", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "775", mes2_cloro: "816", mes3_cloro: "793", mes4_cloro: "803", mes5_cloro: "825", mes6_cloro: "803", mes7_cloro: "807", mes8_cloro: "386", mes9_cloro: "340", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "792", mes2_coliforme: "816", mes3_coliforme: "789", mes4_coliforme: "777", mes5_coliforme: "816", mes6_coliforme: "807", mes7_coliforme: "800", mes8_coliforme: "391", mes9_coliforme: "347", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "801", mes2_escherichia: "832", mes3_escherichia: "804", mes4_escherichia: "805", mes5_escherichia: "825", mes6_escherichia: "808", mes7_escherichia: "804", mes8_escherichia: "392", mes9_escherichia: "349", enunciado6: "Escherichia Coli" },
    
];




const dados_marsilac_exigido = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "10", mes2_turbidez: "10", mes3_turbidez: "10", mes4_turbidez: "10", mes5_turbidez: "10", mes6_turbidez: "10", mes7_turbidez: "10", mes8_turbidez: "5", mes9_turbidez: "5", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "5", mes2_cor: "5", mes3_cor: "5", mes4_cor: "5", mes5_cor: "5", mes6_cor: "5", mes7_cor: "5", mes8_cor: "5", mes9_cor: "5", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "10", mes2_cloro: "10", mes3_cloro: "10", mes4_cloro: "10", mes5_cloro: "10", mes6_cloro: "10", mes7_cloro: "10", mes8_cloro: "5", mes9_cloro: "5", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "10", mes2_coliforme: "10", mes3_coliforme: "10", mes4_coliforme: "10", mes5_coliforme: "10", mes6_coliforme: "10", mes7_coliforme: "10", mes8_coliforme: "5", mes9_coliforme: "5", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "10", mes2_escherichia: "10", mes3_escherichia: "10", mes4_escherichia: "10", mes5_escherichia: "10", mes6_escherichia: "10", mes7_escherichia: "10", mes8_escherichia: "5", mes9_escherichia: "5", enunciado6: "Escherichia Coli" },
    
];

const dados_marsilac_realizado = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "11", mes2_turbidez: "11", mes3_turbidez: "11", mes4_turbidez: "11", mes5_turbidez: "12", mes6_turbidez: "11", mes7_turbidez: "11", mes8_turbidez: "7", mes9_turbidez: "8", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "7", mes2_cor: "6", mes3_cor: "5", mes4_cor: "7", mes5_cor: "6", mes6_cor: "8", mes7_cor: "6", mes8_cor: "7", mes9_cor: "5", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "11", mes2_cloro: "11", mes3_cloro: "11", mes4_cloro: "11", mes5_cloro: "13", mes6_cloro: "11", mes7_cloro: "11", mes8_cloro: "7", mes9_cloro: "5", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "11", mes2_coliforme: "11", mes3_coliforme: "11", mes4_coliforme: "11", mes5_coliforme: "12", mes6_coliforme: "11", mes7_coliforme: "11", mes8_coliforme: "7", mes9_coliforme: "5", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "11", mes2_escherichia: "11", mes3_escherichia: "11", mes4_escherichia: "11", mes5_escherichia: "12", mes6_escherichia: "11", mes7_escherichia: "11", mes8_escherichia: "7", mes9_escherichia: "5", enunciado6: "Escherichia Coli" },
    
];

const dados_marsilac_conforme = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "11", mes2_turbidez: "11", mes3_turbidez: "11", mes4_turbidez: "9", mes5_turbidez: "12", mes6_turbidez: "11", mes7_turbidez: "11", mes8_turbidez: "7", mes9_turbidez: "5", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "7", mes2_cor: "6", mes3_cor: "5", mes4_cor: "7", mes5_cor: "6", mes6_cor: "8", mes7_cor: "6", mes8_cor: "7", mes9_cor: "5", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "11", mes2_cloro: "11", mes3_cloro: "11", mes4_cloro: "11", mes5_cloro: "13", mes6_cloro: "11", mes7_cloro: "11", mes8_cloro: "7", mes9_cloro: "5", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "11", mes2_coliforme: "11", mes3_coliforme: "11", mes4_coliforme: "11", mes5_coliforme: "12", mes6_coliforme: "11", mes7_coliforme: "11", mes8_coliforme: "7", mes9_coliforme: "5", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "11", mes2_escherichia: "11", mes3_escherichia: "11", mes4_escherichia: "11", mes5_escherichia: "12", mes6_escherichia: "11", mes7_escherichia: "11", mes8_escherichia: "7", mes9_escherichia: "5", enunciado6: "Escherichia Coli" },
    
];



const dados_oriental_exigido = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "10", mes2_turbidez: "10", mes3_turbidez: "10", mes4_turbidez: "10", mes5_turbidez: "10", mes6_turbidez: "10", mes7_turbidez: "10", mes8_turbidez: "5", mes9_turbidez: "5", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "5", mes2_cor: "5", mes3_cor: "5", mes4_cor: "5", mes5_cor: "5", mes6_cor: "5", mes7_cor: "5", mes8_cor: "5", mes9_cor: "5", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "10", mes2_cloro: "10", mes3_cloro: "10", mes4_cloro: "10", mes5_cloro: "10", mes6_cloro: "10", mes7_cloro: "10", mes8_cloro: "5", mes9_cloro: "5", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "10", mes2_coliforme: "10", mes3_coliforme: "10", mes4_coliforme: "10", mes5_coliforme: "10", mes6_coliforme: "10", mes7_coliforme: "10", mes8_coliforme: "5", mes9_coliforme: "5", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "10", mes2_escherichia: "10", mes3_escherichia: "10", mes4_escherichia: "10", mes5_escherichia: "10", mes6_escherichia: "10", mes7_escherichia: "10", mes8_escherichia: "5", mes9_escherichia: "5", enunciado6: "Escherichia Coli" },
    
];

const dados_oriental_realizado = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "10", mes2_turbidez: "11", mes3_turbidez: "11", mes4_turbidez: "11", mes5_turbidez: "12", mes6_turbidez: "11", mes7_turbidez: "11", mes8_turbidez: "7", mes9_turbidez: "5", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "6", mes2_cor: "6", mes3_cor: "5", mes4_cor: "7", mes5_cor: "6", mes6_cor: "8", mes7_cor: "6", mes8_cor: "7", mes9_cor: "5", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "10", mes2_cloro: "11", mes3_cloro: "11", mes4_cloro: "11", mes5_cloro: "12", mes6_cloro: "11", mes7_cloro: "11", mes8_cloro: "7", mes9_cloro: "5", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "10", mes2_coliforme: "11", mes3_coliforme: "11", mes4_coliforme: "11", mes5_coliforme: "12", mes6_coliforme: "11", mes7_coliforme: "11", mes8_coliforme: "7", mes9_coliforme: "5", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "10", mes2_escherichia: "11", mes3_escherichia: "11", mes4_escherichia: "11", mes5_escherichia: "12", mes6_escherichia: "11", mes7_escherichia: "11", mes8_escherichia: "7", mes9_escherichia: "5", enunciado6: "Escherichia Coli" },
    
];

const dados_oriental_conforme = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "10", mes2_turbidez: "11", mes3_turbidez: "10", mes4_turbidez: "10", mes5_turbidez: "10", mes6_turbidez: "11", mes7_turbidez: "11", mes8_turbidez: "7", mes9_turbidez: "5", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "6", mes2_cor: "5", mes3_cor: "5", mes4_cor: "7", mes5_cor: "6", mes6_cor: "8", mes7_cor: "6", mes8_cor: "7", mes9_cor: "5", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "10", mes2_cloro: "11", mes3_cloro: "11", mes4_cloro: "11", mes5_cloro: "12", mes6_cloro: "11", mes7_cloro: "11", mes8_cloro: "7", mes9_cloro: "5", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "10", mes2_coliforme: "11", mes3_coliforme: "11", mes4_coliforme: "11", mes5_coliforme: "12", mes6_coliforme: "11", mes7_coliforme: "11", mes8_coliforme: "7", mes9_coliforme: "5", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "10", mes2_escherichia: "11", mes3_escherichia: "11", mes4_escherichia: "11", mes5_escherichia: "12", mes6_escherichia: "11", mes7_escherichia: "11", mes8_escherichia: "7", mes9_escherichia: "5", enunciado6: "Escherichia Coli" },
    
];




const dados_rioclaro_exigido = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "205", mes2_turbidez: "205", mes3_turbidez: "205", mes4_turbidez: "205", mes5_turbidez: "205", mes6_turbidez: "205", mes7_turbidez: "205", mes8_turbidez: "148", mes9_turbidez: "148", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "49", mes2_cor: "49", mes3_cor: "49", mes4_cor: "49", mes5_cor: "49", mes6_cor: "49", mes7_cor: "49", mes8_cor: "148", mes9_cor: "148", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "205", mes2_cloro: "205", mes3_cloro: "205", mes4_cloro: "205", mes5_cloro: "205", mes6_cloro: "205", mes7_cloro: "205", mes8_cloro: "148", mes9_cloro: "148", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "205", mes2_coliforme: "205", mes3_coliforme: "205", mes4_coliforme: "205", mes5_coliforme: "205", mes6_coliforme: "205", mes7_coliforme: "205", mes8_coliforme: "148", mes9_coliforme: "148", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "205", mes2_escherichia: "205", mes3_escherichia: "205", mes4_escherichia: "205", mes5_escherichia: "205", mes6_escherichia: "205", mes7_escherichia: "205", mes8_escherichia: "148", mes9_escherichia: "148", enunciado6: "Escherichia Coli" },
    
];

const dados_rioclaro_realizado = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "235", mes2_turbidez: "210", mes3_turbidez: "213", mes4_turbidez: "215", mes5_turbidez: "212", mes6_turbidez: "210", mes7_turbidez: "220", mes8_turbidez: "219", mes9_turbidez: "162", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "81", mes2_cor: "70", mes3_cor: "67", mes4_cor: "71", mes5_cor: "68", mes6_cor: "195", mes7_cor: "220", mes8_cor: "219", mes9_cor: "162", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "235", mes2_cloro: "210", mes3_cloro: "213", mes4_cloro: "215", mes5_cloro: "212", mes6_cloro: "210", mes7_cloro: "220", mes8_cloro: "219", mes9_cloro: "162", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "235", mes2_coliforme: "210", mes3_coliforme: "213", mes4_coliforme: "215", mes5_coliforme: "212", mes6_coliforme: "210", mes7_coliforme: "220", mes8_coliforme: "219", mes9_coliforme: "219", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "235", mes2_escherichia: "210", mes3_escherichia: "213", mes4_escherichia: "215", mes5_escherichia: "212", mes6_escherichia: "210", mes7_escherichia: "220", mes8_escherichia: "219", mes9_escherichia: "159", enunciado6: "Escherichia Coli" },
    
];

const dados_rioclaro_conforme = [
    { id: 1, mes1: "Janeiro", mes2: "Fevereiro", mes3: "Março", mes4: "Abril", mes5: "Maio", mes6: "Junho", mes7: "Julho", mes8: "Agosto", mes9: "Setembro", enunciado1: "Período 2021" },
    { id: 2, mes1_turbidez: "235", mes2_turbidez: "210", mes3_turbidez: "213", mes4_turbidez: "215", mes5_turbidez: "212", mes6_turbidez: "210", mes7_turbidez: "220", mes8_turbidez: "219", mes9_turbidez: "162", enunciado2: "Turbidez" },
    { id: 3, mes1_cor: "81", mes2_cor: "70", mes3_cor: "67", mes4_cor: "71", mes5_cor: "68", mes6_cor: "195", mes7_cor: "220", mes8_cor: "219", mes9_cor: "162", enunciado3: "Cor aparente" },
    { id: 4, mes1_cloro: "235", mes2_cloro: "210", mes3_cloro: "213", mes4_cloro: "215", mes5_cloro: "212", mes6_cloro: "210", mes7_cloro: "220", mes8_cloro: "219", mes9_cloro: "162", enunciado4: "Cloro Residual Livre" },
    { id: 5, mes1_coliforme: "233", mes2_coliforme: "210", mes3_coliforme: "213", mes4_coliforme: "214", mes5_coliforme: "212", mes6_coliforme: "210", mes7_coliforme: "220", mes8_coliforme: "219", mes9_coliforme: "159", enunciado5: "Coliforme Total" },
    { id: 6, mes1_escherichia: "235", mes2_escherichia: "210", mes3_escherichia: "213", mes4_escherichia: "215", mes5_escherichia: "212", mes6_escherichia: "210", mes7_escherichia: "220", mes8_escherichia: "219", mes9_escherichia: "159", enunciado6: "Escherichia Coli" },
    
];

export default function Home({navigation}){
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        async function carregarDados(){
            const resposta = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=b23de9ce5966791cdd497de14a592707')
            setFilmes(resposta.data.results)
        }

        carregarDados()
    });

    function handleDetail(filme: Filme){
        navigation.navigate('Detalhes', {filme})
    }

    return (
        <ScrollView>
        <Container>
            <Header>
            <PosterHeader source={ {uri: 'https://jpimg.com.br/uploads/2017/04/680891695-sistema-cantareira-fotos-publicas-4.jpg'} } />
                    <TituloHeader> Smart Water Treatment </TituloHeader>
            </Header>

            <SecaoFilmes>





<TituloSecao>Alto Tietê (Exigido)</TituloSecao>


<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_tiete_exigido} renderItem={ ({item}) => 

                <CardFilme>

                    {/*
                    <Avaliacao>
                            <Nota>{item.enunciado}</Nota>
                    </Avaliacao>  */}
                    
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>

                    </CardFilme>

                }/>

</Avaliacao2>



<TituloSecao>Alto Tietê (Realizado)</TituloSecao>


<Avaliacao2> 

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_tiete_realizado} renderItem={ ({item}) => 

                <CardFilme>
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>


<TituloSecao>Alto Tietê (Conforme)</TituloSecao>

<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_tiete_conforme} renderItem={ ({item}) => 

                <CardFilme>
                                         <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>













<TituloSecao>Cantareira (Exigido)</TituloSecao>


<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_cantareira_exigido} renderItem={ ({item}) => 

                <CardFilme>

                    {/*
                    <Avaliacao>
                            <Nota>{item.enunciado}</Nota>
                    </Avaliacao>  */}
                    
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>

                    </CardFilme>

                }/>

</Avaliacao2>



<TituloSecao>Cantareira (Realizado)</TituloSecao>


<Avaliacao2> 

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_cantareira_realizado} renderItem={ ({item}) => 

                <CardFilme>
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>


<TituloSecao>Cantareira (Conforme)</TituloSecao>

<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_cantareira_conforme} renderItem={ ({item}) => 

                <CardFilme>
                                         <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>















<TituloSecao>Guarapiranga (Exigido)</TituloSecao>


<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_guara_exigido} renderItem={ ({item}) => 

                <CardFilme>

                    {/*
                    <Avaliacao>
                            <Nota>{item.enunciado}</Nota>
                    </Avaliacao>  */}
                    
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>

                    </CardFilme>

                }/>

</Avaliacao2>



<TituloSecao>Guarapiranga (Realizado)</TituloSecao>


<Avaliacao2> 

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_guara_realizado} renderItem={ ({item}) => 

                <CardFilme>
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>


<TituloSecao>Guarapiranga (Conforme)</TituloSecao>

<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_guara_conforme} renderItem={ ({item}) => 

                <CardFilme>
                                         <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>














<TituloSecao>Marsilac (Exigido)</TituloSecao>


<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_marsilac_exigido} renderItem={ ({item}) => 

                <CardFilme>

                    {/*
                    <Avaliacao>
                            <Nota>{item.enunciado}</Nota>
                    </Avaliacao>  */}
                    
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>

                    </CardFilme>

                }/>

</Avaliacao2>



<TituloSecao>Marsilac (Realizado)</TituloSecao>


<Avaliacao2> 

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_marsilac_realizado} renderItem={ ({item}) => 

                <CardFilme>
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>


<TituloSecao>Marsilac (Conforme)</TituloSecao>

<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_marsilac_conforme} renderItem={ ({item}) => 

                <CardFilme>
                                         <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>
















<TituloSecao>Oriental (Exigido)</TituloSecao>


<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_oriental_exigido} renderItem={ ({item}) => 

                <CardFilme>

                    {/*
                    <Avaliacao>
                            <Nota>{item.enunciado}</Nota>
                    </Avaliacao>  */}
                    
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>

                    </CardFilme>

                }/>

</Avaliacao2>



<TituloSecao>Oriental (Realizado)</TituloSecao>


<Avaliacao2> 

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_oriental_realizado} renderItem={ ({item}) => 

                <CardFilme>
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>


<TituloSecao>Oriental (Conforme)</TituloSecao>

<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_oriental_conforme} renderItem={ ({item}) => 

                <CardFilme>
                                         <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>













<TituloSecao>Rio Claro (Exigido)</TituloSecao>


<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_rioclaro_exigido} renderItem={ ({item}) => 

                <CardFilme>

                    {/*
                    <Avaliacao>
                            <Nota>{item.enunciado}</Nota>
                    </Avaliacao>  */}
                    
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>

                    </CardFilme>

                }/>

</Avaliacao2>



<TituloSecao>Rio Claro (Realizado)</TituloSecao>


<Avaliacao2> 

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_rioclaro_realizado} renderItem={ ({item}) => 

                <CardFilme>
                     <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>


<TituloSecao>Rio Claro (Conforme)</TituloSecao>

<Avaliacao2>

                <FlatList horizontal showsHorizontalScrollIndicator={true} data={dados_rioclaro_conforme} renderItem={ ({item}) => 

                <CardFilme>
                                         <Avaliacao1>
                     <Nota1>{item.enunciado1}</Nota1>
                     <Nota>{item.mes1}</Nota>
                     <Nota>{item.mes2}</Nota>
                     <Nota>{item.mes3}</Nota>
                     <Nota>{item.mes4}</Nota>
                     <Nota>{item.mes5}</Nota>
                     <Nota>{item.mes6}</Nota>
                     <Nota>{item.mes7}</Nota>
                     <Nota>{item.mes8}</Nota>
                     <Nota>{item.mes9}</Nota>
                     
                     <Nota1>{item.enunciado2}</Nota1>
                     <Nota>{item.mes1_turbidez}</Nota>
                     <Nota>{item.mes2_turbidez}</Nota>
                     <Nota>{item.mes3_turbidez}</Nota>
                     <Nota>{item.mes4_turbidez}</Nota>
                     <Nota>{item.mes5_turbidez}</Nota>
                     <Nota>{item.mes6_turbidez}</Nota>
                     <Nota>{item.mes7_turbidez}</Nota>
                     <Nota>{item.mes8_turbidez}</Nota>
                     <Nota>{item.mes9_turbidez}</Nota>
                     
                     <Nota1>{item.enunciado3}</Nota1>
                     <Nota>{item.mes1_cor}</Nota>
                     <Nota>{item.mes2_cor}</Nota>
                     <Nota>{item.mes3_cor}</Nota>
                     <Nota>{item.mes4_cor}</Nota>
                     <Nota>{item.mes5_cor}</Nota>
                     <Nota>{item.mes6_cor}</Nota>
                     <Nota>{item.mes7_cor}</Nota>
                     <Nota>{item.mes8_cor}</Nota>
                     <Nota>{item.mes9_cor}</Nota>

                     
                     <Nota1>{item.enunciado4}</Nota1>
                     <Nota>{item.mes1_cloro}</Nota>
                     <Nota>{item.mes2_cloro}</Nota>
                     <Nota>{item.mes3_cloro}</Nota>
                     <Nota>{item.mes4_cloro}</Nota>
                     <Nota>{item.mes5_cloro}</Nota>
                     <Nota>{item.mes6_cloro}</Nota>
                     <Nota>{item.mes7_cloro}</Nota>
                     <Nota>{item.mes8_cloro}</Nota>
                     <Nota>{item.mes9_cloro}</Nota>
                     
                     <Nota1>{item.enunciado5}</Nota1>
                     <Nota>{item.mes1_coliforme}</Nota>
                     <Nota>{item.mes2_coliforme}</Nota>
                     <Nota>{item.mes3_coliforme}</Nota>
                     <Nota>{item.mes4_coliforme}</Nota>
                     <Nota>{item.mes5_coliforme}</Nota>
                     <Nota>{item.mes6_coliforme}</Nota>
                     <Nota>{item.mes7_coliforme}</Nota>
                     <Nota>{item.mes8_coliforme}</Nota>
                     <Nota>{item.mes9_coliforme}</Nota>
                     
                     <Nota1>{item.enunciado6}</Nota1>
                     <Nota>{item.mes1_escherichia}</Nota>
                     <Nota>{item.mes2_escherichia}</Nota>
                     <Nota>{item.mes3_escherichia}</Nota>
                     <Nota>{item.mes4_escherichia}</Nota>
                     <Nota>{item.mes5_escherichia}</Nota>
                     <Nota>{item.mes6_escherichia}</Nota>
                     <Nota>{item.mes7_escherichia}</Nota>
                     <Nota>{item.mes8_escherichia}</Nota>
                     <Nota>{item.mes9_escherichia}</Nota>


                     </Avaliacao1>
                    </CardFilme>

                }/>

</Avaliacao2>



            </SecaoFilmes>

        </Container>

        </ScrollView>

    )
}