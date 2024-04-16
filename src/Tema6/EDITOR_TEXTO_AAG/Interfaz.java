package Tema6.EDITOR_TEXTO_AAG;

import javax.swing.*;
import javax.swing.text.*;
import java.awt.*;
import java.awt.event.*;

public class Interfaz extends JFrame {
    private JTextPane panelTexto;

    public Interfaz() {
        setTitle("Editor de Texto");
        setSize(600, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        panelTexto = new JTextPane();

        // Barra de herramientas
        JToolBar barraHerramientas = new JToolBar();
        barraHerramientas.setFloatable(false);

        // Estilos de texto
        JButton negritaButton = new JButton(new StyledEditorKit.BoldAction());
        negritaButton.setText("Negrita");
        negritaButton.setToolTipText("Negrita");

        JButton cursivaButton = new JButton(new StyledEditorKit.ItalicAction());
        cursivaButton.setText("Cursiva");
        cursivaButton.setToolTipText("Cursiva");

        JButton subrayadoButton = new JButton(new StyledEditorKit.UnderlineAction());
        subrayadoButton.setText("Subrayado");
        subrayadoButton.setToolTipText("Subrayado");

        // Tipo de letra
        JComboBox<String> tipoLetraCombo = new JComboBox<>();
        tipoLetraCombo.addItem("Arial");
        tipoLetraCombo.addItem("Calibri");
        tipoLetraCombo.addItem("Times New Roman");
        tipoLetraCombo.addItem("Verdana");
        tipoLetraCombo.addActionListener(new FontTypeListener());

        // Tamaño de letra
        JComboBox<Integer> tamañoCombo = new JComboBox<>();
        for (int tamaño : new int[]{10, 11, 12, 15, 16, 20, 40}) {
            tamañoCombo.addItem(tamaño);
        }
        tamañoCombo.addActionListener(new FontSizeListener());

        // Color de texto
        JButton colorButton = new JButton("Color");
        colorButton.addActionListener(new FontColorListener());

        // Añadir componentes a la barra de herramientas
        barraHerramientas.add(negritaButton);
        barraHerramientas.add(cursivaButton);
        barraHerramientas.add(subrayadoButton);
        barraHerramientas.addSeparator();
        barraHerramientas.add(new JLabel("Tipo de letra:"));
        barraHerramientas.add(tipoLetraCombo);
        barraHerramientas.add(new JLabel("Tamaño:"));
        barraHerramientas.add(tamañoCombo);
        barraHerramientas.addSeparator();
        barraHerramientas.add(colorButton);

        getContentPane().setLayout(new BorderLayout());
        getContentPane().add(barraHerramientas, BorderLayout.NORTH);
        getContentPane().add(new JScrollPane(panelTexto), BorderLayout.CENTER);
    }

    // Listener para cambiar el tipo de letra
    private class FontTypeListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            JComboBox<String> comboBox = (JComboBox<String>) e.getSource();
            String fontName = (String) comboBox.getSelectedItem();
            Style style = panelTexto.addStyle("FontType", null);
            StyleConstants.setFontFamily(style, fontName);
            panelTexto.setCharacterAttributes(style, false);
        }
    }

    // Listener para cambiar el tamaño de letra
    private class FontSizeListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            JComboBox<Integer> comboBox = (JComboBox<Integer>) e.getSource();
            int fontSize = (int) comboBox.getSelectedItem();
            Style style = panelTexto.addStyle("FontSize", null);
            StyleConstants.setFontSize(style, fontSize);
            panelTexto.setCharacterAttributes(style, false);
        }
    }

    // Listener para cambiar el color de texto
    private class FontColorListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            Color color = JColorChooser.showDialog(panelTexto, "Seleccionar Color", Color.BLACK);
            if (color != null) {
                Style style = panelTexto.addStyle("FontColor", null);
                StyleConstants.setForeground(style, color);
                panelTexto.setCharacterAttributes(style, false);
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            Interfaz editor = new Interfaz();
            editor.setVisible(true);
        });
    }
}
