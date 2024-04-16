package Tema7;

public abstract class Trabajador {
    private String nombre;
    private String apellidos;
    private double sueldoMensual;
    private String departamento;
    private int edad;

    public Trabajador(String nombre, String apellidos, double sueldoMensual, String departamento, int edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.sueldoMensual = sueldoMensual;
        this.departamento = departamento;
        this.edad = edad;
    }

    public  double getSueldoMensual(){
        return sueldoMensual;
    }

    public abstract double calcularSueldoMensual();

}
