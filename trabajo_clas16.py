"""Ejercicio en Python

1) Crear un zoologico que tenga animales de distintas razas (sugiero clases heredadas)
y personas visitante

2) Cada uno de los animales tiene propiedades como hambre, cansancio, y pueden correr, nadar, descansar, etc.

3) Los visitantes son los que les van a dar de comer, cuando tengan hambre

4) Cada 10 segundos, recorrer los animales, para ver si tienen hambre, o cansancio, y darles de comer o ponerlos a descansar(con metodos) 
al correr deberia subir el cansancio y al comer bajar el hambre (energia = 100% y puede ir descendiendo)
para volver a tener energia y dejar de tener hambre
o que realicen alguna accion 

5) Los visitantes son los que les van a dar de comer, pero, cuidado, cada persona tiene x cantidad de comida que va (si estan cansados mandarlos a dormir con un ciclo while)
a ir descendiendo a medida que les den de comer a los animales

6) Cuando los animales reciban la comida, y coman, emitir algun sonido de agradecimiento"""



import time

class Animal:
    def __init__(self, nombre, especie):
        self.nombre = nombre
        self.especie = especie
        self.hambre = 100
        self.cansancio = 0

    def correr(self):
        self.hambre -= 10
        self.cansancio += 1
        print(f"{self.nombre} está corriendo!")

    def nadar(self):
        self.hambre -= 15
        self.cansancio += 1
        print(f"{self.nombre} está nadando!")

    def volar(self):
        self.hambre -= 15
        self.cansancio += 1
        print(f"{self.nombre} está volando!")

    def descansar(self):
        self.cansancio -= 3
        print(f"{self.nombre} está descansando.")

    def comer(self):
        self.hambre -= 20
        print(f"{self.nombre} está comiendo.")

    def agradecer(self):
        print(f"{self.nombre} emite un sonido de agradecimiento.")

    def pedir_comida(self, visitantes):
        print(f"{self.nombre} está pidiendo comida adicional.")
        for visitante in visitantes:
            if visitante.capacidad_comida > 0:
                comida_dada = min(visitante.capacidad_comida, 50)
                self.comer()
                visitante.capacidad_comida -= comida_dada
                print(f"{visitante.nombre} ha dado comida a {self.nombre}.")
                break
        else:
            print("Ningún visitante tiene comida para dar.")

class Visitante:
    def __init__(self, nombre, capacidad_comida):
        self.nombre = nombre
        self.capacidad_comida = capacidad_comida

    def alimentar_animal(self, animal):
        if self.capacidad_comida > 0 and animal.hambre > 0:
            comida_dada = min(self.capacidad_comida, animal.hambre)
            animal.comer()
            self.capacidad_comida -= comida_dada
            animal.agradecer()

def main():
    leon = Animal("Simba", "León")
    delfin = Animal("Flipper", "Delfín")
    aguila = Animal("Dora", "Águila")

    visitante1 = Visitante("Bren", 800)
    visitante2 = Visitante("Nicole", 1000)  # Visitante con menos comida

    animales = [leon, delfin, aguila]
    visitantes = [visitante1, visitante2]
    start_time = time.time()  # Tiempo de inicio

    while True:
        if time.time() - start_time > 60:  # Verificar si ha pasado 1 minuto
            print("¡Hora de cerrar el zoológico!")
            break

        all_visitors_empty = all(visitante.capacidad_comida <= 0 for visitante in visitantes)

        if all_visitors_empty:
            print("Todos los visitantes se han quedado sin comida. Deteniendo el ciclo.")
            break

        for animal in animales:
            if animal.hambre > 70:
                for visitante in visitantes:
                    visitante.alimentar_animal(animal)
                    if animal.hambre <= 0:
                        break
                else:
                    animal.pedir_comida(visitantes)
            if animal.cansancio > 80:
                animal.descansar()
            else:
                if animal.especie == "León":
                    animal.correr()
                elif animal.especie == "Delfín":
                    animal.nadar()
                elif animal.especie == "Águila":
                    animal.volar()
        time.sleep(1)

if __name__ == "__main__":
    main()

