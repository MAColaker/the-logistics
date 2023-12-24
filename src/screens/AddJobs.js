import React, {useState, useEffect} from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {useToastController} from '@tamagui/toast';
import {
  YStack,
  H1,
  Text,
  Button,
  TextArea,
  Input,
  Theme,
  Spinner,
  Form,
} from 'tamagui';

import Toast from '../components/Toast';

const AddJobs = () => {
  const [adres, setAdres] = useState();
  const [fiyat, setFiyat] = useState();
  const [konteynerNo, setKonteynerNo] = useState();
  const [liman, setLiman] = useState();

  const [formStatus, setFormStatus] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnOpacity, setBtnOpacity] = useState(1);
  const [btnIcon, setBtnIcon] = useState(null);

  const toastController = useToastController();
  const {left, top, right} = useSafeAreaInsets();

  useEffect(() => {
    setBtnDisable(formStatus ? true : false);
    setBtnOpacity(formStatus ? 0.5 : 1);
    setBtnIcon(formStatus ? <Spinner color={'black'} /> : null);
  }, [formStatus]);

  const saveJobs = () => {
    firestore()
      .collection('ilanlar')
      .add({
        user: auth().currentUser.uid,
        adres: adres,
        konteynerNo: Number(konteynerNo),
        liman: liman,
        fiyat: Number(fiyat),
        nakliyeci: '',
        tarih: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toastController.show('Kayıt Başarılı!', {
          message: 'İş ilanı yayınlandı.',
          themeName: 'green',
        });
        setFormStatus(false);
      })
      .catch(error => {
        toastController.show('HATA', {
          message: error,
          themeName: 'red',
        });
        setFormStatus(false);
      });
  };

  return (
    <YStack top={top} left={left} right={right} padding={15} space>
      <H1>İş Ekle</H1>
      <Form
        onSubmit={() => {
          setFormStatus(true);
        }}>
        <YStack space>
          <YStack>
            <Text>Adres</Text>
            <TextArea onChangeText={setAdres} />
          </YStack>
          <YStack>
            <Text>Konteyner No</Text>
            <Input keyboardType="numeric" onChangeText={setKonteynerNo} />
          </YStack>
          <YStack>
            <Text>Liman</Text>
            <Input onChangeText={setLiman} />
          </YStack>
          <YStack>
            <Text>Fiyat</Text>
            <Input keyboardType="numeric" onChangeText={setFiyat} />
          </YStack>
          <Form.Trigger asChild disabled={formStatus}>
            <Button
              disabled={btnDisable}
              icon={btnIcon}
              opacity={btnOpacity}
              backgroundColor={'$blue10'}
              onPress={saveJobs}>
              Kaydet
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </YStack>
  );
};

export default () => {
  return (
    <Toast>
      <AddJobs />
    </Toast>
  );
};
