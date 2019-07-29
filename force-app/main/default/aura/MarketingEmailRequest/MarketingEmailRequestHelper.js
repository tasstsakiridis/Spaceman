({
    getFilterValues : function(component) {
        let action = component.get("c.getFilterValues");
        action.setCallback(this, function(response){
            var callState = response.getState();
            console.log('[MarketingEmailRequest.helper.getFilterValues] getFilterValues action callback returned with state', callState);
            
            if (callState === "SUCCESS") {
                try {                        
                    let result = response.getReturnValue();
                    console.log('[MarketingEmailRequest.helper.getAccounts] getFilterValues action callback returned with state', result);
                    
                    result.channel.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.channelOptions", result.channel);

                    result.actionableSegment.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.actionableSegmentOptions", result.actionableSegment);

                    result.bannerGroups.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.bannerGroupOptions", result.bannerGroups);

                    result.status.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.statusOptions", result.status);

                } catch(ex1) {
                    console.log('[MarketingEmailRequest.helper.getFilterValues] exception', ex1);
                }
                
            } else if (callState === "INCOMPLETE") {
                console.log('[MarketingEmailRequest.helper.getFilterValues] callback state is incomplete');    
            } else if (callState === "ERROR") {
                var errors = response.getError();
                console.log('[MarketingEmailRequest.helper.getFilterValues] callback returned errors. ', errors);                    
                component.set("v.errors", errors);                    
            }                        
        });
        $A.enqueueAction(action);
        
    },

    getAccounts : function(component) {
        let action = component.get("c.getAccounts");
        action.setParams({
            'name': '',
            'actionableSegment': '',
            'bannerGroup': '',
            'channel': '',
            'status': '',
            'pageNumber': 1
        });
        action.setCallback(this, function(response){
            var callState = response.getState();
            console.log('[MarketingEmailRequest.helper.getAccounts] getAccounts action callback returned with state', callState);
            
            if (callState === "SUCCESS") {
                try {                        
                    let result = response.getReturnValue();

                    component.set("v.page", result.page);
                    component.set("v.total", result.total);
                    if (result.total > 0) {
                        component.set("v.pages", Math.ceil(result.total / result.pageSize));                                    
                    }
                    let pageSize = component.get("v.pageSize");
                    if (result.accounts.length == 0 || result.accounts.length < pageSize) {
                        component.set("v.hasMorePages", false);
                    } else {
                        component.set("v.hasMorePages", true);
                    }
    
                    var accounts = [];
                    var channelOptions = [];
                    var actionableSegmentOptions = [];
                    var bannerGroupOptions = [];
                    var statusOptions = [];
                    var channels = [];
                    var actionableSegments = [];
                    var bannerGroups = [];
                    var statuses = [];
                    result.accounts.forEach(function(account) {  
                        accounts.push({'account': account, 'isSelected': false});

                        /*
                        if (account.Channel__c != undefined && channels.indexOf(account.Channel__c) < 0) {
                            channels.push(account.Channel__c);
                            channelOptions.push({'label':account.Channel__c, 'value':account.Channel__c});
                        }
                        if (account.Actionable_Segment__c != undefined && actionableSegments.indexOf(account.Actionable_Segment__c) < 0) {
                            actionableSegments.push(account.Actionable_Segment__c);
                            actionableSegmentOptions.push({'label':account.Actionable_Segment__c, 'value':account.Actionable_Segment__c});
                        }
                        if (account.Banner_Group__c != undefined && bannerGroups.indexOf(account.Banner_Group__c) < 0) {
                            bannerGroups.push(account.Banner_Group__c);
                            bannerGroupOptions.push({'label':account.Banner_Group__r.Name, 'value':account.Banner_Group__c});
                        }
                        if (account.Status___c != undefined && statuses.indexOf(account.Status__c) < 0) {
                            statuses.push(account.Status__c);
                            statusOptions.push({'label':account.Status__c, 'value':account.Status__c});
                        }
                        */
                    });
                    component.set("v.accounts", accounts);
                    console.log('[MarketingEmailRequest.helper.getAccounts] returnmsg', accounts);

                    /*
                    console.log('channelOptions', channelOptions);
                    console.log('actionableSegmentOptions', actionableSegmentOptions);
                    console.log('bannerGroupOptions', bannerGroupOptions);
                    channelOptions.sort(function(a, b) {
                        let x = a.value.toLowerCase();
                        let y = b.value.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    });
                    actionableSegmentOptions.sort(function(a, b) {
                        let x = a.value.toLowerCase();
                        let y = b.value.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    });
                    bannerGroupOptions.sort(function(a, b) {
                        let x = a.value.toLowerCase();
                        let y = b.value.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    });
                    statusOptions.sort(function(a, b) {
                        let x = a.value.toLowerCase();
                        let y = b.value.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    });
                    
                    channelOptions.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.channelOptions", channelOptions);

                    actionableSegmentOptions.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.actionableSegmentOptions", actionableSegmentOptions);

                    bannerGroupOptions.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.bannerGroupOptions", bannerGroupOptions);

                    statusOptions.splice(0, 0, {'label':'All', 'value':'all'});
                    component.set("v.statusOptions", statusOptions);
                    */
                } catch(ex1) {
                    console.log('[MarketingEmailRequest.helper.getAccounts] exception', ex1);
                }
                
            } else if (callState === "INCOMPLETE") {
                console.log('[MarketingEmailRequest.helper.getAccounts] callback state is incomplete');    
            } else if (callState === "ERROR") {
                var errors = response.getError();
                console.log('[MarketingEmailRequest.helper.getAccounts] callback returned errors. ', errors);                    
                component.set("v.errors", errors);                    
            }                        
        });
        $A.enqueueAction(action);
    },

    getMaterials: function(component) {
        let action = component.get("c.getMaterials");
        action.setCallback(this, function(response){
            var callState = response.getState();
            console.log('[MarketingEmailRequest.helper.getMaterials] getMaterials action callback returned with state', callState);
            
            if (callState === "SUCCESS") {
                let returnList = response.getReturnValue();
                console.log('[MarketingEmailRequest.helper.getMaterials] returnList', returnList);
                component.set("v.materials", returnList);

            } else if (callState === "INCOMPLETE") {
                console.log('[MarketingEmailRequest.helper.getMaterials] callback state is incomplete');    
            } else if (callState === "ERROR") {
                var errors = response.getError();
                console.log('[MarketingEmailRequest.helper.getMaterials] callback returned errors. ', errors);                    
                component.set("v.errors", errors);                    
            }                        
        });
        $A.enqueueAction(action);

    },

    getUserDetails: function(component) {
        let action = component.get("c.getUserDetails");
        action.setCallback(this, function(response){
            var callState = response.getState();
            console.log('[MarketingEmailRequest.helper.getUserDetails] getUserDetails action callback returned with state', callState);
            
            if (callState === "SUCCESS") {
                let user = response.getReturnValue();
                console.log('[MarketingEmailRequest.helper.getUserDetails] user', user);
                component.set("v.user", user);

            } else if (callState === "INCOMPLETE") {
                console.log('[MarketingEmailRequest.helper.getUserDetails] callback state is incomplete');    
            } else if (callState === "ERROR") {
                var errors = response.getError();
                console.log('[MarketingEmailRequest.helper.getUserDetails] callback returned errors. ', errors);                    
                component.set("v.errors", errors);                    
            }                        
        });
        $A.enqueueAction(action);

    },
    submitEmailRequest: function(component) {
        let selectedAccounts = component.get("v.selectedAccounts");
        let selectedMaterials = component.get("v.selectedMaterials");
        var materials = [];
        for(var i = 0; i < selectedMaterials.length; i++) {
            if (selectedMaterials[i].Id != null) {
                materials.push(selectedMaterials[i].External_System_File_Id__c);
            }
        }
        
        if (selectedAccounts.length == 0 || materials.length == 0) {
            component.find("notifLib").showToast({
                "variant": "warning",
                "title": "Warning",
                "message": "You have not selected any account and/or materials"
            });
            
            return;
        }
        
        component.set("v.isWorking", true);
        console.log('[MarketingEmailRequest.helper.submitEmailRequest] accounts', selectedAccounts);
        console.log('[MarketingEmailRequest.helper.submitEmailRequest] materials', materials);

        var requests = [];
        var request;
        var contacts = [];
        try {
        for(var i = 0; i < selectedAccounts.length; i++) {
            for(var j = 0; j < selectedAccounts[i].Contacts.length; j++) {
                if (selectedAccounts[i].Contacts[j].selected) {
                    request = {
                        'SObjectType':'Marketing_Email_Request__c',
                        'Status__c' : 'New',
                        'Contact__c': selectedAccounts[i].Contacts[j].Id,
                        'Account__c': selectedAccounts[i].Id,
                        'Template_Customer_Key__c' : 'c76f6503-fd71-4289-91ed-502d4c9c3a53',                
                    };                
                    for(var m = 0; m < materials.length; m++) {
                        request['Section_'+(m+1)+'_Image_Customer_Key__c'] = materials[m];
                    }

                    requests.push(request);
                }

            }
            //contacts.push({'Id':selectedAccounts[i].Contact.Id, 'AccountId':selectedAccounts[i].Id});
        }
            console.log('[MarketingEmailRequest.helper.submitEmailRequest] requests', requests);

        } catch(ex) {
            console.log('exception building request list', requests);
        }
       console.log('[MarketingEmailRequest.helper.submitEmailRequest] contacts', contacts);
       console.log('[MarketingEmailRequest.helper.submitEmailRequest] materials', materials);
        let action = component.get("c.submitRequest");
        action.setParams({
            "requests": requests
        });
        action.setCallback(this, function(response){
            var callState = response.getState();
            console.log('[MarketingEmailRequest.helper.submitRequest] submitReqeust action callback returned with state', callState);
            
            if (callState === "SUCCESS") {
                //let returnList = response.getReturnValue();
                //component.set("v.materials", returnList);

                let accounts = component.get("v.accounts");
                for(var i = 0; i < accounts.length; i++) {
                    accounts[i].isSelected = false;
                }
                console.log('[MarketingEmailRequest.helper.submitRequest] accounts', accounts);
                component.set("v.accounts", accounts);
                component.set("v.selectedAccounts", []);
                component.set("v.selectedMaterials", [{}]);

                component.find("notifLib").showToast({
                    "variant": "success",
                    "title": "Info",
                    "message": "Your email request has been submitted and queued. "
                });

                component.set("v.currentStep", "accounts");

            } else if (callState === "INCOMPLETE") {
                console.log('[MarketingEmailRequest.helper.submitRequest] callback state is incomplete');    
            } else if (callState === "ERROR") {
                var errors = response.getError();
                console.log('[MarketingEmailRequest.helper.submitRequest] callback returned errors. ', errors);                    
                component.set("v.errors", errors);                    
            }                        

            component.set("v.isWorking", false);

        });
        $A.enqueueAction(action);

    }
})
