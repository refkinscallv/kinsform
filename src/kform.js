$(window).on("load", function(){
    $("body").prepend("<style>.filterStep {display:none} .showStep {display:block}</style>");
})

function thisStep(c, act = ""){
    var x, i;
    x = document.getElementsByClassName("filterStep");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        thisStepRemove(x[i], "showStep");
        if (x[i].className.indexOf(c) > -1) thisStepAdd(x[i], "showStep");
    }
}

function thisStepAdd(element, name){
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

function thisStepRemove(element, name){
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
function toStep(param){
    var opt = (param == 1)? 1 : eval(param) - 1;
    
    var post_form   = $(".tabStep"+ opt +" input, .tabStep"+ opt +" select, .tabStep"+ opt +" textarea").serializeArray();

    var validate    = stepValidation(post_form);
    
    if(validate.status == true){
        thisStep(param);
    } else {
        alert(validate.message);
    }
}

/* Step Validation */
function ucwords(str){
    return (str +'').replace(/^([a-z])|\s+([a-z])/g, function($1){
        return $1.toUpperCase();
    });
}

function nullChecker(param){
    if(param.length == 0){
        return false;
    } else {
        return true;
    }
}

function stepValidation(data){
    var status, message, result = { status: true, message: "" };

    $.each(data.reverse(), function(index){
        if(!$("[name='"+ data[index]['name'] +"']").attr('data-required')){
            if(nullChecker(data[index]['value']) == false){
                status          = false;
                message         = ucwords(data[index]['name'].split("_").join(" ")) +" tidak boleh kosong";
                result          = { status: status, message: message };
            }
        } else {
            if($("[name='"+ data[index]['name'] +"']").attr('data-required') !== "false"){
                if(nullChecker(data[index]['value']) == false){
                    status          = false;
                    message         = ucwords(data[index]['name'].split("_").join(" ")) +" tidak boleh kosong";
                    result          = { status: status, message: message };
                }
            }
        }
    });

    return result;
}