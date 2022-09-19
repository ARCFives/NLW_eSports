import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { THEME } from '../../theme'
import { CheckCircle } from 'phosphor-react-native'
import { Header } from '../Header'
import * as Clipboard from 'expo-clipboard'
import { useState } from 'react'

interface Props extends ModalProps {
  discord: string
  onClosed: () => void
}

export function DuoMatch({ discord, onClosed, ...rest }: Props) {
  const [isCopie,setIsCopie] = useState(false)
 
  async function handleDiscordCopy() {
    setIsCopie(true)
    await Clipboard.setStringAsync(discord)
    Alert.alert('Discord copiado', 'Para você colar, encontre seu duo!')
    setIsCopie(false)
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent
    animationType='fade'>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClosed}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Header
            title="Let’s play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity style={styles.discordbtn} onPress={handleDiscordCopy} disabled={isCopie}>
            <Text style={styles.discord}>{isCopie ? <ActivityIndicator/> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
