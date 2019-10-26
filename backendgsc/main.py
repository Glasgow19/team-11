from flask import Flask, request


app = Flask(__name__)


@app.route('/exhibition/info', methods=['GET', 'POST'])
def exhibition_info():
    if request.method == 'GET':
        # get already existing exhibition
        return
    else:
        # process the image or whatever is sent to it
        return


if __name__ == '__main__':
    app.run(debug=True, port=8080)
