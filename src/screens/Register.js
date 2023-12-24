import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {YStack, H1, Text, Button, Input, Theme} from 'tamagui';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default Login = () => {
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        auth().currentUser.updateProfile({displayName});
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
          source={require('../assets/TransferAnimation.json')}
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
          <H1>Kayıt</H1>
        </YStack>
        <YStack>
          <Text>İsim</Text>
          <Input onChangeText={setDisplayName} />
        </YStack>
        <YStack>
          <Text>Email</Text>
          <Input keyboardType="email-address" onChangeText={setEmail} />
        </YStack>
        <YStack>
          <Text>Şifre</Text>
          <Input secureTextEntry onChangeText={setPassword} />
        </YStack>
        <YStack alignItems="center" space>
          <Theme name={'dark_blue'}>
            <Button theme="active" onPress={signUp}>
              Kayıt Ol
            </Button>
          </Theme>
          <Text>
            Hesabınız yok mu?{' '}
            <Text
              color={'darkblue'}
              textDecorationLine="underline"
              onPress={() => navigation.navigate('Login')}>
              Giriş Yap
            </Text>
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};
