from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/generate/", methods=['POST'])
def generate():
    if request.method == 'POST':
        try:
            print(" json:   " + request.json['image'])
        except Exception as e:
            print(e)
        response = {
            'dockerFile': request.json['image']
        }
        return response
