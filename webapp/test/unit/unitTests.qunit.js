/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"app/tableapp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
