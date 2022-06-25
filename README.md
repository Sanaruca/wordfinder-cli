# Wordfinder

Wordfinder es una herramienta capaz de encontrar palabras que siguen un formato o una cantidad de caracteres dada con una serie de letras proporcionadas por el usuario. Esta herramienta fue desarrollada con la intención de ayudar a completar niveles en juegos como "word of wonders" donde con una serie de letras debes rellenar los espacios en blanco de un crucigrama.

> Nota: esta herramienta utiliza el diccionario de la Real Academia Española (RAE) y necesita de una conexión a internet para filtrar los resultados.
 

## Instalación

### Requerimientos

- NodeJs
- npm
- Conexión a internet (recomendado)

Clone el repositorio, posiciónese en el directorio clonado y ejecute `npm run install-globally`:

```
$ git clone https://github.com/sanaruca/wordfinder-cli.git
$ cd wordfinder-cli
$ npm run install-globally
```

## Uso

Una vez instalada la herramienta utilice el comando `wfind` o `wfind --help` para obtener ayuda.

Wordfinder necesita 2 argumentos, el primer argumento es el "string" de caracteres o letras a utilizar, el segundo argumento es el "avance" (letras que se han cruzado debido a otra palabra en el crucigrama, dicho de otro modo, la posición de las letras) de la palabra con el formato `_%s_` dónde `%s` es una de las letras proporcionadas en el primer argumento y `_` es una letra desconocida, si se desconoce de un avance simplemente coloque la longitud de la palabra a encontrar.

### Ejemplo:

```
$ wfind ociucnamnioc __m_n__a__on
```

En el caso de que no posea una conexión a internet, Wordfinder puede mostrar los resultados generados tras la recolocación de los caracteres dados en el primer argumento. Para esto utilicé la bandera `--offline`, tenga en cuenta que por obvias razones los resultados no estarán verificados.

```
$ wfind ociucnamnioc __m___ca__on --offline
```

## Licencia

Este proyecto está autorizado bajo la Licencia MIT.