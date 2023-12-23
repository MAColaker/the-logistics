import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  ToastProvider,
  ToastViewport,
  Toast,
  useToastState,
} from '@tamagui/toast';
import {Theme, YStack} from 'tamagui';

const ToastComponent = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Theme name={currentToast.themeName}>
      <Toast
        key={currentToast.id}
        duration={currentToast.duration}
        enterStyle={{opacity: 0, scale: 0.5, y: -25}}
        exitStyle={{opacity: 0, scale: 1, y: -20}}
        y={0}
        opacity={1}
        scale={1}
        animation="100ms"
        viewportName={currentToast.viewportName}>
        <YStack>
          <Toast.Title>{currentToast.title}</Toast.Title>
          {!!currentToast.message && (
            <Toast.Description>{currentToast.message}</Toast.Description>
          )}
        </YStack>
      </Toast>
    </Theme>
  );
};

export default props => {
  const {left, top, right} = useSafeAreaInsets();
  return (
    <ToastProvider>
      {props.children}
      <ToastComponent />
      <ToastViewport top={top} left={left} right={right} />
    </ToastProvider>
  );
};
