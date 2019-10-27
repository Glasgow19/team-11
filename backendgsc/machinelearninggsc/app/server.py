from flask import Flask, request, abort, Response, jsonify
from PIL import Image
from math import hypot
from uuid import uuid4
import os
import requests
from datetime import datetime
from detect import run, predict
from flask import jsonify
from io import BytesIO
import base64

app = Flask(__name__)


# standard distance between 2 points on a straight line
def get_distance(x0, y0, x1, y1):
    return hypot(x1 - x0, y1 - y0)


def in_center(tl, tr, bl, br, h, w):
    # center is defined as coords being relatively close to center point of the overall image
    # height and width will get passed in as half_height and half_width so need to multiple them to get overall
    top_left_dist = get_distance(tl[0], tl[1], w, h)
    top_right_dist = get_distance(tr[0], tr[1], w, h)
    bottom_left_dist = get_distance(bl[0], bl[1], w, h)
    bottom_right_dist = get_distance(br[0], br[1], w, h)
    # todo: this
    return False


# A simple function to use requests.post to make the API call. Note the json= section.
def run_query(query):
    headers = {"Authorization": "Bearer YOUR API KEY"}
    req = requests.post('https://gammaql.gsc.org.uk/',
                        json={'query': query}, headers=headers)
    if req.status_code == 200:
        return req.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(
            req.status_code, query))


@app.route('/', methods=['GET'])
def index():
    return "Of course hello world!"


@app.route('/try', methods=['GET'])
def try_something():
    print("HI")
    # predict("./data/meme.jpg")
    return Response('save fail\n', 500)


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
    data = request.get_json()
    img = data['image']
    img = base64.b64decode(img)
    wh, detections = predict(img, is_file=True)
    print(describe(wh[0], wh[1], detections))
    return Response('save success\n', 200)


# @app.route('/data', methods=['GET'])
def get_planeteriums_events():
    query = """
    {
        gammaEvents{
            ResName
            Category
            SubCategory
            SourceResViews
            ResDate
            StartTime
            EndTime
            Available
            TotalBooked
            Capacity
            Description
            Area
            RunningTime
            Age
            ShowType
            FilmCertification
            Price
            InformationPage
            GammaResponseType
            ResID
            ProductMapID
            lastSync
          }
        }
    """

    result = run_query(query)  # Execute the query
    li = result["data"]["gammaEvents"]
    today = datetime.date(datetime.now())
    location = "Planetarium"
    list_of_events = list()
    for event in li:
        if event["ResDate"] == str(today) and event["Category"] == "Public" and event["Area"] == location:
            list_of_events.append(event["ResName"])

    return "There are following events at Planetarium today: "+", ".join(list_of_events)+"."


# list of objects
# { [
#   name of item: string
#   topLeft, topRight, bottomLeft, bottomRight coordinates where item is located: [x, y]
# ] imageWidth, imageHeight }
# find out in which section of the image is the item in
def describe(img_width, img_height, data):
    response = ""
    half_height = img_height / 2
    half_width = img_width / 2
    for item in data:
        name = item['className']
        if name == "person":
            name = "Planetarium"
        resp = {}
        # [x, y]
        top_left, top_right = item['topLeft']
        bottom_left, bottom_right = item['bottomRight']
        return_string = 'There is {} in your {}.'

        if top_left < half_width and bottom_left < half_width:
            response += return_string.format(name, "left side")
        elif top_right > half_width and bottom_right > half_width:
            response += return_string.format(name, "right side")
        else:
            response + return_string.format(name, "center")

        if name == "Planetarium":
            description = get_planeteriums_events()
            response += " "+description
    return response


if __name__ == '__main__':
    run()
    if not os.path.isdir('saved_images'):
        os.mkdir('saved_images')
    app.run(host="0.0.0.0", port=80)
