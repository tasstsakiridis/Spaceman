import { LightningElement, api, track, wire } from 'lwc';

import doSearch from '@salesforce/apex/bfFilterDropDownController.doSearch';

export default class BfFilterDropDown extends LightningElement {
    /** Public Properties */
    @api filterLabel = 'Label';
    @api objectAPIName = 'Account';
    @api objectNameField = 'Name';
    @api placeholderText = 'Select an account';
    
    /** Private properties */
    @track selectedValue = '';
    @track options;
    @track error;

    get name() {
        return 'bfFilterDropDown_'+objectAPIName;
    }

    @wire(getFilteredData, { objectAPIName: '$objectAPIName', nameField: '$objectNameField' })
    wiredFilteredData({ error, data }) {
        this.options = [];
        if (data) {
            this.error = undefined;
            var options = [];
            data.forEach(function(item) {
                options.push({'label': item.Name, 'value': item.Id});
            })

            this.options = options;
        } else if(error) {
            this.error = error;
            this.options = undefined;
        }
    }

    handleChange(event) {
        this.selectedValue = event.detai.value;
    }
}