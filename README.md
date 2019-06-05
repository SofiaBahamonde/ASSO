## Theme: Case-Study - SimpleDraw

## Installing and Running

First run `npm install`
then run `npm run broswer`
You should open in a browser the index.html file that contains the simpledraw commands executed.

## Develepor Documentation

When you run from npm the main is `script.ts` this script will draw a circle and two rectangles.
To start developing first start editing this script.


## Approach

#### Simple Draw

SimpleDraw is a very simple  graphical editor to draw basic geometric objects, manipulate and persist them. In order to implement this graphical editor we should look at some considerations:

* Use HTML-related technologies (SVG and Canvas)
* All client-side (running in the browser)
* Typescript instead of pure javascript 
* Zero-dependencies for the engine (i.e. d3)
* Libraries for non-engine stuff only (i.e. sass, bootstrap)
 
#### Implementation Details

During our classes we have already some functionalities implemented, such as:

* SimpleDraw is based on the notion of documents;
* Documents are rendered either in SVG or HTMLCanvas;
* Multiple views of the same model;
* Two interaction modes: point-n-click and REPLs.
* Support persistence in multiple formats (TXT, XML, BIN);
* Extendible with different objects (triangles, arrows…);
* Extendible with new tools (rotate, translate, grid…);
* Support (un)limited Undo / Redo of all operations;


So, for **our project** we intend to do the following ones:

* Add Identifiers to the shapes;
* Extract the logic of the Undo/Redo to a generic UndoManager
* Support groups and selections based on: (a) programmatic references, or (b) a bounding box
* Document layers ('n' layers, where the visibility of 'n+1' is always 'on top' of 'n')
* Viewports transformation (for example, by specifying the bounding box of a Render)
* Play around with new shapes, tools, styles and other stuff

## Group Members
* Daniel Machado
* Gonçalo Moreno
* Sofia Alves
