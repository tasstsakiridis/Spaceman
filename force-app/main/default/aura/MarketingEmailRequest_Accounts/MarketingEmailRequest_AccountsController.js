({
    /**
     * Handle component init events
     */
    doInit: function(component, event, helper) {
        component.set("v.isLoading", true);
        helper.getAccounts(component, 1);
    },

    /**
     * Handle filter value changes
     */
    handleChannelFilterChange: function(component, event, helper) {
        console.log('channel filter change: ' + event.getParam('value'));
        console.log('f_channel: ' + component.get("v.f_channel"));
        component.set("v.f_channel", event.getParam('value'));
    },
    handleActionableSegmentFilterChange: function(component, event, helper) {
        component.set("v.f_actionableSegment", event.getParam('value'));
    },
    handleBannerGroupFilterChange: function(component, event, helper) {
        console.log('[MarketingEmailRequest_Accounts.controller.handleBannerGroupFilterChange] bannergroup', event.getParam('value'));
        component.set("v.f_bannerGroup", event.getParam('value'));
    },
    handleStatusFilterChange: function(component, event, helper) {
        console.log('[MarketingEmailRequest_Accounts.controller.handleStatusFilterChange] status', event.getParam('value'));
        component.set("v.f_status", event.getParam('value'));
    },
    handleAccountNameFilterChange: function(component, event, helper) {
        console.log('[MarketingEmailRequest_Accounts.controller.handleAccountNameFilterChange] accountName', event.getParam('value'));
        component.set("v.f_accountName", event.getParam('value'));
    },

    /**
     * Handle Button Clicks
     */
    handleClearAllButtonClick: function(component, event, helper) {
        let accounts = component.get("v.accounts");
        for(var i = 0; i < accounts.length; i++) {
            accounts[i].isSelected = false;
        }
        component.set("v.accounts", accounts);
        component.set("v.selectedAccounts", []);
    },
    handleFilterButtonClick: function(component, event, helper) {
        helper.getAccounts(component, 1);
    },

    handleKeyUp: function(component, event, helper) {
        let isEnterKey = event.keyCode === 13;
        let searchTerm = component.find("i_accountName").get("v.value");
        console.log('[MarkeringEmailRequest_Accounts.handleKeyUp] searchTerm', searchTerm);
        if (isEnterKey) {
            component.set("v.f_accountName", searchTerm);
        }
    },

    /**
     * Handle Component Events
     */
    handleItemSelectedEvent: function(component, event, helper) {
        let itemType = event.getParam("itemType");
        let item = event.getParam("item");
        let selectedAccounts = component.get("v.selectedAccounts");
        if (selectedAccounts == null) { selectedAccounts = []; }
        console.log('[MarketingEmailRequest_Accounts.controller.handleItemSelected] itemtype', itemType);
        console.log('[MarketingEmailRequest_Accounts.controller.handleItemSelected] items', item);

        if (itemType == 'add_account') {
            selectedAccounts.push(item);
        } else if (itemType == 'update_account') {
            for (var i = 0; i < selectedAccounts.length; i++) {
                if (selectedAccounts[i].Id == item.Id) {
                    console.log('[MarketingEmailRequest.Accounts.controller.handleItemSelected] item.Contacts', item.Contacts);
                    selectedAccounts[i].Contacts = item.Contacts;
                    break;
                }
            }
        } else if (itemType == 'remove_account') {
            for(var i = 0; i < selectedAccounts.length; i++) {
                if (selectedAccounts[i].Id == item.Id) {
                    selectedAccounts.splice(i, 1);
                }
            }

            let accounts = component.get("v.accounts");
            for(var i = 0; i < accounts.length; i++) {
                if (accounts[i].account.Id == item.Id) {
                    accounts[i].isSelected = false;
                    break;
                }
            }
            component.set("v.accounts", accounts);
            console.log('[MarketingEmailRequest_Accounts.controller.handleItemSelected] accounts', accounts);
        }     

        console.log('[MarketingEmailRequest_Accounts.controller.handleItemSelected] selectedaccounts', selectedAccounts);
        console.log('[MarketingEmailRequest_Accounts.controller.handleItemSelected] accounts', component.get("v.accounts"));
        component.set("v.selectedAccounts", selectedAccounts);
    },
    handleListPageChangeEvent: function(component, event, helper) {
        let page = component.get("v.page") || 1;
        let direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);        
        console.log('[MarketingEmailRequest_Accounts.controller.handleListPageChangeEvent] page', page);
        helper.getAccounts(component, page);        
    },

    /**
     * Public Methods
     */
    getSelectedAccounts: function(component, event, helper) {
        let selectedAccounts = component.get("v.selectedAccounts");
        let action = component.getEvent("bf_event_GetListData");
        console.log('[MarketingEmailRequest_Accounts.getSelectedAccounts]');
        action.setParams({
            "itemType": "accounts",
            "theList" : selectedAccounts
        });
        action.fire();                        

    }
})
