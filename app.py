import docker, requests
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    url = "https://hub.docker.com/api/content/v1/products/search?page_size=25&q=hylang&type=image&image_filter=official"
    page = requests.get(url)
    image_json = page.json()['summaries']
    # print(image_json)
    print("#################################")

    def search(images_original):
        return [element for element in images_original]

    result = search(image_json)
    images = ""
    for image in result:
        images += " OR " + image['name']
    if result is not None:
        get_images_message = images
        print(get_images_message)
    else:
        print("no source image")
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


@app.route("/scrape_for_images/", methods=['POST'])
def scrape_for_images():
    url = "https://hub.docker.com/search?q=ubuntu&type=image"
    page = requests.get(url)
    print(page.content)


@app.route("/generate/", methods=['POST'])
def generate():
    # chosen_image = request.form['chosen']
    req = request.form['chosen']

    return render_template('index.html', generatedMessage="FROM " + req)
