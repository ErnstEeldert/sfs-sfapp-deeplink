import { api, LightningElement } from 'lwc';

export default class WorkOrderCard extends LightningElement {

    @api workOrder;

    get
    title() {
        return this.workOrder.Location && this.workOrder.Location.Name ? this.workOrder.Location.Name : this.workOrder.WorkOrderNumber;
    }

    get
    asset() {
        console.info(JSON.stringify(this.workOrder));
        return this.workOrder.Asset && this.workOrder.Asset.Name ? this.workOrder.Asset.Name : 'n/a';
    }

    get
    account() {
        return this.workOrder.Account && this.workOrder.Account.Name ? this.workOrder.Account.Name : 'n/a';
    }

    get
    location() {
        return this.workOrder.Location && this.workOrder.Location.Name ? this.workOrder.Location.Name : 'n/a';
    }

    addToSchedule(event) {
        event.preventDefault();
        const e = new CustomEvent('addtoschedule', { detail: this.workOrder.Id });
        this.dispatchEvent(e);
    }

    viewInFSM(event) {
        event.preventDefault();
        const e = new CustomEvent('viewinfsm', { detail: this.workOrder.Id });
        this.dispatchEvent(e);
    }
}