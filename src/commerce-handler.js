function CommerceHandler(common) {
    this.common = common || {};
}

CommerceHandler.prototype.logCommerceEvent = function (event) {
    if (!common.forwardWebRequestsServerSide) {
        if (event.EventCategory == 16 && event.ProductAction) {
            var itemsArray = [];
            for (var i = 0; i < event.ProductAction.ProductList.length; i++) {
                var productDict = {}
                for (var key in event.ProductAction.ProductList[i]) {
                    productDict[key] = event.ProductAction.ProductList[i][key];
                }
                itemsArray.push(productDict)
            }
            var chargedDict = {};
            chargedDict['Amount'] = event.ProductAction.TotalAmount;
            chargedDict['Charged ID'] = event.ProductAction.TransactionId;
            chargedDict['Items'] = itemsArray;
            clevertap.event.push("Charged", chargedDict)
        } else {
            var listOfPageEvents = mParticle.eCommerce.expandCommerceEvent(
                event
            );
            if (listOfPageEvents != null) {
                for (var i = 0; i < listOfPageEvents.length; i++) {
                    if (listOfPageEvents[i].EventAttributes == null) {
                        clevertap.event.push(listOfPageEvents[i].EventName)
                    } else {
                        clevertap.event.push(listOfPageEvents[i].EventName, listOfPageEvents[i].EventAttributes);
                    }
                }
            }
        }
        return true;
    }
    return false;
};

module.exports = CommerceHandler;
