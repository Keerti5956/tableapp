sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
 
    return Controller.extend("app.tableapp.controller.detailView", {
 
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onRouteMatched, this);
        },
 
        _onRouteMatched: function (oEvent) {
            var oArguments = oEvent.getParameters().arguments;
            var selectedTech = oArguments.idButton;  // Technology passed from View1
            var selectedDate = oArguments.dateSelected;  // Date passed from View1
 
            // Log the values to ensure they are passed correctly
            console.log("Selected Technology: " + selectedTech);
            console.log("Selected Date: " + selectedDate);
 
            // Create a model with the passed values
            var oModel = new JSONModel({
                technology: selectedTech,
                date: selectedDate,
                employees: [
                    { name: " ", capgeminiId: " ", designation: " ", projectName: " ", extraField1: "", extraField2: "" },
                    { name: " ", capgeminiId: " ", designation: " ", projectName: " ", extraField1: "", extraField2: "" },
                    { name: " ", capgeminiId: " ", designation: " ", projectName: " ", extraField1: "", extraField2: "" },
                    { name: " ", capgeminiId: " ", designation: " ", projectName: " ", extraField1: "", extraField2: "" },
                    { name: " ", capgeminiId: " ", designation: " ", projectName: " ", extraField1: "", extraField2: "" },
                ]
            });
 
            // Set the model to the view
            this.getView().setModel(oModel);
        },
 
        onAddRow: function () {
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/employees");
 
            // Add a new empty row at the top of the table
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
    
                    // Remove the selected row from the model
                    aEmployees.splice(iIndex, 1);
                    oModel.setProperty("/employees", aEmployees);
                } else {
                    sap.m.MessageToast.show("Please select a row to delete.");
                }
            },    
 
        onOpenPopup: function (oEvent) {
            var oButton = oEvent.getSource();
            var oRow = oButton.getParent();
            var oBindingContext = oRow.getBindingContext();
 
            // Set the context of the row in the popup model
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
            var sQuery = oEvent.getParameter("newValue");
            var oTable = this.getView().byId("empTable");
            var oBinding = oTable.getBinding("items");
 
            var oFilter = new Filter("name", FilterOperator.Contains, sQuery);
            oBinding.filter(sQuery ? [oFilter] : []);
        }
    });
});