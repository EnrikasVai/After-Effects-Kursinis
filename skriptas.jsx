// Enrikas Vaiciulis, MKDf-20/4
//Adobe AE versija 22.6.0 Build(64)
//metodai: Parrent, text layer, draw path

	// uzdaro esama projekta be jokiu klausimu
	app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
	// sukuriam nauja projekta
	app.newProject();

	//kompozicijos nustatymai
	var compW = 1920;
	var compH = 1080;
	var compA = 1;
	var compD= 10;
	var compFPS = 25;
    
    //vidurys kompozicijos
    var w2 = compW/2;
    var h2 = compH/2;
    //mano melyna spalva logotipo ir teksto
	var color = [0, 47, 105] / 255;
 
    
    //prompt duomenys
    var maxSize = null;
    var minSize = null;
  
    // (isNaN(maxSize)) - patikrinama ar ivedamas skaicius
    // (maxSize % 1 !==0)  - tikrina ar ivestas skaicius yra sveikasis
	// duomenu ivedimo patikrinimai
	while ((maxSize == null) || (isNaN(maxSize)) || (maxSize % 1 !==0) || (maxSize < 100) || (maxSize > 110)){
		var maxSize = prompt("Enter max logo scale",110);
		if ((maxSize == null) || (isNaN(maxSize)) || (maxSize % 1 !==0) || (maxSize < 100) || (maxSize > 110)){
			alert("Please enter an INTEGER in range 100...110");
		}
	}
	while ((minSize == null) || (isNaN(minSize)) || (minSize % 1 !==0) || (minSize < 80) || (minSize > 90)){
		var minSize = prompt("Enter min logo scale",80);
		if ((minSize == null) || (isNaN(minSize)) || (minSize % 1 !==0) || (minSize < 80) || (minSize > 90)){
			alert("Please enter an INTEGER in range 80...90");
		}
	}
	// ivestu duomenu priskyrimas reikiamam duomenu tipui
	var maxP = parseInt(maxSize);
	var minP = parseInt(minSize);
    
    // addComp sukuria nauja kompozicija
	var myComp = app.project.items.addComp("myComp",compW,compH,compA,compD,compFPS);
	// atidaro kompocizija aktyviame LA lange
	myComp.openInViewer();
	
	//kuriam LA
	{
	app.beginUndoGroup("createLayers");
         var backgroundL = myComp.layers.addShape();
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
		logoL.source.name = ("Logo");
		myNull.source.name = ("Controller");

		//tevinio elemento nustatymas
		circleL.parent = logoL;
		v1L.parent = logoL;
		v2L.parent = logoL;
		v3L.parent = logoL;
		textL.parent = logoL;
        
        //controller null object uzdedam orange spalva
        myNull.label =11;

	app.endUndoGroup();
	}
    //controller nukelimas i prieki
	myNull.moveToBeginning();
    
//*********************************************************
    //background staciakampio kurimas
    var backgroundLGroup = backgroundL.property("Contents").addProperty("ADBE Vector Group");
    var reactangle = backgroundLGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
    var reactangleSize = reactangle.property("Size").setValue([compW,compH]);
    var reactanglePos = reactangle.property("Position").setValue([0,0]);

    var backgroundLFill = backgroundLGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");

