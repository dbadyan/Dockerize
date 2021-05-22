from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/generate/", methods=['POST'])
def generate():
    if request.method == 'POST':
        try:
            arr = ["FROM " + request.json['image']]
            if request.json.get('aptGet'):
                arr.append(request.json['aptGet'])
            if request.json.get('instalNginx'):
                arr.append(request.json['instalNginx'])
            if request.json.get('expose'):
                arr.append(request.json['expose'])
            if request.json.get('start'):
                arr.append(request.json['start'])
            return {'dockerFile': '\r\n'.join(arr)}
        except Exception as e:
            print(e)