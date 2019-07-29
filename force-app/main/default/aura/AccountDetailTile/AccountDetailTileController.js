({
    doInit: function(component, event, helper) {
        helper.setAccountDetails(component);
    },
    handleAccountChange: function(component, event, helper) {
        console.log('[AccountDetailTile.controller.handleAccountChange]');
        helper.setAccountDetails(component);
    },
    handleAccountSelectedClick : function(component, event, helper) {
        console.log('[AccountDetailTile.controller.handleAccountSelectedClick]');
        let accountState = component.get("v.accountState");
        component.set("v.accountState", !accountState);
        accountState = !accountState;
        let theCard = component.find('theCard');
        var eventType = 'add_account';
        if (accountState) {
            $A.util.addClass(theCard, 'selected');            
        } else {
            eventType = 'remove_account';
            $A.util.removeClass(theCard, 'selected');
        }

        let account = component.get("v.account"); 
        let contacts = component.get("v.contacts");               
        let action = component.getEvent("bf_event_ItemSelected");
        action.setParams({
            "itemType" : eventType,
            "item"     : {'Id':account.Id, 'Name':account.Name, 'Contacts':contacts}
        });
        action.fire();
        console.log('[AccountDetailItem.controller.handleAccountSelectedClick] fired bf_event_ItemSelected event');
    },
    handleContactStateChange: function(component, event) {
        console.log('[AccountDetailTile.controller.handleContactStateChange] source.id', event.getSource().get("v.id"));

    },
    handleContactChange: function(component, event, helper) {
        let checkboxValues = event.getParam('value');
        let contacts = component.get("v.contacts");
        console.log('[AccountDetailTile.controller.handleContactChange] checkboxValues', checkboxValues);
        var contact = {};
        var selectedContacts = [];
        for(var i = 0; i < contacts.length; i++) {
            if (contacts[i].selected) {
                selectedContacts.push({'Id':contacts[i].Id, 'Name':contacts[i].Name, 'Email':contacts[i].Email, 'AccountId':contacts[i].AccountId, 'AccountName':contacts[i].AccountName, 'selected':contacts[i].selected});
            }
        }
        console.log('[AccountDetailTile.controller.handleContactChange] selectedContact', selectedContacts);
        console.log('[AccountDetailTile.controller.handleContactChange] contacts', contacts);
        let accountState = component.get("v.accountState");
        if (accountState) {
            let action = component.getEvent("bf_event_ItemSelected");
            action.setParams({
                "itemType" : 'update_account',
                "item"     : { 'Id':contact.AccountId, 'Contacts': selectedContacts  }
            });
            action.fire();
        }

        /*
        var contact = {};
        for(var i = 0; i < contacts.length; i++) {
            console.log('[AccountDetailTile.controller.handleContactChange] contact.id', contacts[i].Id);
            if (contacts[i].Id == selectedContact) {
                contact = { 'Id':contacts[i].Id, 'Name':contacts[i].Name, 'Email':contacts[i].Email, 'AccountId':contacts[i].AccountId };
    
                break;                
            }
        }
        component.set("v.contact", contact);
        console.log('[AccountDetailTile.controller.handleContactChange] contact', contact);
        console.log('[AccountDetailTile.controller.handleContactChange] contacts', contacts);

        let accountState = component.get("v.accountState");
        if (accountState) {
            let action = component.getEvent("bf_event_ItemSelected");
            action.setParams({
                "itemType" : 'update_account',
                "item"     : { 'Id':contact.AccountId, 'Contact': contact  }
            });
            action.fire();
        }
        */
    },

    /**
     * Handle attribute value changes
     */
    handleAttributeValueChange : function(component, event, helper) {
        console.log('[AccountDetailTile.controller.handleAttributeValueChange]');
        let accountNameFilter = component.get("v.accountNameFilter");
        let channel = component.get("v.channel");
        let actionableSegment = component.get("v.actionableSegment");
        let bannerGroup = component.get("v.bannerGroup");
        let account = component.get("v.account");        
        let status = component.get("v.status");
        console.log('[AccountDetailTile.controller.handleAttributeValueChange] accountNameFilter', accountNameFilter);
        console.log('[AccountDetailTile.controller.handleAttributeValueChange] channel', channel);
        console.log('[AccountDetailTile.controller.handleAttributeValueChange] actionableSegment', actionableSegment);
        console.log('[AccountDetailTile.controller.handleAttributeValueChange] bannerGroup', bannerGroup);
        console.log('[AccountDetailTile.controller.handleAttributeValueChange] account channel: ' + account.Channel__c + ', actionableSegment: ' + account.Actionable_Segment__c + ', bannerGroup: ' + account.Banner_Group__c);

        if (accountNameFilter != null) { accountNameFilter = accountNameFilter.toLowerCase(); }
        if (accountNameFilter != undefined && accountNameFilter != '') {
            if (account.Name.toLowerCase().indexOf(accountNameFilter) < 0) {
                helper.toggleVisibility(component, false);
                return;
            }
        }
        if (channel != undefined && channel != '' && channel != 'all') {
            if (account.Channel__c != channel) {
                helper.toggleVisibility(component, false);
                return;
            }    
        }

        if (actionableSegment != undefined && actionableSegment != '' && actionableSegment != 'all') {
            console.log('[AccountDetailTile.controller.handleAttributeValueChange] actionableSegment', actionableSegment);            
            console.log('[AccountDetailTile.controller.handleAttributeValueChange] account.actionableSegment', account.Actionable_Segment__c);
            if (account.Actionable_Segment__c != actionableSegment) {
                helper.toggleVisibility(component, false);
                return;
            }
        }

        if (bannerGroup != undefined && bannerGroup != '' && bannerGroup != 'all') {
            if (account.Banner_Group__c != bannerGroup) {
                helper.toggleVisibility(component, false);
                return;
            }
        }

        if (status != undefined && status != '' && status != 'all') {
            if (account.Status__c != status) {
                helper.toggleVisibility(component, false);
                return;
            }
        }

        helper.toggleVisibility(component, true);
    },

    handleAccountStateChange: function(component, event, helper) {
        let accountState = component.get("v.accountState");
        console.log('[AccountDetailTile.controller.handleAccountStateChange] accountState', accountState);
        let theCard = component.find("theCard");
        if (accountState) {
            $A.util.addClass(theCard, 'selected');
        } else {
            $A.util.removeClass(theCard, 'selected');
        }
    }
})
