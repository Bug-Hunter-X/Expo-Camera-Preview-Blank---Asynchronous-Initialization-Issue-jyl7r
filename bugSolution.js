import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraStatus, setCameraStatus] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraStatus !== 'READY') return;
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const cameraRef = React.useRef(null);

  const handleCameraStatusChange = (status) => {
    setCameraStatus(status);
  };

  if (hasPermission === null) {
    return <View> <Text>Requesting permission...</Text> </View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} onCameraReady={handleCameraStatusChange}>
          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <Button title="Take Picture" onPress={takePicture} />
          <Button title="Flip Camera" onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}/>
          </View>
      </Camera>
    </View>
  );
};

export default CameraComponent;