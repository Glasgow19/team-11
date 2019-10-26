from flask import Flask, request, abort, Response
from PIL import Image
from uuid import uuid4
import os


app = Flask(__name__)


@app.route('/exhibition/info', methods=['GET', 'POST'])
def exhibition_info():
    if request.method == 'GET':
        # get already existing exhibition
        return
    else:
        # process the image or whatever is sent to it
        return


@app.route('/image', methods=['GET', 'POST'])
def image():
    if request.method == 'GET':
        return
#     save image to local dir. assume jpg as phones capture jpg
    img = request.files['image']
    try:
        # todo: convert to base64
        pil_img = Image.open(img)
        pil_img.save('saved_images/' + str(uuid4()) + '.jpg')
        return Response('save success\n', 200)
    except Exception as e:
        return Response('save fail\n', 500)


# list of objects
# { [
#   name of item: string
#   topLeft, topRight, bottomLeft, bottomRight coordinates where item is located: float/double
# ] imageWidth, imageHeight }
# find out in which section of the image is the item in
@app.route('/describe', methods=['POST'])
def describe():
    req_data = request.get_json()
    img_height = req_data['height']
    img_width = req_data['width']
    half_height = img_height / 2
    half_width = img_width / 2
    top_left = req_data['topLeft']
    top_right = req_data['topRight']
    bottom_left = req_data['bottomLeft']
    bottom_right = req_data['bottomRight']
    # rip these if statements



if __name__ == '__main__':
    if not os.path.isdir('saved_images'):
        os.mkdir('saved_images')
    app.run(debug=True, port=8080)
