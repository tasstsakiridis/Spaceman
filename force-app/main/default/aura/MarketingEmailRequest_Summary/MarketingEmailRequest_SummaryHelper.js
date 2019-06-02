({
    updateContacts : function(component) {
        console.log('[MarketingEmailRequest_Summary] accounts', component.get("v.selectedAccounts"));
        console.log('[MarketingEmailRequest_Summary] materials', component.get("v.selectedMaterials"));
        let accounts = component.get("v.selectedAccounts");

        var contacts = [];
        for(var i = 0; i < accounts.length; i++) {
            for(var j = 0; j < accounts[i].Contacts.length; j++) {
                contacts.push(accounts[i].Contacts[j]);
            }
        }
        console.log('contacts', contacts);
        component.set("v.contacts", contacts);
        console.log('[MarketingEmailRequest_Summary] contacts', component.get("v.contacts"));

    }
})
