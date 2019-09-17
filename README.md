*Mathilda Edström, Webbutveckling HT18* / **Webbutveckling III**

# Uppgift 2
## NodeJs och automatisering med Gulp

### Sätt igång
1. I terminalen (kommando): git clone https://github.com/meethilda/uppgift2.git
2. I terminalen (kommando): npm install
3. I terminalen (kommando): gulp
4. Öppna projektet i en texteditor och sätt igång! :)

#### Syfte
Automatiseringsprocessens syfte är att förenkla för utvecklaren under projektets utveckling samt att minimera storleken och effektivisera projektet i sin helhet.

#### Paket
Jag har valt att använda följande paket;
* Gulp-concat
    * Detta för att konkatinera JS-filer och därmed sammanslå dessa till en fil.
* Gulp-uglify
    * För att minimera den sammanslagna JS-filen till minsta möjliga storlek, genom att ta bort radbrytningar, mellanrum etc.
* Gulp-concat-css
    * Denna kokatinerar CSS-filer och sammanslår dessa till en enda fil.
* Gulp-clean-css
    * För att, som för ovanstående, minimera storleken men för CSS-filen.
* Browser-Sync
    * För att kunna liveuppdatera webbläsarfönstret utan att manuellt behöva klicka på uppdatera. Detta underlättar arbetet, speciellt vid arbete med fler skärmar.

#### System
Jag har skapat ett enkelt men funktionellt system som kan användas till projekt innehållandes HTML, CSS, JavaScript och bilder.

De 'tasks' som finns är följande;
1. Copy HTML
    * Denna hämtar filer med filändelsen .html och för dessa vidare till katalogen 'Pub'.
2. Copy CSS
    * Denna hämtar filer med ändelsen .css men även att den konkatinerar filerna, minifierar de samt har denna en extra pipe för att liveuppdatera förändringarna som sker, med BrowserSync.
3. Copy JS
    * Denna konkatinerar filerna med filändelse .js, minifierar de och kopierar de till katalogen 'Pub'.
4. Copy Images
    * Denna hämtar objekt som är av filändelserna .jpg, .jpeg, .png, .gif och .svg, sedan kopierar över dessa till katalogen 'Pub'.
5. Watcher
    * En watcher som kollar efter förändringar i ovanstående funktioner, som sedan liveuppdaterar webbläsaren med hjälp av BrowserSync.
