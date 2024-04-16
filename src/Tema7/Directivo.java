package Tema7;

public class Directivo extends Trabajador {
    private double bonusPorObjetivos;

    public Directivo(String nombre, String apellidos, double sueldoMensual, String departamento, int edad, double bonusPorObjetivos) {
        super(nombre, apellidos, sueldoMensual, departamento, edad);
        this.bonusPorObjetivos = bonusPorObjetivos;
    }
    @Override
    public double calcularSueldoMensual() {
        return getSueldoMensual() + bonusPorObjetivos;
    }
}
