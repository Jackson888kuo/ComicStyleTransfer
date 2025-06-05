import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Share, ActivityIndicator, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
  const route = useRoute<ResultScreenRouteProp>();
  const { imageUri, style } = route.params;
  const [processedImageUri, setProcessedImageUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 模擬圖片處理過程
  useEffect(() => {
    const processImage = async () => {
      try {
        // 這裡會是實際的風格轉換 API 調用
        // 現在我們只是模擬一個延遲
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 在實際應用中，這裡會是轉換後的圖片 URL
        // 現在我們使用原圖作為佔位
        setProcessedImageUri(imageUri);
      } catch (err) {
        console.error('處理圖片時出錯:', err);
        setError('處理圖片時發生錯誤，請重試');
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [imageUri, style]);

  const handleSaveToGallery = async () => {
    if (!processedImageUri) return;
    
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('需要相簿權限', '請允許應用程式存取您的相簿以儲存圖片');
        return;
      }
      
      const asset = await MediaLibrary.createAssetAsync(processedImageUri);
      await MediaLibrary.createAlbumAsync('ComicStyle', asset, false);
      Alert.alert('成功', '圖片已儲存到相簿');
    } catch (err) {
      console.error('儲存圖片時出錯:', err);
      Alert.alert('錯誤', '儲存圖片時發生錯誤');
    }
  };

  const handleShare = async () => {
    if (!processedImageUri) return;
    
    try {
      await Share.share({
        url: processedImageUri,
        message: '看看我的漫畫風格照片！',
      });
    } catch (err) {
      console.error('分享時出錯:', err);
    }
  };

  if (isProcessing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>正在處理圖片...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {processedImageUri && (
          <Image 
            source={{ uri: processedImageUri }} 
            style={styles.image} 
            resizeMode="contain"
          />
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#34c759' }]}
          onPress={handleSaveToGallery}
        >
          <Text style={styles.actionButtonText}>儲存到相簿</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#007AFF' }]}
          onPress={handleShare}
        >
          <Text style={styles.actionButtonText}>分享</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#ff9500' }]}
          onPress={() => {}}
        >
          <Text style={styles.actionButtonText}>嘗試其他風格</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
