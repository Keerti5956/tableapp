sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
 
    return Controller.extend("app.tableapp.controller.View1", {
 
        onInit: function () {
            var oDate = new Date();
            var sDate = oDate.toISOString().split('T')[0];  // YYYY-MM-DD format
            var oModel = new JSONModel({
                currentDate: sDate
            });
            this.getView().setModel(oModel);
        },
 
        onGoPress: function () {
            var oDateInput = this.byId("date");
            var sDate = oDateInput.getValue();
            var oToday = new Date();
            var sToday = oToday.toISOString().split('T')[0];
 
            // Check if the selected date is today's date
            if (sDate !== sToday) {
                sap.m.MessageToast.show("Please select today's date.");
                oDateInput.setValue(sToday);
            } else {
                // Get selected technology key from Select control
                var selectedTech = this.byId("tech").getSelectedKey();
                console.log("Selected Technology: " + selectedTech);
                console.log("Date selected: " + sDate);
 
                // Navigate using the router, passing the selected key (technology) and date
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail", {
                    idButton: selectedTech,
                    dateSelected: sDate  // Pass selected date
                });
            }
        }
    });
});