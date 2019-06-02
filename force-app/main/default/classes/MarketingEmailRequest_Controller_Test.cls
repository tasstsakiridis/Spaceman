@isTest
public class MarketingEmailRequest_Controller_Test {
    static testMethod void unitTest1() {
        INFW_TestHelper helper = new INFW_TestHelper();
        
        Date today = Date.today();
        DateTime now = DateTime.now();
            
        User user1 = helper.createUser('System Administrator', 'Test', 'Tsakiridis', '');
        user1.MobilePhone = '0417652342';
        user1.Email = 'tass_tsakiridis@b-f.com';
        user1.Market__c = 'Australia';
        insert user1;
                
        Market__c mAU = helper.createMarket('Australia');
        mAU.Vistex_Clearing_Account__c = '0123456789';
        Market__c[] marketList = new Market__c[]{mAU};
        insert marketList;
        
        System.runAs(user1) {
            Account account1 = helper.createAccount('TestAccount1', mAU.Id, 'Off');
            Account[] accountList = new Account[]{account1};
            insert accountList;
                    
            Contact contact1 = helper.createContact('Tass', 'Tsakiridis', account1.Id);
            insert contact1;

            AccountPagedResult accounts = MarketingEmailRequest_Controller.getAccounts('', '', '', '', '', 1);
            System.assertNotEquals(null, accounts, 'Account have been found');
            
            List<ContentVersion> files = MarketingEmailRequest_Controller.getMaterials();
            System.assertNotEquals(null, files, 'Files have been found');
            
            User thisUser = MarketingEmailRequest_Controller.getUserDetails();
            System.assertNotEquals(null, thisUser, 'User details have been found');
            
            List<String> templates = MarketingEmailRequest_Controller.getTemplates();
            
            Marketing_Email_Request__c mer = new Marketing_Email_Request__c();
            mer.Account__c = account1.Id;
            mer.Contact__c = contact1.Id;
            mer.Status__c = 'New';
            mer.Template_Customer_Key__c = 'c76f6503-fd71-4289-91ed-502d4c9c3a53';
            mer.Section_1_Image_Customer_Key__c = 'http://image.S7.exacttarget.com/lib/fe9013727c660d7f75/m/1/30d8baa3-a738-444d-b0c5-4503b21dc6fa.gif';
            mer.Section_2_Image_Customer_Key__c = 'http://image.S7.exacttarget.com/lib/fe9013727c660d7f75/m/1/2b9b9bc9-80c5-412e-ba8b-2bc858a3b75d.gif';
            
            List<Marketing_Email_Request__c> requests = new List<Marketing_Email_Request__c>();
            requests.add(mer);
            
            requests = MarketingEmailRequest_Controller.submitRequest(requests);
        }
    }
}