# Native Parser
## Parser fordítása make használatával
  - Alapértelmezett: `$ make` <br />
  - AFL fuzzing használatához: `$ make fuzzing`
  - A generált fájlok törlése  `$ make clean-all`
## Az alkalamzás futtatása
Fordítás után a Parser_test mappában található meg a futtatható fájl <br />
  - `$ cd Parser_test` <br />
  - `$ ./caffparser`vagy `$ ./fuzzing_caffparser`
### Argumentumok
  - Argumentumok nélkül futtatva a Parser_test mappában is megtalálható 1.caff fájlt használja bemenetként  
  - Megadhatunk egy argumentumot ekkor a beírt elérési úton található fájlt fogja beolvasni
  - A második argumentumnak truthy értéket adva használható a program AFL fuzzer-el 


