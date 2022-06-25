# Wordfinder

Wordfinder es una herramienta capas de encontrar palabras que siguen un formato o una cantidad de caracteres dada con una serie de letras proporcionadas por el usuario. Esta herramientas fue desarrollada con la intención de ayudar a completar niveles en juegos como "word of wonders" donde con una serie de letras debes rellenar los espacios en blanco de un crucigrama.

> Nota: este herramienta utiliza el diccionario de la Real Academia Española (RAE) y necesita de una conexión a  internet para filtrar los resultados.
 

## Instalación

### Requerimientos

- NodeJs
- npm
- Conexión a internet (recomendado)

Simplemente ejecute el siguiente comando en la consola:

```
$ npm install -g wordfinder
```

## Uso

Una vez instalada la herramienta ulilize el comando `wfind` o `wfind --help` para optener ayuda.

Wordfinder necesita 2 argumentos, el primer argumento es el string de caracteres o letras a utilizar, el segundo argumento es el "avance" (letras que se han cruzado debido a otra palabra en el crucigrama, dicho de otro modo, la posición de las letras) de la palabra con el formato `_%s_` dónde `%s` es una de las letras proporcionadas en el primer argumento y `_` es una letra desconocida, si se desconoce de un avance simplemente coloque la longitud de la palabra a encontrar.

### Ejemplo:

```
$ wfind comunicacion __m___ca__on
```

En el caso de que no posea una conexión a internet, Wordfinder puede mostrar los resultados generados tras la recolocación de los caracteres dados en el primer argumento. Para esto utilicé la bandera `--offline`,  tenga en cuenta que por obvias razones los resultados no estaran verificados.

```
$ wfind comunicacion __m___ca__on --offline
```

## Licencia

Este proyecto está autorizado bajo la Licencia MIT.