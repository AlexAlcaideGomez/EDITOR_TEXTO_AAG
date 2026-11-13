#!/usr/bin/env bash
# Compila la app de escritorio (Java Swing) y genera el .jar descargable de la web.
# Uso: bash web/scripts/build-jar.sh   (requiere JDK 11 o superior)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT
javac --release 11 -encoding UTF-8 -d "$OUT/classes" "$ROOT/src/Tema6/EDITOR_TEXTO_AAG/Interfaz.java"
printf 'Main-Class: Tema6.EDITOR_TEXTO_AAG.Interfaz\n' > "$OUT/manifest.txt"
jar --create --file "$ROOT/web/public/descargas/editor-aag.jar" --manifest "$OUT/manifest.txt" -C "$OUT/classes" .
echo "OK -> web/public/descargas/editor-aag.jar ($(wc -c < "$ROOT/web/public/descargas/editor-aag.jar") bytes)"
