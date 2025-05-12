def aloita_peli_oma():
    person_id = 1
    order_no = 1
    yritykset = 0
    max_yritykset = 3

    while yritykset < max_yritykset:
        asiakas_nimi = hae_asiakkaan_nimi(person_id)
        oikea_vastaus = hae_oikea_vastaus(person_id)
        kysymys = hae_kysymys(person_id, order_no)
        if person_id > 10 and rahapussi.raha < 100:
            print("Olet oikea asiakaspalvelun ammattilainen! Nyt voit lähteä ansaitsemillasi rahoilla kesälomalle.")
            break
        elif person_id > 11:
            print("tässä hassu bonuslopetus") #tähän joku kiva hassu juttu
            break
        print(f"\n{asiakas_nimi}:\n{kysymys}")
        vastaus = input("Kirjoita matkakohde:\n ").strip()
        if vastaus.lower() == oikea_vastaus.lower():
            if yritykset == 0:
                rahapussi.lisaa_rahaa(15)
                print("\nSaat 10€ tippiä nopeasta vastauksesta!")
                print(f"Hyvää työtä! Ansaitsit 5€.")
                print(f"\nRahapussissasi on nyt {rahapussi.hae_saldo()}€.")
                person_id +=1
                order_no=1
                yritykset=0
            else:
                rahapussi.lisaa_rahaa(5)
                print(f"\nHyvää työtä! Palkkasi on 5€.")
                print(f"Rahapussissasi on nyt {rahapussi.hae_saldo()}€.")
                person_id +=1
                order_no=1
                yritykset=0


        else:
            yritykset += 1
            order_no += 1

    viimeinen_vastaus = hae_kysymys(person_id, 4)
    if yritykset == 3:
        print(f"\n{asiakas_nimi}: {viimeinen_vastaus}")
        print("\nAsiakaspalvelusi oli ala-arvoista ja sait potkut. Voit yrittää uudelleen!")



if __name__ == "__main__":
    aloita_peli_oma()