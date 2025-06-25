sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/Device"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast, Device) {
    "use strict";

    return Controller.extend("app.tableapp.controller.detailView", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var oArguments = oEvent.getParameters().arguments;
            var selectedTech = oArguments.idButton;
            var selectedDate = oArguments.dateSelected;

            var oModel = new JSONModel({
                technology: selectedTech,
                date: selectedDate,
                employees: [
                    { name: "", capgeminiId: "", designation: "", projectName: "", extraField1: "", extraField2: "" },
                    { name: "", capgeminiId: "", designation: "", projectName: "", extraField1: "", extraField2: "" },
                    { name: "", capgeminiId: "", designation: "", projectName: "", extraField1: "", extraField2: "" },
                    { name: "", capgeminiId: "", designation: "", projectName: "", extraField1: "", extraField2: "" },
                    { name: "", capgeminiId: "", designation: "", projectName: "", extraField1: "", extraField2: "" }
                ]
            });

            this.getView().setModel(oModel);
        },

        view2ToView1: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1"); // Replace "RouteView1" with your actual route name for View1
        },        

        onAddRow: function () {
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/employees");
            aEmployees.unshift({ name: "", capgeminiId: "", designation: "", projectName: "", extraField1: "", extraField2: "" });
            oModel.setProperty("/employees", aEmployees);
        },

        onDeleteRow: function () {
            var oTable = this.getView().byId("empTable");
            var oSelectedItem = oTable.getSelectedItem();

            if (oSelectedItem) {
                var oModel = this.getView().getModel();
                var aEmployees = oModel.getProperty("/employees");
                var sPath = oSelectedItem.getBindingContext().getPath();
                var iIndex = parseInt(sPath.split("/").pop(), 10);

                aEmployees.splice(iIndex, 1);
                oModel.setProperty("/employees", aEmployees);
                oTable.removeSelections();
            } else {
                MessageToast.show("Please select a row to delete.");
            }
        },

        onOpenPopup: function (oEvent) {
            var oButton = oEvent.getSource();
            var oRow = oButton.getParent();
            var oBindingContext = oRow.getBindingContext();

            var oModel = this.getView().getModel();
            var oData = oBindingContext.getObject();
            var oPopupModel = new JSONModel(oData);
            this.getView().setModel(oPopupModel, "popupModel");

            this.getView().byId("popupDialog").open();
        },

        onClosePopup: function () {
            this.getView().byId("popupDialog").close();
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.getView().byId("empTable");
            var oBinding = oTable.getBinding("items");

            var oFilter = new Filter("name", FilterOperator.Contains, sQuery);
            oBinding.filter(sQuery ? [oFilter] : []);
        }
    });
});
