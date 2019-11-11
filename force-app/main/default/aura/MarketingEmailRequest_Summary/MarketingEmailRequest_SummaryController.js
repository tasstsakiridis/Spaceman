({
    doInit : function(component, event, helper) {
        helper.updateContacts(component);
    },

    handleOnTouchMove: function(component, event, helper) {
        event.stopPropagation();
    },

    handleAccountsChange: function(component, event, helper) {
        helper.updateContacts(component);
    },

    handleAttributeValueChange: function(component, event) {
        
    }
})
