public with sharing class MarketingEmailRequest_Controller {
    @AuraEnabled
    public static Map<String, List<SimpleListItem>> getFilterValues() {    
        String marketName = [SELECT Market__c FROM User WHERE Id =:UserInfo.getUserId() LIMIT 1][0].Market__c;
        String marketId = [SELECT Id FROM Market__c WHERE Name =:marketName LIMIT 1][0].Id;

        Map<String, List<SimpleListItem>> filterValues = new Map<String, List<SimpleListItem>>();

        List<Salesforce_Picklist_Controlling_Values__c> picklistValues = [SELECT Id, Name, Controller__c, Controller_Value__c, Field_Name__c, Value__c FROM Salesforce_Picklist_Controlling_Values__c WHERE Object_Name__c = 'Account' AND Is_Active__c = true AND Market__c =:marketId AND Field_Name__c IN ('Channel__c','Actionable_Segment__c', 'Status__c')];

        List<SimpleListItem> channelValues = new List<SimpleListItem>();
        String peValue = '';
        Schema.DescribeFieldResult dfrChannel = Account.Channel__c.getDescribe();
        for(Schema.PicklistEntry pe : dfrChannel.getPicklistValues()) {
            if (pe.isActive()) {
                peValue = pe.getValue();
                for(Salesforce_Picklist_Controlling_Values__c spcv : picklistValues) {
                    if (spcv.Field_Name__c == 'Channel__c' && peValue == spcv.Value__c) {
                        channelValues.add(new SimpleListItem(pe.getValue(), pe.getLabel(), pe.isDefaultValue(), pe.getValue(), pe.isDefaultValue()));                                
                    }
                }
            }
        }
        filterValues.put('channel', channelValues);

        Schema.DescribeFieldResult dfrActionableSegment = Account.Actionable_Segment__c.getDescribe();
        List<SimpleListItem> actionableSegmentValues = new List<SimpleListItem>();
        for(Schema.PicklistEntry pe : dfrActionableSegment.getPicklistValues()) {            
            if (pe.isActive()) {
                peValue = pe.getValue();
                for(Salesforce_Picklist_Controlling_Values__c spcv : picklistValues) {
                    if (spcv.Field_Name__c == 'Actionable_Segment__c' && peValue == spcv.Value__c) {
                        actionableSegmentValues.add(new SimpleListItem(pe.getValue(), pe.getLabel(), pe.isDefaultValue(), pe.getValue(), pe.isDefaultValue()));                                
                    }
                }
            }
        }
        filterValues.put('actionableSegment', actionableSegmentValues);

        Schema.DescribeFieldResult dfrStatus = Account.Status__c.getDescribe();
        List<SimpleListItem> statusValues = new List<SimpleListItem>();
        for(Schema.PicklistEntry pe : dfrStatus.getPicklistValues()) {
            if (pe.isActive()) {
                peValue = pe.getValue();
                for(Salesforce_Picklist_Controlling_Values__c spcv : picklistValues) {
                    if (spcv.Field_Name__c == 'Status__c' && peValue == spcv.Value__c) {
                        statusValues.add(new SimpleListItem(pe.getValue(), pe.getLabel(), pe.isDefaultValue(), pe.getValue(), pe.isDefaultValue()));                                
                    }
                }
            }
        }
        filterValues.put('status', statusValues);

        List<SimpleListItem> bannerValues = new List<SimpleListItem>();
        List<Banner_Groups__c> bannerGroups = [SELECT Id, Name FROM Banner_Groups__c WHERE Market__c =: marketId ORDER BY Name];
        for(Banner_Groups__c bg : bannerGroups) {
            bannerValues.add(new SimpleListItem(bg.Id, bg.Name, false, bg.Id, false));
        }
        filterValues.put('bannerGroups', bannerValues);
        return filterValues;
    }

    @AuraEnabled
    public static AccountPagedResult getAccounts(String name, String actionableSegment, String bannerGroup, String channel, String status, Decimal pageNumber) {        
        Integer pageSize = 50;
        Integer offset = ((Integer)pageNumber - 1) * pageSize;

        String soqlColumns = 'Id, Name, AccountNumber, Status__c, Banner_Group__c, Banner_Group__r.Name, Actionable_Segment__c, Channel__c,';
        soqlColumns += '(SELECT Id, Name, Email FROM Contacts WHERE Primary_Digital_Contact__c=true AND HasOptedOutOfEmail=false) ';

        String whereClause = 'Is_Active__c = true';
        if (name.length() > 0) {
            whereClause += ' AND Name LIKE \'%'+name+'%\'';
        }
        if (actionableSegment.length() > 0 && actionableSegment.toLowerCase() != 'all') {
            whereClause += ' AND Actionable_Segment__c = \'' + actionableSegment + '\'';
        }
        if (bannerGroup.length() > 0 && bannerGroup.toLowerCase() != 'all') {
            whereClause += ' AND Banner_Group__c = \'' + bannerGroup + '\'';
        }
        if (channel.length() > 0 && channel.toLowerCase() != 'all') {
            whereClause += ' AND Channel__c = \'' + channel + '\'';
        }
        if (status.length() > 0 && status.toLowerCase() != 'all') {
            whereClause += ' AND Status__c = \'' + status + '\'';
        }
        
        String soql = 'SELECT ' + soqlColumns + ' FROM Account WHERE ' + whereClause + ' ORDER BY Name LIMIT ' + pageSize + ' OFFSET ' + offset;
        System.debug('soql: ' + soql);
        
        AccountPagedResult result = new AccountPagedResult();
        result.page = (Integer)pageNumber;
        result.pageSize = pageSize;
        result.total = 0;
        result.accounts = Database.query(soql);
        
        return result;

/*
        return [SELECT Id, Name, AccountNumber, Status__c, Banner_Group__c, Banner_Group__r.Name, Actionable_Segment__c, Channel__c,
                    (SELECT Id, Name, Email FROM Contacts WHERE Primary_Digital_Contact__c=true AND HasOptedOutOfEmail=false)
                  FROM Account 
                 WHERE Is_Active__c = true 
                   //AND OwnerId = '0051B00000COjNfQAL'
              ORDER BY Name];
              */
    }

    @AuraEnabled
    public static List<ContentVersion> getMaterials() {
        // Get the library Id
        Id workspaceId = [SELECT Id FROM ContentWorkspace WHERE Name = 'Marketing Materials'][0].Id;        

        // Get all documents that are part of this library
        return [SELECT Id, Title, ContentDocumentId, External_System_File_Id__c FROM ContentVersion WHERE ContentDocument.ParentId =:workspaceId];
    }
      
    @AuraEnabled
    public static User getUserDetails() {
        return [SELECT Id, Name, MobilePhone, Email FROM User WHERE Id =:UserInfo.getUserId()];
    }

    @AuraEnabled
    public static List<String> getTemplates() {
        return new List<String>();
    }

    @AuraEnabled 
    public static List<Marketing_Email_Request__c> submitRequest(List<Marketing_Email_Request__c> requests) {
        insert requests;
        return requests;
    }

}
