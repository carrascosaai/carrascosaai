from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    origin = request.form.get('origin')
    destination = request.form.get('destination')
    date = request.form.get('date')

    fake_flights = [
        {"airline": "Ryanair", "price": f"{random.randint(25, 120)} €", "time": "07:00 - 09:00"},
        {"airline": "Vueling", "price": f"{random.randint(40, 150)} €", "time": "09:30 - 11:45"},
        {"airline": "EasyJet", "price": f"{random.randint(30, 130)} €", "time": "12:15 - 14:25"},
        {"airline": "Iberia", "price": f"{random.randint(60, 200)} €", "time": "15:00 - 17:15"}
    ]

    return jsonify(fake_flights)

if __name__ == '__main__':
    app.run(debug=True)


