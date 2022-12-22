public with sharing class SFSMaintenanceListController {


    @AuraEnabled(cacheable=true)
    public static List<WorkOrder> getMaintenanceWorkOrders(String workCenter) {
        return [
            SELECT
                Id,
                WorkOrderNumber,
                Status,
                Subject,
                Location.Name,
                Account.Name,
                Asset.Name
            FROM
                WorkOrder
            WHERE
                Work_Center__c = :workCenter
            WITH SECURITY_ENFORCED
            ORDER BY CreatedDate DESC
            LIMIT 100
        ];
    }

}
