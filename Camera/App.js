import React from 'react';
import {
  AppRegistry,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNImageToPdf from 'react-native-image-to-pdf';


export default class App extends React.Component {
  state = {
    image1: null,
    image2: null,
  };

  constructor(props) {
    super(props);

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectTapped = this.selectTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
         this.myAsyncPDFFunction(response.uri);

        this.setState({
          image1: source,
        });
      }
    });
  }

  selectTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
         this.myAsyncPDFFunction(response.uri);
        
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image1: source,
        });
      }
    });
  }

  
   myAsyncPDFFunction (file) {
    try {
      RNImageToPdf.createPDFbyImages({ imagePaths: [file], name: 'PDFName'}).then((pdf)=> {
        console.log(pdf);
      })
    } catch(e) {
      console.log(e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[
              styles.avatar,
              styles.imageContainer,
              { marginBottom: 20 },
            ]}
          >
            {this.state.image1 === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.image1} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectTapped.bind(this)}>
          <View style={[styles.avatar, styles.imageContainer]}>
            <Text>Second image</Text>
          </View>
        </TouchableOpacity>

        {this.state.image2 && (
          <Text style={{ margin: 8, textAlign: 'center' }}>
            {this.state.image2}
          </Text>
        )}
      </View>
    );
  }
}
//for styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
