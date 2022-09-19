import React, {useEffect, useState} from 'react';
import { Image, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Header } from '../../components/Header';
import { styles } from './styles';
import {useNavigation} from '@react-navigation/native'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  function handleOpenGame({title, id, bannerURL}: GameCardProps) {
    navigation.navigate('game', {title, id, bannerURL})
  }

  useEffect(() => {
    fetch('http://192.168.0.108:8880/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.logo}/>
      <Header title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />
      <FlatList data={games} 
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard data={item} onPress={() => handleOpenGame(item)}/>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal 
        contentContainerStyle={styles.contentlist}/>
    </SafeAreaView>
    </Background>
  );
}