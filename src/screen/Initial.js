import React from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {XStack, YStack, H1, H6, Text, Button} from 'tamagui';

import {useNavigation} from '@react-navigation/native';

export default Initial = () => {
  const navigation = useNavigation();

  return (
    <YStack fullscreen backgroundColor={'#176B87'} space>
      <YStack alignItems="center" justifyContent="center" flex={0.3} space>
        <H1 color={'white'}>HOŞ GELDİNİZ</H1>
        <H6 color={'white'}>
          İşlerinizi daha hızlı bir şekilde almak ister misiz?
        </H6>
      </YStack>
      <XStack flex={0.4}>
        <LottieView
          style={{width: Dimensions.get('window').width}}
          source={require('../assets/TruckAnimation.json')}
          autoPlay
        />
      </XStack>
      <YStack flex={0.3} alignSelf="center" space>
        <Button onPress={() => navigation.navigate('Register')}>
          Kayıt Ol
        </Button>
        <Text color={'white'}>
          Hesabınız var mı?{' '}
          <Text
            color={'lightblue'}
            textDecorationLine="underline"
            onPress={() => navigation.navigate('Login')}>
            Giriş Yap
          </Text>
        </Text>
      </YStack>
    </YStack>
  );
};
