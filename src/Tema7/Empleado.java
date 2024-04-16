package Tema7;

public class Empleado extends Trabajador {
    private int antiguedad;

    public Empleado(String nombre, String apellidos, double sueldoMensual, String departamento, int edad, int antiguedad) {
        super(nombre, apellidos, sueldoMensual, departamento, edad);
        this.antiguedad = antiguedad;
    }

    @Override
    public double calcularSueldoMensual() {
        return getSueldoMensual() + (100 * antiguedad);
    }
}

