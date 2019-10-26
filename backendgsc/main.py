from flask import Flask, request, abort, Response, jsonify
from PIL import Image
from math import hypot
from uuid import uuid4
import os
import requests
from datetime import datetime

app = Flask(__name__)


# standard distance between 2 points on a straight line
def get_distance(x0, y0, x1, y1):
    return hypot(x1 - x0, y1 - y0)


def in_center(tl, tr, bl, br, h, w):
    # center is defined as coords being relatively close to each corner point of the overall image
    top_left_dist = get_distance(tl[0], tl[1], 0, 0)
    top_right_dist = get_distance(tr[0], tr[1], w, 0)
    bottom_left_dist = get_distance(bl[0], bl[1], 0, w)
    bottom_right_dist = get_distance()
    return False

def run_query(query): # A simple function to use requests.post to make the API call. Note the json= section.
    request = requests.post('https://gammaql.gsc.org.uk/', json={'query': query}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))



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

@app.route('/data', method=['GET'])
def data():
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

    result = run_query(query) # Execute the query
    list = result["data"]["gammaEvents"]
    today = datetime.date(datetime.now())
    location = "Planetarium"
    listOfEvents = []
    for event in list:
        if (event["ResDate"] == str(today) and event["Category"] == "Public" and event["Area"] == location):
            #print(event["ResName"])
            listOfEvents.append(event["ResName"])
    return listOfEvents



# list of objects
# { [
#   name of item: string
#   topLeft, topRight, bottomLeft, bottomRight coordinates where item is located: [x, y]
# ] imageWidth, imageHeight }
# find out in which section of the image is the item in
@app.route('/describe', methods=['POST'])
def describe():
    req_data = request.get_json()
    name = req_data['name']
    img_height = req_data['height']
    img_width = req_data['width']
    half_height = img_height / 2
    half_width = img_width / 2
    # [x, y]
    top_left = req_data['topLeft']
    top_right = req_data['topRight']
    bottom_left = req_data['bottomLeft']
    bottom_right = req_data['bottomRight']
    return_string = "There is {} in your {}."

    # check to see if in center
    if in_center(top_left, top_right, bottom_left, bottom_right):
        return jsonify({'response': return_string.format(name, 'center')})

    # rip these if statements. very rudimentary way to find out in which quadrant the object is in
    if bottom_right[0] < half_width and bottom_right[1] < half_height:
        # completely top left as furthest down coordinate is before 0,0 in coordinate plane
        return jsonify({'response': return_string.format(name, 'top left')})
    elif bottom_left[0] >= half_width and bottom_left[1] <= half_height:
        # completely top right as furthest down coordinate is after 0,0
        return jsonify({'response': return_string.format(name, 'top right')})
    elif top_left[0] >= half_width and top_left[1] >= half_height:
        # completely bottom right
        return jsonify({'response': return_string.format(name, 'bottom right')})
    elif top_right[0] < half_width and top_right[1] >= half_height:
        return jsonify({'response': return_string.format(name, 'bottom left')})
    # now to check for intersecting quadrants


if __name__ == '__main__':
    if not os.path.isdir('saved_images'):
        os.mkdir('saved_images')
    app.run(debug=True, port=8080)
