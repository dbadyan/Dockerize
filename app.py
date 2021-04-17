from flask import Flask, render_template, request
import docker

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/get_images/", methods=['POST'])
def get_images():
    source = request.form.get('source')
    client = docker.from_env()
    image_list = client.images.search(source)

    def search(images_original):
        return [element for element in images_original if element["is_official"] is True]

    # result = next((item for item in image_list if item["is_official"] is True), None)
    result = search(image_list)
    images = ""
    for image in result:
        images += " OR " + image['name']
    if result is not None:
        get_images_message = images
        print(get_images_message)
    else:
        get_images_message = "no source image"

    return render_template('index.html', getImages="choose from the following images: " + get_images_message)


@app.route("/generate/", methods=['POST'])
def generate():
    chosen_image = request.form.get('chosen')
    return render_template('index.html', generatedMessage="FROM " + chosen_image)
