({
    removeAccount : function(component, event, helper) {
        let account = component.get("v.account");        
        let action = component.getEvent("bf_event_ItemSelected");
        action.setParams({
            "itemType" : "remove_account",
            "item"     : account
        });
        action.fire();

    }
})
