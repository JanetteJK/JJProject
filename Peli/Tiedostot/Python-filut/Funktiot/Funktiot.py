import mysql.connector
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="niittykuja4MAR",
        database="flight_game",
        collation='latin1_swedish_ci',
        autocommit=True
    )
@app.route('/kysymys/<person_id>/<order_no>')
def hae_kysymys(person_id, order_no):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = f"SELECT question FROM question WHERE person_id = '{person_id}' AND Order_No = '{order_no}'"
    cursor.execute(query)
    kysymys = cursor.fetchone()
    conn.close()

    ans = {
        "kysymys":kysymys
    }
    json_ans = json.dumps(ans)
    response = Response(response=json_ans, status=200, mimetype="application/json")
    response.headers["Content-Type"] = "charset=utf-8"
    return ans

@app.route('/oikea_vastaus/<person_id>')
def hae_oikea_vastaus(person_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = f"SELECT answer FROM answer WHERE person_id = '{person_id}' AND correct = 1"
    cursor.execute(query)
    oikea_vastaus = cursor.fetchone()
    conn.close()

    ans = {
        "oikea":oikea_vastaus
    }
    print(ans)
    json_ans = json.dumps(ans)
    response = Response(response=json_ans, status=200, mimetype="application/json")
    response.headers["Content-Type"] = "charset=utf-8"
    return ans


@app.route('/hae_nimi/<person_id>')
def hae_asiakkaan_nimi(person_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = f"SELECT nimi FROM person WHERE id = '{person_id}'"
    cursor.execute(query, person_id)
    nimi = cursor.fetchone()
    conn.close()

    ans = {
        "nimi":nimi
    }
    print(ans)
    json_ans = json.dumps(ans)
    response = Response(response=json_ans, status=200, mimetype="application/json")
    response.headers["Content-Type"] = "charset=utf-8"
    return ans

class Rahapussi:
    def __init__(self):
        self.raha = 0  # Alussa rahaa 0e

    def lisaa_rahaa(self, maara):
        self.raha += maara
        return self.raha #lisää täs rahat olemassa olevaa saldoo (0e)

    def hae_saldo(self):
        return self.raha #palauttaa nykysen saldon kun taso päättyy eli näyttää rahanmäärän


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=3000)
