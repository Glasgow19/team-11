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
        pil_img = Image.open(img)
        pil_img.save('saved_images/' + str(uuid4()) + '.jpg')
        return Response('save success\n', 200)
    except Exception as e:
        return Response('save fail\n', 500)


if __name__ == '__main__':
    if not os.path.isdir('saved_images'):
        os.mkdir('saved_images')
    app.run(debug=True, port=8080)
