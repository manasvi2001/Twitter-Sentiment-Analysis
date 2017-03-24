sap.ui.jsview("kpitiles.kpitiles", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf kpitiles.kpitiles
	*/ 
	getControllerName : function() {
		return "kpitiles.kpitiles";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf kpitiles.kpitiles
	*/ 
	createContent : function(oController) {
		var oPosContent = new sap.suite.ui.commons.NumericContent({
            animateTextChange: false,
//            value: "{line>/sensorDataTile/MinHumidity}"
            value: '{/posvalue}'
        });
		
        var oPosT = new sap.suite.ui.commons.GenericTile({
            header: "Positive Sentiment",
            tileContent: [
                new sap.suite.ui.commons.TileContent({
                    footer: "+ve",
                    content: [
                    	oPosContent
                    ]
                })
            ]
        });
        
        var oPos = new sap.m.CustomTile({
            content: [
                oPosT
            ]
        });
        
        var oNegContent = new sap.suite.ui.commons.NumericContent({
            animateTextChange: false,
//            value: "{line>/sensorDataTile/MinHumidity}"
            value: '{/negvalue}'
        });
		
        var oNegT = new sap.suite.ui.commons.GenericTile({
            header: "Negative Sentiment",
            tileContent: [
                new sap.suite.ui.commons.TileContent({
                    footer: "-ve",
                    content: [
                    	oNegContent
                    ]
                })
            ]
        });
        
        var oNeg = new sap.m.CustomTile({
            content: [
                oNegT
            ]
        });
        var oTileContainer = new sap.m.TileContainer({
        	height: "45%",
            tiles: [
            	oPos,
            	oNeg
            ]

        });
        var oInpPos = new sap.m.Input({
        	placeholder: "Enter a keyword for positive sentiment and press enter",
        	width: "50%",
        	submit: [oController.addPos, oController]
        });
        var oInpNeg = new sap.m.Input({
        	placeholder: "Enter a keyword for negative sentiment and press enter",
        	width: "50%",
        	submit: [oController.addNeg, oController]
        });
 		return new sap.m.Page({
			title: "Sentiment Analysis",
			content: [
				oTileContainer, oInpPos, oInpNeg
			]
		});
	}

});