sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Device, MessageToast) {
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
        },

        onAfterRendering: function () {
            if (Device.system.phone) {
                this.getView().byId("idButton").setWidth("100%");
            } else {
                this.getView().byId("idButton").setWidth(); // Optional: you can set a default width if needed
            }
        }
    });
});
