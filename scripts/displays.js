Lucille.prototype.display = function(){

	var voicing   = this.calcVoicing();
	var layout    = this.calcLayout();
	var frets     = layout.frets;
	var frettings = this.lucille.frettings;

	_.each(voicing, function(voice, i){

		var fretting 	= frettings[i];
		var pos 		= _.indexOf(frets.range, voice.fret);
		var loc 		= -1 === pos ? 0 : pos;

		// fretting dot
		var dot 		= fretting.select('.dot');
		var dotClass 	= -1 === pos ? 'dot hide' : 'dot';
		var dotY 		= frets.y[loc] - (frets.spacing/2);

		dot.attr({ class:dotClass });
		dot.animate({ cy:dotY }, 700, mina.backout);

		// fretting line
		var line 		= fretting.select('.string');
		var lineClass 	= null === voice.fret ? 'string hide' : 'string';
		var lineY 		= 0 === voice.fret ? layout.strings.y1[i] : frets.y[loc] - (frets.spacing/2);

		line.attr({ class:lineClass });
		line.animate({ y1:lineY }, 700, mina.backout);

		// fretting tab
		var tab 		= fretting.select('.tab');
		var tabFret     = null === voice.fret ? 'X' : voice.fret;

		tab.node.textContent = tabFret;

		// fretting tab
		var note 		= fretting.select('.note');
		var noteNote    = null === voice.note ? 'X' : voice.note;

		note.node.textContent = noteNote;

	});

};

Lucille.prototype.displayNext = function(){

	var curr  = this.tab.caged[0];
	var total = this.tab.caged[1];
	var next  = curr + 1 > total ? 0 : curr + 1;

	this.tab.caged[0] = next;

	this.display();

};

Lucille.prototype.displayPrev = function(){

	var curr  = this.tab.caged[0];
	var total = this.tab.caged[1];
	var prev  = curr - 1 < 0 ? total : curr - 1;

	this.tab.caged[0] = prev;

	this.display();

};

Lucille.prototype.displayOrientation = function(mode) {

	this.orientation = mode;
	this.renderFretboardRefresh();
	this.display();

};

Lucille.prototype.displaySettings = function(){

	// Picker Settings
	var orientationField        = {};
	orientationField.name       = 'orientation';
	orientationField.values     = ['RIGHTY','LEFTY'];
	orientationField.selected   = _.indexOf(['RIGHTY','LEFTY'], this.orientation);

	var pickSettingsFieldset    = {};
	pickSettingsFieldset.name   = 'Orientation';
	pickSettingsFieldset.fields = [orientationField];

	var picker                  = {};
	picker.title                = 'Settings';
	picker.colors               = { background:'#e2e2e2' };
	picker.fieldsets            = [pickSettingsFieldset];

	var that                    = this;
	var callback                = function(settings){ that.updateSettings(settings); };
	var settingsPickl           = this.lucille.g();
	var pickl                   = new Pickl({ svg:settingsPickl, callback:callback, config:picker });

};

Lucille.prototype.displayChordPicker = function(){

	// Picker Settings
	var rootField        	      = {};
	rootField.name                = 'root';
	rootField.values              = ['C','D','E','F','G','A','B'];
	rootField.selected            = 0;

	var accField                  = {};
	accField.name                 = 'accidental';
	accField.values               = ['','#','b'];
	accField.selected             = 0;

	var thirdField                = {};
	thirdField.name               = 'thirdQuality';
	thirdField.values             = ['Major','Minor','Augmented','Diminished','Sus2','Sus4'],
	thirdField.selected           = 0;

	var seventhField              = {};
	seventhField.name             = 'seventhQuality';
	seventhField.values           = ['M7','m7','dim7','half-dim7', 'm6'],
	seventhField.selected         = 0;

	var alterationField           = {};
	alterationField.name          = 'alternation';
	alterationField.values        = ['b5','#5','b9','#9'];
	alterationField.selected      = 0;

	var extensionField            = {};
	extensionField.name           = 'extension';
	extensionField.values         = ['9', '11', '#11', 'b13', '13'],
	extensionField.selected       = 0;

	var pickRootFieldset          = {};
	pickRootFieldset.name         = 'Root';
	pickRootFieldset.fields       = [rootField, accField];

	var pickTypeFieldSet          = {};
	pickTypeFieldSet.name         = 'Type';
	pickTypeFieldSet.fields       = [thirdField, seventhField];

	var pickAlterationFieldset    = {};
	pickAlterationFieldset.name   = 'Alteration';
	pickAlterationFieldset.fields = [alterationField];

	var pickExtensionFieldset     = {};
	pickExtensionFieldset.name    = 'Extension';
	pickExtensionFieldset.fields  = [extensionField];

	var picker                    = {};
	picker.title                  = 'Chord';
	picker.colors                 = { background:'#e2e2e2' };
	picker.fieldsets              = [pickRootFieldset, pickTypeFieldSet, pickAlterationFieldset, pickExtensionFieldset];

	var that                      = this;
	var callback                  = function(settings){ that.updateChord(settings); };
	var settingsPickl             = this.lucille.g();
	var pickl                     = new Pickl({ svg:settingsPickl, callback:callback, config:picker });

};

