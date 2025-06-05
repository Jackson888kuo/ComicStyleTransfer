import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StyleSelectionScreenRouteProp = RouteProp<RootStackParamList, 'StyleSelection'>;
type StyleSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StyleSelection'>;

const STYLES = [
  { id: 'japanese', name: '日系漫畫', thumbnail: require('../../assets/styles/japanese.png') },
  { id: 'american', name: '美式漫畫', thumbnail: require('../../assets/styles/american.png') },
  { id: 'watercolor', name: '水彩風格', thumbnail: require('../../assets/styles/watercolor.png') },
  { id: 'sketch', name: '手繪草稿', thumbnail: require('../../assets/styles/sketch.png') },
  { id: 'chinese', name: '中國風', thumbnail: require('../../assets/styles/chinese.png') },
  { id: 'anime', name: '動漫風格', thumbnail: require('../../assets/styles/anime.png') },
];

export default function StyleSelectionScreen() {
  const route = useRoute<StyleSelectionScreenRouteProp>();
  const navigation = useNavigation<StyleSelectionScreenNavigationProp>();
  const { imageUri } = route.params;

  const handleStyleSelect = (styleId: string) => {
    // 這裡會是之後處理風格轉換的地方
    navigation.navigate('Result', { 
      imageUri: imageUri, 
      style: styleId 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
      </View>
      
      <Text style={styles.title}>選擇漫畫風格</Text>
      <Text style={styles.subtitle}>點擊下方風格預覽套用效果</Text>
      
      <ScrollView contentContainerStyle={styles.stylesContainer}>
        {STYLES.map((style) => (
          <TouchableOpacity 
            key={style.id}
            style={styles.styleCard}
            onPress={() => handleStyleSelect(style.id)}
          >
            <Image 
              source={style.thumbnail} 
              style={styles.styleThumbnail}
              resizeMode="cover"
            />
            <Text style={styles.styleName}>{style.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  previewContainer: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  stylesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  styleCard: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  styleThumbnail: {
    width: '100%',
    height: 120,
  },
  styleName: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});
