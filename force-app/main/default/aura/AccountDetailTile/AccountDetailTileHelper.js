({
    toggleVisibility : function(component, visible) {
        let theItem = component.find("theItem");
        console.log('[AccountDetailTile.helper.toggleVisibility] theItem', theItem);
        console.log('[AccountDetailTile.helper.toggleVisibility] visible', visible);
        if (visible) {
            $A.util.removeClass(theItem, 'slds-hide');
        } else {
            $A.util.addClass(theItem, 'slds-hide');
        }
    },
    setAccountDetails: function(component) {
        let account = component.get("v.account");
        var contact = {};
        var canSelect = false;
        var contacts = [];
        console.log('[AccountDetailTile.helper.setAccountDetails] account', account.Name);
        //console.log('[AccountDetailTile.helper.setAccountDetails] contact', account.Contacts);
        if (account.Contacts != null) {
            component.set("v.hasContacts", true);            
            component.set("v.hasMultipleContacts", account.Contacts.length > 1);

            for(var i = 0; i < account.Contacts.length; i++) {
                contacts.push({ 'label':account.Contacts[i].Name + '[' + account.Contacts[i].Email + ']', 
                                'value':account.Contacts[i].Id, 
                                'Id': account.Contacts[i].Id,
                                'Name': account.Contacts[i].Name,
                                'AccountId': account.Contacts[i].AccountId,
                                'AccountName': account.Name,
                                'Email':account.Contacts[i].Email,
                                'selected': (i == 0),
                                'disabled':(account.Contacts[i].Email == null || account.Contacts[i].Email == '')
                            });

                if (account.Contacts[i].Email != null && account.Contacts[i].Email != '') {
                    canSelect = true;
                }
            }
            
            contact = contacts[0];
        }

        component.set("v.contacts", contacts);
        component.set("v.contact", contact);
        component.set("v.selectedContacts", [contact]);
        component.set("v.canSelectAccount", canSelect);

    }
})
