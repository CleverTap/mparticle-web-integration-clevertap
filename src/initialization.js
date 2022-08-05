var initialization = {
    name: 'CleverTap',
/*  ****** Fill out initForwarder to load your SDK ******
    Note that not all arguments may apply to your SDK initialization.
    These are passed from mParticle, but leave them even if they are not being used.
    forwarderSettings contain settings that your SDK requires in order to initialize
    userAttributes example: {gender: 'male', age: 25}
    userIdentities example: { 1: 'customerId', 2: 'facebookId', 7: 'emailid@email.com' }
    additional identityTypes can be found at https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/src/types.js#L88-L101
*/
    initForwarder: function(forwarderSettings, testMode, userAttributes, userIdentities, processEvent, eventQueue, isInitialized, common, appVersion, appName, customFlags, clientId) {
        /* `forwarderSettings` contains your SDK specific settings such as apiKey that your customer needs in order to initialize your SDK properly */
        if (!testMode) {
            var clevertapScript = document.createElement('script');
            clevertapScript.type = 'text/javascript';
            clevertapScript.async = true;
            clevertapScript.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/clevertap.min.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(clevertapScript);               
            clevertapScript.onload = function() {

                var accountID = forwarderSettings.AccountID;
                var regionCode = forwarderSettings.Region;
                var clevertap = {event:[], profile:[], account:[], onUserLogin:[], region:regionCode, notifications:[], privacy:[]};
                clevertap.account.push({"id": accountID});
                clevertap.privacy.push({optOut: false}); //set the flag to true, if the user of the device opts out of sharing their data
                clevertap.privacy.push({useIP: true});
                debugger;
                // if (clientSDKObject && eventQueue.length > 0) {
                //     // Process any events that may have been queued up while forwarder was being initialized.
                //     for (var i = 0; i < eventQueue.length; i++) {
                //         processEvent(eventQueue[i]);
                //     }
                //      // now that each queued event is processed, we empty the eventQueue
                //     eventQueue = [];
                // }
            //    clientSDKObject.initialize(forwarderSettings.apiKey);
                
            };      
        } else {
            // For testing, you should fill out this section in order to ensure any required initialization calls are made,
            // clientSDKObject.initialize(forwarderSettings.apiKey)
        }
    }
};

module.exports = initialization;
