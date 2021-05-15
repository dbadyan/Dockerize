from flask import Flask, render_template, request

app = Flask(__name__)
global response


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/generate/", methods=['POST'])
def generate():
    if request.method == 'POST':
        try:
            global response
            response = {
                'dockerFile': "FROM " + request.json['image'] + '</br>'
                              + request.json['aptGet'] + '</br>'
                              + request.json['instalNginx'] + '</br>'
                              + request.json['expose'] + '</br>'
                              + request.json['start']
                # 'aptGet': request.json['aptGet'],
                # 'instalNginx': request.json['instalNginx'],
                # 'expose': request.json['expose'],
                # 'start': request.json['start']
            }
            return response
        except Exception as e:
            print(e)


@app.route("/save/", methods=['POST'])
def save():
    if request.method == 'POST':
        try:
            print("hooray: " + response['dockerFile'])
            return response
        except Exception as e:
            print(e)
