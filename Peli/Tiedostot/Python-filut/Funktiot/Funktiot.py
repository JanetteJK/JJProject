import mysql.connector

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

def hae_kysymys(person_id, order_no):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT question FROM question WHERE person_id = %s AND Order_No = %s"
    cursor.execute(query, (person_id, order_no))
    kysymys = cursor.fetchone()
    conn.close()
    return kysymys[0] if kysymys else None


def hae_oikea_vastaus(person_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT answer FROM answer WHERE person_id = %s AND correct = 1"
    cursor.execute(query, (person_id,))
    oikea_vastaus = cursor.fetchone()
    conn.close()
    return oikea_vastaus[0] if oikea_vastaus else None


def hae_asiakkaan_nimi(person_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT nimi FROM person WHERE id = %s"
    cursor.execute(query, (person_id,))
    nimi = cursor.fetchone()
    conn.close()
    return nimi[0] if nimi else None

class Rahapussi:
    def __init__(self):
        self.raha = 0  # Alussa rahaa 0e

    def lisaa_rahaa(self, maara):
        self.raha += maara
        return self.raha #lisää täs rahat olemassa olevaa saldoo (0e)

    def hae_saldo(self):
        return self.raha #palauttaa nykysen saldon kun taso päättyy eli näyttää rahanmäärän