//*********************************************************
    //v3 objekto piesimas
    //kordinates
    var v3Coords = [
            [1236.26403808594-w2,758.157043457031-h2],
            [1448.60205078125-w2,540.250061035156-h2],
            [1370.05297851562-w2,540.302062988281-h2],
            [1205.6650390625-w2,704.691101074219-h2],
            [1038.791015625-w2,542.828063964844-h2],
            [960.250061035156-w2,543.973083496094-h2],
            [1176.34106445312-w2,759.072082519531-h2],
            [1206.23901367188-w2,788.970092773438-h2],
            [1206.30700683594-w2,788.900085449219-h2],
            [1206.376953125-w2,788.970092773438-h2]
    ];
    //objekto kurimas
    var v3LContent = v3L.property("Contents").addProperty("ADBE Vector Group");
    var v3LGroup = v3L.property("Contents").property("Group 1");
    
    var v3LPath = v3LGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
    var v3LMask = v3LPath.property("Path");
    var v3LM = v3LMask.value;
           v3LM.vertices = v3Coords;
           v3LM.closed = true;
           v3LMask.setValue(v3LM);
    var v3LFill = v3LGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    v3LFill.property("Color").setValue(color);
    
    //EXP V3 objekto
    v3L.property("Transform").property("Position").expression ='''
    var startPosition = [0, -250];
    var endPosition = [0, -150];
    var transitionFrames = 6;

    if (timeToFrames(time) < transitionFrames) {
        linear(timeToFrames(time), 0, transitionFrames, startPosition, endPosition);
    } else {
        endPosition;
    }
    ''';
    v3L.property("Transform").property("Opacity").expression = '''
    var startFrame = 0;
    var endFrame = 6;
    var startValue = 0;
    var endValue = 100;

    linear(timeToFrames(time), startFrame, endFrame, startValue, endValue);
    ''';
   
 //*********************************************************
 
    //v2 objekto piesimas
    //kordinates
    var v2Coords = [
            [1236.25500488281-w2,758.1669921875-h2],
            [1448.60192871094-w2,540.25-h2],
            [1370.05297851562-w2,540.303039550781-h2],
            [1205.6650390625-w2,704.691040039062-h2],
            [1038.791015625-w2,542.829040527344-h2],
            [960.250061035156-w2,543.973999023438-h2],
            [1176.34106445312-w2,759.072021484375-h2],
            [1206.23901367188-w2,788.970031738281-h2],
            [1206.30700683594-w2,788.900024414062-h2],
            [1206.376953125-w2,788.970031738281-h2]
    ];
    //objekto kurimas
    var v2LContent = v2L.property("Contents").addProperty("ADBE Vector Group");
    var v2LGroup = v2L.property("Contents").property("Group 1");
    
    var v2LPath = v2LGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
    var v2LMask = v2LPath.property("Path");
    var v2LM = v2LMask.value;
           v2LM.vertices = v2Coords;
           v2LM.closed = true;
           v2LMask.setValue(v2LM);
    var v2LFill = v2LGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    v2LFill.property("Color").setValue(color);
    
    //EXP V2 objekto
    v2L.property("Transform").property("Position").expression ='''
    var startPosition = [0, -110];
    var endPosition = [0, 0];
    var startFrame = 6;
    var endFrame = 12;

    if (timeToFrames(time) < endFrame) {
        linear(timeToFrames(time), startFrame, endFrame, startPosition, endPosition);
    } else {
        endPosition;
    }
    ''';
    v2L.property("Transform").property("Opacity").expression = '''
    var startFrame = 6;
    var endFrame = 12;
    var startValue = 0;
    var endValue = 100;

    linear(timeToFrames(time), startFrame, endFrame, startValue, endValue);
    ''';
   
//*********************************************************

    //v1 objekto piesimas
    //kordinates
    var v1Coords = [
            [1236.26403808594-w2,758.156982421875-h2],
            [1448.60205078125-w2,540.25-h2],
            [1370.05297851562-w2,540.302001953125-h2],
            [1205.6650390625-w2,704.691040039062-h2],
            [1038.791015625-w2,542.828002929688-h2],
            [960.250061035156-w2,543.973022460938-h2],
            [1176.34106445312-w2,759.072021484375-h2],
            [1206.23901367188-w2,788.969970703125-h2],
            [1206.30700683594-w2,788.900024414062-h2],
            [1206.376953125-w2,788.969970703125-h2]
    ];
    //objekto kurimas
    var v1LContent = v1L.property("Contents").addProperty("ADBE Vector Group");
    var v1LGroup = v1L.property("Contents").property("Group 1");
    
    var v1LPath = v1LGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
    var v1LMask = v1LPath.property("Path");
    var v1LM = v1LMask.value;
           v1LM.vertices = v1Coords;
           v1LM.closed = true;
           v1LMask.setValue(v1LM);
    var v1LFill = v1LGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    v1LFill.property("Color").setValue(color);
    
    //V1 EXP
    v1L.property("Transform").property("Position").expression ='''
    var startPosition = [0, 50];
    var endPosition = [0, 150];
    var startFrame = 12;
    var endFrame = 18;

    if (timeToFrames(time) < endFrame) {
        linear(timeToFrames(time), startFrame, endFrame, startPosition, endPosition);
    } else {
        endPosition;
    }
    ''';
    v1L.property("Transform").property("Opacity").expression = '''
    var startFrame = 12;
    var endFrame = 18;
    var startValue = 0;
    var endValue = 100;

    linear(timeToFrames(time), startFrame, endFrame, startValue, endValue);
    ''';
    
//*********************************************************   
    //V objketu anchor
    v3L.anchorPoint.setValue([244.4, 124.6]);
    v2L.anchorPoint.setValue([244.4, 124.6]);
    v1L.anchorPoint.setValue([244.4, 124.6]);
    
