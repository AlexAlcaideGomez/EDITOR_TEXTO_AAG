package Tema7Ejemplo;

import java.util.ArrayList;

public class GestionCoches {
    public static void main(String[] args) {
        Coche coche1 = new Coche("Audi","A4",2018,2093.00);
        Coche coche2 = new Coche("Ford","Focus",2018,2093.00);

        ArrayList<Vehiculo> listaCoches = new ArrayList<>();


        listaCoches.add(coche1);
        listaCoches.add(coche2);

        System.out.println("La informacion de las marcas disponibles son:  ");
        for(Vehiculo vehiculo:listaCoches){
            System.out.println(vehiculo.nombreMarca());
        }



    }
}
