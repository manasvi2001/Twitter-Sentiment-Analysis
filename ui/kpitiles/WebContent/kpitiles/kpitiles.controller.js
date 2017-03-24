sap.ui.controller("kpitiles.kpitiles", {

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf kpitiles.kpitiles
 */
	onInit: function() {
		var data = {
			"posvalue": 0,
			"negvalue": 0
		};
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(data);
		sap.ui.getCore().setModel(oModel);
		this.changeKPITest(0,'');
		this.changeKPITest(1,'');
	},
	
	addPos: function(oEvt) {
		var val = oEvt.getSource().getValue();
		console.log(val);
		this.changeKPITest(1,val);
		oEvt.getSource().setValue('');
	},
	
	addNeg: function(oEvt) {
		var val = oEvt.getSource().getValue();
		console.log(val);
		this.changeKPITest(0,val);
		oEvt.getSource().setValue('');
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf kpitiles.kpitiles
 */
//	onBeforeRendering: function() {
//		
//	},
	
	changeKPITest: function(id,word) {
		var url = "http://hana.skybuffer.com/workshop/sessiona/00/updateDictionary.xsjs?word="+word+"&&id="+id;
		var oModel = sap.ui.getCore().getModel();
		var data = oModel.getData();
		$.ajax({
			url: url,
			async: true,
			dataType: 'json',
			type: 'GET',
			success: function(oData) {
				console.log(oData);
				if (!oData) {
					sap.m.MessageToast.show("Not able to get Data");
				} else {
					if(id===0)
						data["negvalue"] = JSON.parse(JSON.stringify(oData["result"]));
					else
						data["posvalue"] = JSON.parse(JSON.stringify(oData["result"]));
					console.log(data);
					oModel.setData(data);	
					oModel.refresh();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				sap.m.MessageToast.show("Connection not able to establish");
			}
		});
	}

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf kpitiles.kpitiles
 */
// onAfterRendering: function() {
//
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf kpitiles.kpitiles
 */
// onExit: function() {
//
// }

});