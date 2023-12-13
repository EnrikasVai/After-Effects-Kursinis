// Enrikas Vaiciulis, MKDf-20/4

	// uzdaro esama projekta be jokiu klausimu
	app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
	// sukuriam nauja projekta
	app.newProject();


	//kompozicijos nustatymai
	var compW = parseInt(1920);
	var compH = parseInt(1080);
	var compA = 1;
	var compD= parseFloat(30);
	var compFPS = 25;

	// metodas addComp sukuria nauja kompozicija su ivestais duomenimis
	var myComp = app.project.items.addComp("myComp",compW,compH,compA,compD,compFPS);
	// atidaro kompocizija aktyviame LA lange
	myComp.openInViewer();

	//kuriam LA
	{
	app.beginUndoGroup("createLayers");
		var backgroundL = myComp.layers.addSolid([225,225,225]/255,"",compW,compH,compA,compD);
		var textL = myComp.layers.addText();
		var circleL = myComp.layers.addShape();
		var v1L = myComp.layers.addShape();
		var v2L = myComp.layers.addShape();
		var v3L = myComp.layers.addShape();
		var logoL = myComp.layers.addNull();
		var myNull = myComp.layers.addNull();

		//LA vardai
		backgroundL.name = ("Background");
		textL.name = ("Text");
		circleL.name = ("Circle");
		v1L.name = ("V Shape 1");
		v2L.name = ("V Shape 2");
		v3L.name = ("V Shape 3");
		logoL.name = ("Logo");
		myNull.name = ("Controller");

		//tevinio elemento nustatymas
		circleL.parent = logoL;
		v1L.parent = logoL;
		v2L.parent = logoL;
		v3L.parent = logoL;
		textL.parent = logoL;


	app.endUndoGroup();
	}
	var color = [30, 84, 118] / 255;

//*********************************************************

	//tekstas
	var textProperty = textL.property("Source Text");
   		textProperty.setValue("Statybos Profesonalai");
	//teksto nustatymai
	 var textDocument = textProperty.value;
    textDocument.fillColor = color;
	textDocument.textAlign = ParagraphJustification.CENTER; 
	textDocument.fontSize = 72;
	textDocument.font = "Aileron-Black";
	//pritaikymas tekstui
    textProperty.setValue(textDocument); 
	//pozicija
	textL.position.setValue([0, 443]);

	myNull.moveToBeginning();

//*********************************************************

