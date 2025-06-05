import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import StyleSelectionScreen from './src/screens/StyleSelectionScreen';
import ResultScreen from './src/screens/ResultScreen';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Gallery: undefined;
  StyleSelection: { imageUri: string };
  Result: { imageUri: string; style: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#fff' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} />
          <Stack.Screen 
            name="StyleSelection" 
            component={StyleSelectionScreen} 
            options={{
              headerShown: true,
              title: '選擇風格',
              headerBackTitle: '返回',
            }}
          />
          <Stack.Screen 
            name="Result" 
            component={ResultScreen} 
            options={{
              headerShown: true,
              title: '轉換結果',
              headerBackTitle: '返回',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
