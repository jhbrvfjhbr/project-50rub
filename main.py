from flask import send_from_directory
from flask import Flask

app = Flask(__name__)

@app.route('/<path:path>')
def servStatic(path):
    return send_from_directory('./static/', path)

if __name__ == '__main__':
    app.run(debug=True)