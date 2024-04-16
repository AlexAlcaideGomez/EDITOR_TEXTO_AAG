package Tema7Ejemplo;

public class Coche implements Vehiculo{
    private String marca;
    private String modelo;
    private int anyo;
    private double precio;

    public Coche(String marca, String modelo, int anyo, double precio) {
    this.marca=marca;
    this.modelo=modelo;
    this.anyo=anyo;
    this.precio=precio;
    }

    @Override
    public String nombreMarca(){
        return marca;
    }

   @Override
    public String  obtenerModel(){
        return modelo;
    }
}

