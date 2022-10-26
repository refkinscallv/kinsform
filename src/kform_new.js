window.onload = function(){
    if(!window.jQuery){
        alert("kForm Alert\njQuery not installed\nPlease install it first with at least version 3.6.0");
    } else {
        $("body").prepend("<style>.kform {display:none} .kform-show {display:block}</style>");
    }
}

var kForm = (function(data = ""){
    /* Step Initial */
    function run(data = ""){
        if(typeof data.default_tab !== "undefined"){
            kformStep(data.default_tab);
        } else {
            // kformStep("ktab1");
        }
    }

    /* Step Button */
    function to(param){
        if(param.indexOf("ktab") < 0){
            var _ktab   = (param == 1)? 1 : eval(param) - 1;
        } else {
            var ktab    = param.split("ktab").join("");
            var _ktab   = (ktab == 1)? 1 : eval(ktab) - 1;
        }
        
        var post_form   = $(".ktab"+ _ktab +" input, .ktab"+ _ktab +" select, .ktab"+ _ktab +" textarea").serializeArray();
    
        var validate    = stepValidation(post_form);
        
        if(validate.status == true){
            console.log(kformStep("ktab"+ _ktab));
            // kformStep("ktab"+ _ktab);
        } else {
            alert(validate.message);
        }
    }
    
    function back(param){
        kformStep(param);
    }

    /* Step System */
    function kformStep(c){
        var x, i;
        x = document.getElementsByClassName("kform");
        if (c == "all") c = "";
        for (i = 0; i < x.length; i++) {
            kformStepRemove(x[i], "kform-show");
            if (x[i].className.indexOf(c) > -1) kformStepAdd(x[i], "kform-show");
        }

        return c;
    }
    
    function kformStepAdd(element, name){
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
        }
    }
    
    function kformStepRemove(element, name){
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
            }
        }
        element.className = arr1.join(" ");
    }

    
    
    /* Step Utility */
    function ucwords(str){
        return (str +'').replace(/^([a-z])|\s+([a-z])/g, function($1){
            return $1.toUpperCase();
        });
    }
    
    function initKselector(param){
        return $("[name='"+ param +"']");
    }
    
    /* Step Validation */
    function nullChecker(param){
        if(param.length == 0){
            return false;
        } else {
            return true;
        }
    }
    
    function stepValidation(data){
        var status, message, message_label, message_alert, msg, result = { status: true, message: "" };
    
        $.each(data.reverse(), function(index){
            var initSelector = initKselector(data[index]['name']);
    
            if(!initSelector.attr("data-label") || initSelector.attr("data-label") == ""){
                message_label   = data[index]['name'];
            } else {
                message_label   = initSelector.data("label");
            }
    
            if(!initSelector.attr('data-required')){
                if(nullChecker(data[index]['value']) == false){
                    status          = false;
                    message         = ucwords(message_label.split("_").join(" ")) +" can not be empty";
                    result          = { status: status, message: message };
                }
            } else {
                if(initSelector.attr('data-required') !== "false"){
                    if(nullChecker(data[index]['value']) == false){
                        status          = false;
                        message         = ucwords(message_label.split("_").join(" ")) +" can not be empty";
                        result          = { status: status, message: message };
                    }
                }
            }
        });
    
        return result;
    }

    return { run, to, back };
})();