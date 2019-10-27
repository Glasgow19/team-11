import keras
import numpy as np
from IPython.display import Image
from keras.applications import mobilenet, imagenet_utils
from keras.preprocessing import image

def prepare_image(file):
    img_path = ''
    img = image.load_img(img_path + file, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return keras.applications.mobilenet.preprocess_input(img_array_expanded_dims)

if __name__ == '__main__':

    mobilenet_model = mobilenet.MobileNet(weights='imagenet')
    preprocessed_image = prepare_image('toilet_sign.jpg')
    predictions = mobilenet_model.predict(preprocessed_image)
    results = imagenet_utils.decode_predictions(predictions)
    print(results)