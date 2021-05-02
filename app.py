from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/generate/", methods=['POST'])
def generate():
    req = request.form['chosen']
    return render_template('index.html', generatedMessage="FROM " + req)
