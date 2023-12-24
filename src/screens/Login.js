import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {YStack, H1, Text, Button, Input, Theme} from 'tamagui';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login success!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <YStack fullscreen backgroundColor={'#176B87'} flex={1}>
      <YStack flex={0.35}>
        <LottieView
          style={{flex: 1, width: Dimensions.get('window').width}}
          source={require('../assets/HowItWorksAnimation.json')}
          autoPlay
        />
      </YStack>
      <YStack
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        backgroundColor={'#EEEEEE'}
        flex={0.65}
        padding={20}
        space>
        <YStack alignItems="center">
          <H1>Giriş</H1>
        </YStack>
        <YStack>
          <Text>Email</Text>
          <Input keyboardType='email-address' onChangeText={setEmail} />
        </YStack>
        <YStack>
          <Text>Şifre</Text>
          <Input secureTextEntry onChangeText={setPassword} />
        </YStack>
        <YStack alignItems="center" space>
          <Theme name={'dark_blue'}>
            <Button theme={'active'} onPress={signIn}>
              Giriş Yap
            </Button>
          </Theme>
          <Text>
            Hesabınız yok mu?{' '}
            <Text
              color={'darkblue'}
              textDecorationLine="underline"
              onPress={() => navigation.navigate('Register')}>
              Kayıt Ol
            </Text>
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};
