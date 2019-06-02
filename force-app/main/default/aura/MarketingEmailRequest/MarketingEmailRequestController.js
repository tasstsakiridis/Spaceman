({
    doInit : function(component, event, helper) {
        helper.getUserDetails(component);
        helper.getFilterValues(component);
        //helper.getAccounts(component, 1);
        helper.getMaterials(component);
        
    },

    /**
     * Handle button clicks
     */
    handleActionButtonClick: function(component, event, helper) {
        let buttonName = event.getSource().get("v.name");
        if (buttonName == 'accounts') {
            component.set("v.currentStep", 'accounts');
        } else if (buttonName == 'materials') {
            let cmpAccounts = component.find('mer_Accounts');
            console.log('[MarketingEmailRequest.handleActionButton] cmpaccounts', cmpAccounts);
            if (cmpAccounts) {
                cmpAccounts.getSelectedAccounts();
            }
            component.set('v.currentStep', 'materials')
        } else if (buttonName == 'summary') {
            let cmpMaterials = component.find("mer_Materials");
            if (cmpMaterials) {
                cmpMaterials.getSelectedMaterials();
            }
            component.set("v.currentStep", "summary");
        } else if (buttonName == 'submit') {
            helper.submitEmailRequest(component);
        }
    },    

    /**
     * Handle Component Events
     */
    handleGetListDataEvent: function(component, event, helper) {
        let listData = event.getParam("theList");
        let itemType = event.getParam("itemType");
        console.log('[MarketingEmailRequest.handleGetListDataEvent] itemType', itemType);
        console.log('[MarketingEmailRequest.handleGetListDataEvent] listData', listData);
        if (itemType == 'accounts') {
            component.set("v.selectedAccounts", listData);
        } else if (itemType == 'materials') {            
            component.set("v.selectedMaterials", listData);
        }
    },

})
