/*
Ascensor js
Ejercicios de programación orientada a objetos y arrays en javascript
*/

/*
Ascensor 1.0
Se ha estropeado el asconsor de nuestra comunidad de vecinos y tenemos que arreglarlo. 
Tenemos acceso a la maquina de control del ascensor y está programada para leer lo que mostramos en pantalla.
Cada piso tiene un botón para llamar al ascensor y el ascensor tiene un botón para cada piso.
En esta primera versión, las llamadas que se hagan mientras el ascensor está en movimiento se ignorarán.
Ejercicio 1: Crea una clase Ascensor que tenga un atributo que indique el piso en el que se encuentra y otro que indique si está en movimiento o no.
Ejercicio 2: Añade un método que permita subir el ascensor a un piso indicado. Recuerda que el ascensor debe pasar por todos los pisos intermedios.
Ejercicio 3: Añade un método que permita bajar el ascensor a un piso indicado. Recuerda que el ascensor debe pasar por todos los pisos intermedios.
Ejercicio 4: Añade un método que permita llamar al ascensor desde un piso indicado. El ascensor debe subir o bajar según sea necesario.
Ejercicio 5: Crea una función que detecte cuando el ascensor ha llegado a su destino.
Cada cambio de piso tarda 1 segundo.
*/

class Ascensor {
    constructor(piso=0) {
        this.piso = piso;
        this.moviendose = false;
    }
    
    subir(piso) {
        let self = this;
        this.moviendose = true;
        for (let i = this.piso; i <= piso; i++) {
        setTimeout(() => {
            self.piso = i;
            console.log(self.piso);
            if (i == piso) {
                self.llegada();
            }
        }, 1000 * (i - this.piso));
        }
    }
    
    bajar(piso) {
        let self = this;
        this.moviendose = true;
        for (let i = this.piso; i >= piso; i--) {
        setTimeout(() => {
            self.piso = i;
            console.log(self.piso);
            if (i == piso) {
                self.llegada();
            }
        }, 1000 * (this.piso - i));
        }
    }

    llamar(piso) {
        if (this.moviendose) {
            return;
        }
        if (piso > this.piso) {
            this.subir(piso);
        } else {
            this.bajar(piso);
        }
    }

    llegada() {
        this.moviendose = false;
    }
}

/* const ascensor = new Ascensor(7);
ascensor.llamar(5);
ascensor.llamar(2);
 */
/*
Ascensor premium
En esta versión, las llamadas que se hagan mientras el ascensor está en movimiento se guardarán en una cola de llamadas.
Ejercicio 6: Crea una clase AscensorPremium que herede de la clase Ascensor.
Ejercicio 7: Añade un atributo que guarde las llamadas que se hagan mientras el ascensor está en movimiento.
Ejercicio 8: Añade un método que procese las llamadas que se hayan guardado en la cola.
Ejercicio 9: Modifica el método que permite llamar al ascensor para que guarde las llamadas que se hagan mientras el ascensor está en movimiento.
Ejercicio 10: Modifica el método que detecta cuando el ascensor ha llegado a su destino para que procese las llamadas que se hayan guardado en la cola.
Cada cambio de piso tarda 1 segundo.
*/

class AscensorPremium extends Ascensor {
    constructor(piso=0) {
        super(piso);
        this.llamadas = [];
    }

    procesarLlamadas() {
        if (this.llamadas.length > 0) {
            this.llamar(this.llamadas.shift());
        }
    }

    llamar(piso) {
        if (this.moviendose) {
            this.llamadas.push(piso);
            return;
        }
        super.llamar(piso);
        this.procesarLlamadas();
    }

    llegada() {
        this.moviendose = false;
        console.log("LLegada al piso "+this.piso+".");
        this.procesarLlamadas();
    }
}

const ascensorPremium = new AscensorPremium(7);
ascensorPremium.llamar(4);
ascensorPremium.llamar(2);
ascensorPremium.llamar(3);
ascensorPremium.llamar(1);

