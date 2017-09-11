if(typeof window.mypa == 'undefined') {
    window.mypa = {};
    window.mypa.observer = {};
    window.mypa.fn = {};
}

var fnCheckout =
{
    'saveShippingMethod': function(){
        IWD.OPC.Shipping.saveShippingMethod();
    },
    'hideLoader': function(){
        IWD.OPC.Checkout.hideLoader();
    }
};
window.mypa.fn.fnCheckout  = fnCheckout;

/* if address change, update shipping method */
Element.prototype.triggerEvent = function(eventName)
{
    if (document.createEvent)
    {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, true);

        return this.dispatchEvent(evt);
    }

    if (this.fireEvent)
        return this.fireEvent('on' + eventName);
};

setTimeout(function () {
    
    var street_lines = $$('input[name="billing[street][]"');
    var i = 1;
    street_lines.each(function (element) {
        $(element).writeAttribute("id", "billing:street" + i);
        i++;
    });

    var postcode = $$('input[name="billing[postcode]"');
    postcode.each(function (element) {
        $(element).writeAttribute("id", "billing:postcode");
    });
    
    mypajQuery([
        "input[id='billing:street1']",
        "input[id='billing:street2']",
        "input[id='billing:postcode_housenumber']",
        "input[id='billing:postcode']"
    ].join()).on('change', function () {
        setTimeout(function () {
            $('billing:country_id').triggerEvent('change');
        }, 500);
    });
}, 1000);