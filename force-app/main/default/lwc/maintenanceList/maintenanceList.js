import { LightningElement, track, wire } from 'lwc';
import getMaintenanceWorkOrders from '@salesforce/apex/SFSMaintenanceListController.getMaintenanceWorkOrders';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

const FLOW_API_NAME = 'Add_Work_Order_to_Schedule';

export default class MaintenanceList extends NavigationMixin(LightningElement) {

    @track workOrders;
    @track error;
    @track currentPageReference;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }

    get workCenter() {
        return this.currentPageReference?.state?.c__workCenter || '';
    }

    @wire(getMaintenanceWorkOrders, { workCenter: '$workCenter' })
    wiredWorkOrders({ error, data }) {
        if (data) {
            this.workOrders = data;
            this.error = undefined;
        } else if (error) {
            this.error = JSON.stringify(error);
            console.error(JSON.stringify(error));
            this.workOrders = undefined;
        }
    }

    addToSchedule(event) {
        console.log(event.detail);
        const workOrderId = event.detail;
        if (workOrderId) {
            const url = `com.salesforce.fieldservice://v1/sObject/${workOrderId}/flow/${FLOW_API_NAME}`;
            console.log('url: ' + url);
            this[NavigationMixin.Navigate]({
                "type": "standard__webPage",
                "attributes": {
                    url
                }
            });
        } else {
            // do popup?
        }
    }
    viewInFSM(event) {
        const workOrderId = event.detail;
        if (workOrderId) {
            const url = `com.salesforce.fieldservice://v1/sObject/${workOrderId}/details`;
            this[NavigationMixin.Navigate]({
                "type": "standard__webPage",
                "attributes": {
                    url
                }
            });
        } else {
            // do popup?
        }
    }
}