//*******************************************************************************************
    
    //apskritimo piesimas
    var circleLGroup = circleL.property("Contents").addProperty("ADBE Vector Group");
    var ellipse = circleLGroup.property("Contents").addProperty("ADBE Vector Shape - Ellipse");
    var ellipseSize = ellipse.property("Size").setValue([727,727]);
    var ellipsePos = ellipse.property("Position").setValue([0,-50]);
    var ellipseStroke = circleLGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
           ellipseStroke.property("Color").setValue(color); 
           ellipseStroke.property("Stroke Width").setValue([16]);
     
     //pasukt 10 laipsiu nes zigzag trikampiai ne toje pacioje pozicijoj kaip kurtame projekte paciame ae
     var ellipseRot = circleL.property("Transform").property("Rotation").setValue([10]);
    
    //zigzag uzdejimas
    var zigZagEffect = circleLGroup.property("Contents").addProperty("ADBE Vector Filter - Zigzag");
           zigZagEffect.property("Size").setValue([10]);
           zigZagEffect.property("Ridges per segment").setValue([10]); 
            
    //wiggle efektas
    var wiggleBehavior = circleL.property("ADBE Effect Parade").addProperty("ADBE CM WiggleScale");
          wiggleBehavior.property("Wiggle Speed (wigs/sec)").setValue([1]);
          wiggleBehavior.property("Wiggle Amount").setValue([5]);
          wiggleBehavior.property("Wiggle Width").setValue([10]);
    //wiggle EXP
    var transformEffect = circleL.property("ADBE Effect Parade").addProperty("ADBE Geometry");
          transformEffect.property("Scale Height").expression = '''
          newScale = wiggle(effect("Wiggle - scale")("Wiggle Speed (wigs/sec)"), effect("Wiggle - scale")("Wiggle Amount"));
          newScale < 0 ? 0 : newScale ;
          ''';
          transformEffect.property("Scale Width").expression = '''
          if (effect("Wiggle - scale")("Wiggle Width Separately?") == true)
                 {newScale = wiggle(effect("Wiggle - scale")("Wiggle Speed (wigs/sec)"), effect("Wiggle - scale")("Wiggle Width"), 1, 0.5, time+30)}
          else
                 {newScale = effect("Transform")("Scale Height")};
            newScale < 0 ? 0 : newScale ;
          ''';
    
    //EXP apskritimo scale
    circleL.property("Transform").property("Scale").expression = 
    '''var startScale = [430, 430]; 
    var endScale = [100, 100]; 
    var animationDuration = 1; 
    linear(time, 0, animationDuration, startScale, endScale);''';
    
           
//****************************************************************************************************

    //Null object
    //Slider logotipo dydis kontroliuoja tevini elemnta
    var sliderControlEffect = myNull.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
           sliderControlEffect.name = "Logo size";
     //iterpimas kintamuju is prompt
     myNull.property("Effects").property("Logo size").property("Slider").expression = '''
        clamp(value,'''+minP+''','''+maxP+''');
     ''';
    //background spalvos kontroleris
    var colorControlEffect = myNull.property("ADBE Effect Parade").addProperty("ADBE Color Control");
           colorControlEffect.name = "Background color";
           colorControlEffect.property("Color").setValue([225/ 255, 225 / 255, 225 / 255]); //default spalva
           
    //Logo tevinis elementas EXP i controleri
    logoL.property("Transform").property("Scale").expression ='''
    var scaleController = thisComp.layer("Controller").effect("Logo size")("Slider");
    var scaleFactor = clamp(scaleController,'''+minP+''', '''+maxP+''') / 100;
    value * scaleFactor;
    ''';
    
    //background i controleri exp
     backgroundLFill.property("Color").expression = '''
           thisComp.layer("Controller").effect("Background color")("Color");
           ''';

//*********************************************************

	//tekstas
	var textProperty = textL.property("Source Text");
   		textProperty.setValue("Statybos Profesonalai");
	//teksto nustatymai
	 var textDocument = textProperty.value;
            textDocument.fillColor = color;
            textDocument.justification  =  ParagraphJustification.CENTER_JUSTIFY; 
            textDocument.fontSize = 72;
            textDocument.font = "Aileron-Black";
	//pritaikymas tekstui
    textProperty.setValue(textDocument); 
	//pozicija
	textL.position.setValue([0, 443]);
    textL.anchorPoint.setValue([0, 0]);
    
    // Drop Shadow efektas
    var dropShadowEffect = textL.property("Effects").addProperty("ADBE Drop Shadow");
           dropShadowEffect.property("Opacity").setValue(127.5); //50%
           dropShadowEffect.property("Distance").setValue(6);
           dropShadowEffect.property("Softness").setValue(0); 
           dropShadowEffect.property("Direction").setValue(180); 
           
    //Teksto EXP
    textL.property("Transform").property("Opacity").expression = '''
    var animationStart = 1;
    var animationEnd = 2;
    var startValue = 0;
    var endValue = 100;

    linear(time, animationStart, animationEnd, startValue, endValue);
     ''';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    