({
    getAccounts : function(component, pageNumber) {
        component.set("v.isLoading", true);
        
        let action = component.get("c.getAccounts");
        let accountName = component.get("v.f_accountName");
        let actionableSegment = component.get("v.f_actionableSegment");
        let bannerGroup = component.get("v.f_bannerGroup");
        let channel = component.get("v.f_channel");
        let status = component.get("v.f_status");
        console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] accountName', accountName);
        console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] actionableSegment', actionableSegment);
        console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] bannerGroup', bannerGroup);
        console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] channel', channel);
        console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] status', status);
        action.setParams({
            'name': accountName,
            'actionableSegment': actionableSegment,
            'bannerGroup': bannerGroup,
            'channel': channel,
            'status': status,
            'pageNumber': pageNumber
        });
        action.setCallback(this, function(response){
            var callState = response.getState();
            console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] getAccounts action callback returned with state', callState);
            
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
                    result.accounts.forEach(function(account) {  
                        accounts.push({'account': account, 'isSelected': false});
                    });
                    component.set("v.accounts", accounts);
                    console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] returnmsg', accounts);

                } catch(ex1) {
                    console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] exception', ex1);
                }
                
            } else if (callState === "INCOMPLETE") {
                console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] callback state is incomplete');    
            } else if (callState === "ERROR") {
                var errors = response.getError();
                console.log('[MarketingEmailRequest_Accounts.helper.getAccounts] callback returned errors. ', errors);                    
                component.set("v.errors", errors);                    
            }  
            
            component.set("v.isLoading", false);
        });
        $A.enqueueAction(action);
    }
})
