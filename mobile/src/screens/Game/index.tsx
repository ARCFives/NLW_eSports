import {SafeAreaView} from 'react-native-safe-area-context'
import {Background} from '../../components/Background'
import {useRoute, useNavigation} from '@react-navigation/native'
import {View, TouchableOpacity, Image, FlatList, Text} from 'react-native'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation'
import {Entypo} from '@expo/vector-icons'
import { THEME } from '../../theme';
import imgLogo from '../../assets/logo-nlw-esports.png'
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const routes = useRoute()
  const game = routes.params as GameParams
  const navigation = useNavigation()
  const [duo, setDuo] = useState<DuoCardProps[]>([])
  const [selectDiscord, setSelectDiscord] = useState('')

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUSer(adsID: string) {
    fetch(`http://192.168.0.108:8880/ads/${adsID}/discord`)
      .then(res => res.json())
      .then(data => setSelectDiscord(data.discord))
  }
  
  useEffect(() => {
    fetch(`http://192.168.0.108:8880/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setDuo(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
          <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>
        <Image source={imgLogo} style={styles.logo}/>
        <View style={styles.right}/>
        </View>
        <Image source={{uri: game.bannerURL}} style={styles.cover} resizeMode='cover'/>
        
        <Header title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList data={duo}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DuoCard data={item} onConnect={() => getDiscordUSer(item.id)}/>
        )} horizontal 
        contentContainerStyle={styles.contentList} 
        showsHorizontalScrollIndicator={false}
        style={styles.containerList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}> Não a anúncios para este game.</Text>
        )}
        />
        <DuoMatch visible={selectDiscord.length > 0} discord={selectDiscord} onClosed={() => setSelectDiscord('')}  />
      </SafeAreaView>
    </Background>
  );
}