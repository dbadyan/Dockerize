from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/generate/", methods=['POST'])
def generate():
    source = request.form.get('source')
    generate_message = "FROM " + source
    return render_template('index.html', generate=generate_message)
