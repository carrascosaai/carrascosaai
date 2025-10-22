 
from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

search_history = []

@app.route("/")
def home():
    return render_template("index.html", history=search_history)

@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    query = data.get("query")

    # Guardar búsqueda
    timestamp = datetime.now().strftime("%d/%m/%Y %H:%M")
    search_history.insert(0, {"query": query, "time": timestamp})

    # Simulación (cuando conectes API Skyscanner/Kiwi aquí van los resultados reales)
    response = f"✈️ Resultados simulados para '{query}'. (Pronto conectaremos con Skyscanner y Kiwi)"
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
