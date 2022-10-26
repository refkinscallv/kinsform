window.onload = function(){
    if(!window.jQuery){
        alert("kForm Alert\njQuery not installed\nPlease install it first with at least version 3.6.0");
    } else {
        $("body").prepend("<style>.kform {display:none} .kform-show {display:block}</style>");
    }
}

/* Step Initialize */
function kForm(data = ""){
    if(typeof data.default_tab !== "undefined"){
        var sTab    = data.default_tab;
        kformStep(data.default_tab);
    } else {
        var sTab    = data.default_tab;
        kformStep("ktab1");
    }

    // if(typeof redirect !== "undefined"){
    //     if(typeof tab !== "undefined"){
    //         if(redirect == "next"){
    //             toKstep(tab);
    //         } else 
    //         if(redirect == "prev"){
    //             backKstep(tab);
    //         } else {
    //             alert("kForm Alert\nButton step with directive not set correctly");
    //         }
    //     } else {
    //         alert("kForm Alert\nButton step with tab not set correctly");
    //     }
    // } else {
    //     alert("kForm Alert\nButton step not set correctly");
    // }
}

/* Step System Component */
function kformStep(c){
    var x, i;
    x = document.getElementsByClassName("kform");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        kformStepRemove(x[i], "kform-show");
        if (x[i].className.indexOf(c) > -1) kformStepAdd(x[i], "kform-show");
    }
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

/* Step Button */
function kMove(direct, tab){

}

function toKstep(param){
    if(param.indexOf("ktab") < 0){
        var _ktab   = (param == 1)? 1 : eval(param) - 1;
    } else {
        var ktab    = param.split("ktab").join("");
        var _ktab   = (ktab == 1)? 1 : eval(ktab) - 1;
    }
    
    var post_form   = $(".ktab"+ _ktab +" input, .ktab"+ _ktab +" select, .ktab"+ _ktab +" textarea").serializeArray();

    var validate    = stepValidation(post_form);
    
    if(validate.status == true){
        kformStep(_ktab);
    } else {
        alert(validate.message);
    }
}

function backKstep(param){
    kformStep(param);
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